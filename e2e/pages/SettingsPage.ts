import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  readonly header: Locator;
  readonly backButton: Locator;
  readonly languageSelect: Locator;
  readonly themeLight: Locator;
  readonly themeDark: Locator;
  readonly themeSystem: Locator;
  readonly notificationToggle: Locator;
  readonly helpLink: Locator;
  readonly privacyLink: Locator;
  readonly versionInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('header');
    this.backButton = page.locator('a[href="/home"], button[aria-label="back"]');
    this.languageSelect = page.locator('select, [data-testid="language-select"]');
    this.themeLight = page.locator('input[type="radio"][value="light"], label:has-text("Sáng"), label:has-text("Light")');
    this.themeDark = page.locator('input[type="radio"][value="dark"], label:has-text("Tối"), label:has-text("Dark")');
    this.themeSystem = page.locator('input[type="radio"][value="system"], label:has-text("Hệ thống"), label:has-text("System")');
    this.notificationToggle = page.locator('[data-testid="notification-toggle"], .toggle, button[role="switch"]');
    this.helpLink = page.locator('a:has-text("Trợ giúp"), a:has-text("Help")');
    this.privacyLink = page.locator('a:has-text("Quyền riêng tư"), a:has-text("Privacy")');
    this.versionInfo = page.locator('[data-testid="version"], .version-info');
  }

  async navigate() {
    await this.goto('/settings');
  }

  async selectLanguage(language: 'vi' | 'en') {
    await this.languageSelect.selectOption(language);
    await this.page.waitForTimeout(500); // Wait for language change to take effect
  }

  async getCurrentLanguage(): Promise<string> {
    return await this.languageSelect.inputValue();
  }

  async selectLightTheme() {
    await this.page.click('input[type="radio"][value="light"], label:has-text("Sáng"), label:has-text("Light")');
    await this.page.waitForTimeout(300);
  }

  async selectDarkTheme() {
    await this.page.click('input[type="radio"][value="dark"], label:has-text("Tối"), label:has-text("Dark")');
    await this.page.waitForTimeout(300);
  }

  async selectSystemTheme() {
    await this.page.click('input[type="radio"][value="system"], label:has-text("Hệ thống"), label:has-text("System")');
    await this.page.waitForTimeout(300);
  }

  async getCurrentTheme(): Promise<string> {
    const htmlElement = this.page.locator('html');
    const theme = await htmlElement.getAttribute('data-theme');
    return theme ?? 'dark';
  }

  async toggleNotifications(enabled: boolean) {
    const currentState = await this.isNotificationsEnabled();
    if (currentState !== enabled) {
      await this.notificationToggle.click();
      await this.page.waitForTimeout(300);
    }
  }

  async isNotificationsEnabled(): Promise<boolean> {
    const toggle = this.notificationToggle;
    const ariaChecked = await toggle.getAttribute('aria-checked');
    return ariaChecked === 'true';
  }

  async clickHelpLink() {
    await this.helpLink.click();
  }

  async clickPrivacyLink() {
    await this.privacyLink.click();
  }

  async getVersion(): Promise<string> {
    return await this.versionInfo.textContent() ?? '';
  }

  async goBack() {
    await this.backButton.click();
    await this.waitForURL(/\/home/);
  }
}