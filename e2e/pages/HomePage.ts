import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly header: Locator;
  readonly settingsButton: Locator;
  readonly wholeLifeCard: Locator;
  readonly dailyForecastCard: Locator;
  readonly specificAnalysisCard: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('header');
    this.settingsButton = page.locator('a[href="/settings"], button[aria-label="settings"]');
    this.wholeLifeCard = page.locator('[data-testid="lifetime-card"], a:has-text("Cả đời"), a:has-text("Whole Life")');
    this.dailyForecastCard = page.locator('[data-testid="daily-card"], a:has-text("Dự báo"), a:has-text("Daily")');
    this.specificAnalysisCard = page.locator('[data-testid="specific-card"], a:has-text("Cụ thể"), a:has-text("Specific")');
  }

  async navigate() {
    await this.goto('/home');
  }

  async goToSettings() {
    await this.settingsButton.click();
    await this.waitForURL(/\/settings/);
  }

  async selectWholeLifeAnalysis() {
    await this.wholeLifeCard.click();
    await this.waitForURL(/\/result/);
  }

  async selectDailyForecast() {
    await this.dailyForecastCard.click();
    await this.waitForURL(/\/result/);
  }

  async selectSpecificAnalysis() {
    await this.specificAnalysisCard.click();
    await this.waitForURL(/\/aspects/);
  }

  async isCardVisible(cardType: 'lifetime' | 'daily' | 'specific'): Promise<boolean> {
    const card = cardType === 'lifetime'
      ? this.wholeLifeCard
      : cardType === 'daily'
        ? this.dailyForecastCard
        : this.specificAnalysisCard;
    return await card.isVisible();
  }

  async getAllCards(): Promise<Locator[]> {
    return [this.wholeLifeCard, this.dailyForecastCard, this.specificAnalysisCard];
  }
}