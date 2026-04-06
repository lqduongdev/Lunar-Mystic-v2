import { test as base, expect, Page } from '@playwright/test';
import { generateTestUser, TestUser } from './utils/test-data';

export interface AppFixtures {
  user: TestUser;
  authenticatedPage: Page;
  language: 'vi' | 'en';
}

export const test = base.extend<AppFixtures>({
  // Default language
  language: 'vi',

  // Generate test user for each test
  user: async ({}, use) => {
    const user = generateTestUser();
    await use(user);
  },

  // Page with user already onboarded
  authenticatedPage: async ({ page, user }, use) => {
    // Navigate to onboarding
    await page.goto('/onboarding');

    // Fill onboarding form
    await page.fill('input[name="name"]', user.name);
    await page.fill('input[name="birthDate"]', user.birthDate);
    await page.fill('input[name="birthTime"]', user.birthTime);

    // Select gender
    const genderSelector = user.gender === 'male' ? 'button[data-gender="male"]' : 'button[data-gender="female"]';
    await page.click(genderSelector);

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for redirect to home
    await page.waitForURL(/\/home/, { timeout: 10000 });

    await use(page);
  },
});

// Helper to wait for page load
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

// Helper to change language in settings
export async function setLanguage(page: Page, language: 'vi' | 'en') {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');
  await page.selectOption('select', language);
  // Wait for language change to take effect
  await page.waitForTimeout(500);
}

// Helper to change theme in settings
export async function setTheme(page: Page, theme: 'light' | 'dark' | 'system') {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');
  const themeValue = theme === 'light' ? 'light' : theme === 'dark' ? 'dark' : 'system';
  await page.click(`input[type="radio"][value="${themeValue}"], label:has-text("${theme}")`);
  await page.waitForTimeout(500);
}

// Helper to clear localStorage (reset app state)
export async function clearAppState(page: Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
  });
}

// Helper to check if element is visible and enabled
export async function isInteractable(page: Page, selector: string): Promise<boolean> {
  try {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout: 5000 });
    return await element.isEnabled();
  } catch {
    return false;
  }
}

export { expect };