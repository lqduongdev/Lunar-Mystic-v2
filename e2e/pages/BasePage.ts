import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.waitForLoad();
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForURL(url: RegExp | string, options?: { timeout?: number }) {
    await this.page.waitForURL(url, options);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async waitForSelector(selector: string, options?: { timeout?: number }) {
    await this.page.waitForSelector(selector, options);
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() ?? '';
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  async setLocalStorageItem(key: string, value: string) {
    await this.page.evaluate(
      ({ k, v }) => localStorage.setItem(k, v),
      { k: key, v: value }
    );
  }
}