import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResultPage extends BasePage {
  readonly header: Locator;
  readonly settingsButton: Locator;
  readonly backButton: Locator;
  readonly loadingIndicator: Locator;
  readonly errorState: Locator;
  readonly userInfoCard: Locator;
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly shareButton: Locator;
  readonly astrologyTab: Locator;
  readonly numerologyTab: Locator;
  readonly ichingTab: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('header');
    this.settingsButton = page.locator('a[href="/settings"], button[aria-label="settings"]');
    this.backButton = page.locator('button[aria-label="back"], a[href="/home"]');
    this.loadingIndicator = page.locator('[data-testid="loading"], .loading, .skeleton');
    this.errorState = page.locator('[data-testid="error"], .error-state, [role="alert"]');
    this.userInfoCard = page.locator('[data-testid="user-info"], .user-info-card');
    this.editButton = page.locator('button:has-text("Sửa"), button:has-text("Edit"), [data-testid="edit-btn"]');
    this.saveButton = page.locator('button:has-text("Lưu"), button:has-text("Save"), [data-testid="save-btn"]');
    this.shareButton = page.locator('button:has-text("Chia sẻ"), button:has-text("Share"), [data-testid="share-btn"]');
    this.astrologyTab = page.locator('[data-testid="tab-astrology"], button:has-text("Tử vi"), button:has-text("Astrology")');
    this.numerologyTab = page.locator('[data-testid="tab-numerology"], button:has-text("Thần số"), button:has-text("Numerology")');
    this.ichingTab = page.locator('[data-testid="tab-iching"], button:has-text("Kinh Dịch"), button:has-text("I Ching")');
  }

  async navigate(type: 'lifetime' | 'daily' | 'specific' = 'lifetime', aspect?: string) {
    let url = '/result';
    const params = new URLSearchParams();
    params.set('type', type);
    if (aspect) params.set('aspect', aspect);
    if (params.toString()) url += `?${params.toString()}`;
    await this.goto(url);
  }

  async waitForResults() {
    await this.page.waitForSelector('[data-testid="results-loaded"], .result-content, .astrology-content', {
      timeout: 15000,
    });
  }

  async isLoading(): Promise<boolean> {
    return await this.loadingIndicator.isVisible();
  }

  async hasError(): Promise<boolean> {
    return await this.errorState.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorState.textContent() ?? '';
  }

  async switchToAstrologyTab() {
    await this.astrologyTab.click();
    await this.page.waitForTimeout(300);
  }

  async switchToNumerologyTab() {
    await this.numerologyTab.click();
    await this.page.waitForTimeout(300);
  }

  async switchToIchingTab() {
    await this.ichingTab.click();
    await this.page.waitForTimeout(300);
  }

  async getUserName(): Promise<string> {
    return await this.page.locator('[data-testid="user-name"], .user-name').textContent() ?? '';
  }

  async getBirthDate(): Promise<string> {
    return await this.page.locator('[data-testid="birth-date"], .birth-date').textContent() ?? '';
  }

  async editUserInfo() {
    await this.editButton.click();
    await this.waitForURL(/\/onboarding/);
  }

  async saveResults() {
    await this.saveButton.click();
  }

  async shareResults() {
    await this.shareButton.click();
  }

  async isAstrologyContentVisible(): Promise<boolean> {
    return await this.page.locator('.astrology-content, [data-testid="astrology-content"]').isVisible();
  }

  async isNumerologyContentVisible(): Promise<boolean> {
    return await this.page.locator('.numerology-content, [data-testid="numerology-content"]').isVisible();
  }

  async isIchingContentVisible(): Promise<boolean> {
    return await this.page.locator('.iching-content, [data-testid="iching-content"]').isVisible();
  }
}