import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ASPECTS } from '../utils/test-data';

export class AspectsPage extends BasePage {
  readonly header: Locator;
  readonly settingsButton: Locator;
  readonly backButton: Locator;
  readonly aspectItems: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('header');
    this.settingsButton = page.locator('a[href="/settings"], button[aria-label="settings"]');
    this.backButton = page.locator('button[aria-label="back"], a[href="/home"]');
    this.aspectItems = page.locator('[data-testid="aspect-item"], .aspect-item, button[data-aspect]');
  }

  async navigate() {
    await this.goto('/aspects');
  }

  async selectAspect(aspectKey: string) {
    const aspect = ASPECTS.find(a => a.key === aspectKey);
    const selector = `[data-testid="aspect-${aspectKey}"], button[data-aspect="${aspectKey}"], button:has-text("${aspect?.labelVi}"), button:has-text("${aspect?.labelEn}")`;
    await this.page.click(selector);
    await this.waitForURL(/\/result/);
  }

  async getAspectCount(): Promise<number> {
    return await this.aspectItems.count();
  }

  async isAspectVisible(aspectKey: string): Promise<boolean> {
    const aspect = ASPECTS.find(a => a.key === aspectKey);
    const selector = `[data-testid="aspect-${aspectKey}"], button[data-aspect="${aspectKey}"], button:has-text("${aspect?.labelVi}"), button:has-text("${aspect?.labelEn}")`;
    return await this.page.locator(selector).isVisible();
  }

  async getAllAspects(): Promise<string[]> {
    const count = await this.aspectItems.count();
    const aspects: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.aspectItems.nth(i).textContent();
      if (text) aspects.push(text);
    }
    return aspects;
  }

  async goBack() {
    await this.backButton.click();
    await this.waitForURL(/\/home/);
  }
}