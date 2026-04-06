import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestUser } from '../utils/test-data';

export class OnboardingPage extends BasePage {
  readonly nameInput: Locator;
  readonly birthDateInput: Locator;
  readonly birthTimeInput: Locator;
  readonly maleButton: Locator;
  readonly femaleButton: Locator;
  readonly submitButton: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[name="name"]');
    this.birthDateInput = page.locator('input[name="birthDate"]');
    this.birthTimeInput = page.locator('input[name="birthTime"]');
    this.maleButton = page.locator('button[data-gender="male"], button:has-text("Nam")');
    this.femaleButton = page.locator('button[data-gender="female"], button:has-text("Nữ")');
    this.submitButton = page.locator('button[type="submit"]');
    this.form = page.locator('form');
  }

  async navigate() {
    await this.goto('/onboarding');
  }

  async fillForm(user: TestUser) {
    await this.nameInput.fill(user.name);
    await this.birthDateInput.fill(user.birthDate);
    await this.birthTimeInput.fill(user.birthTime);

    if (user.gender === 'male') {
      await this.maleButton.click();
    } else {
      await this.femaleButton.click();
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async completeOnboarding(user: TestUser) {
    await this.navigate();
    await this.fillForm(user);
    await this.submit();
    await this.waitForURL(/\/home/, { timeout: 10000 });
  }

  async getErrorMessage(field: string): Promise<string> {
    const errorLocator = this.page.locator(`[data-error="${field}"], .error:has-text("${field}")`);
    return await errorLocator.textContent() ?? '';
  }

  async isSubmitEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled();
  }

  async isFormValid(): Promise<boolean> {
    const name = await this.nameInput.inputValue();
    const date = await this.birthDateInput.inputValue();
    const time = await this.birthTimeInput.inputValue();
    return name.length > 0 && date.length > 0 && time.length > 0;
  }
}