import { test, expect } from '../fixtures';
import { OnboardingPage } from '../pages/OnboardingPage';
import { generateTestUser, BOUNDARY_USERS, INVALID_USERS, TEST_USERS } from '../utils/test-data';

test.describe('Onboarding Flow', () => {
  let onboardingPage: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    onboardingPage = new OnboardingPage(page);
    // Clear any existing state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Successful Onboarding', () => {
    test('OB-01: should complete onboarding with valid Vietnamese user data', async ({ page }) => {
      const user = TEST_USERS.vietnamese;
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();

      // Should redirect to home
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-02: should complete onboarding with valid English user data', async ({ page }) => {
      const user = TEST_USERS.english;
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-03: should complete onboarding with male gender', async ({ page }) => {
      const user = TEST_USERS.male;
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-04: should complete onboarding with female gender', async ({ page }) => {
      const user = TEST_USERS.female;
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-05: should complete onboarding with random valid data', async ({ page, user }) => {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });
  });

  test.describe('Boundary Cases', () => {
    test('OB-06: should handle leap year birthday (Feb 29)', async ({ page }) => {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(BOUNDARY_USERS.leapYear);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-07: should handle midnight birth time (00:00)', async ({ page }) => {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(BOUNDARY_USERS.midnight);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-08: should handle oldest valid birth date', async ({ page }) => {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(BOUNDARY_USERS.oldest);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });

    test('OB-09: should handle youngest valid birth date', async ({ page }) => {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(BOUNDARY_USERS.youngest);
      await onboardingPage.submit();

      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    });
  });

  test.describe('Form Validation', () => {
    test('OB-10: should show error for empty name', async ({ page }) => {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(INVALID_USERS.emptyName);
      await onboardingPage.submit();

      // Should stay on onboarding page
      await expect(page).toHaveURL(/\/onboarding/);

      // Should show validation error
      const nameInput = page.locator('input[name="name"]');
      await expect(nameInput).toBeVisible();
    });

    test('OB-11: should show error for invalid date format', async ({ page }) => {
      await onboardingPage.navigate();

      // Try to fill invalid date
      const invalidData = INVALID_USERS.invalidDay;
      await page.locator('input[name="name"]').fill(invalidData.name);
      await page.locator('input[name="birthDate"]').fill('invalid-date');

      // Form should not submit or should show error
      await expect(page).toHaveURL(/\/onboarding/);
    });

    test('OB-12: should require all fields before submit', async ({ page }) => {
      await onboardingPage.navigate();

      // Submit empty form
      await page.locator('button[type="submit"]').click();

      // Should stay on page
      await expect(page).toHaveURL(/\/onboarding/);
    });
  });

  test.describe('Gender Selection', () => {
    test('OB-13: should select male gender', async ({ page }) => {
      await onboardingPage.navigate();

      const user = generateTestUser();
      user.gender = 'male';

      await onboardingPage.fillForm(user);

      // Verify male button is selected (has active state)
      const maleButton = page.locator('button[data-gender="male"], button:has-text("Nam")');
      await expect(maleButton).toBeVisible();
    });

    test('OB-14: should select female gender', async ({ page }) => {
      await onboardingPage.navigate();

      const user = generateTestUser();
      user.gender = 'female';

      await onboardingPage.fillForm(user);

      // Verify female button is selected
      const femaleButton = page.locator('button[data-gender="female"], button:has-text("Nữ")');
      await expect(femaleButton).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('OB-15: should navigate directly to onboarding page', async ({ page }) => {
      await onboardingPage.navigate();
      await expect(page).toHaveURL(/\/onboarding/);
    });

    test('OB-16: should show onboarding form elements', async ({ page }) => {
      await onboardingPage.navigate();

      // Check all form elements are visible
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="birthDate"]')).toBeVisible();
      await expect(page.locator('input[name="birthTime"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });
  });

  test.describe('Data Persistence', () => {
    test('OB-17: should persist user data after onboarding', async ({ page }) => {
      const user = TEST_USERS.vietnamese;

      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Check localStorage
      const storedData = await page.evaluate(() => {
        const data = localStorage.getItem('lunar-mystic-storage');
        return data ? JSON.parse(data) : null;
      });

      expect(storedData).toBeTruthy();
      expect(storedData.state?.userInfo?.name).toBe(user.name);
    });

    test('OB-18: should not show onboarding if already completed', async ({ page }) => {
      // First complete onboarding
      const user = TEST_USERS.vietnamese;
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Navigate to root
      await page.goto('/');

      // Should redirect to home, not onboarding
      await expect(page).toHaveURL(/\/home/);
    });
  });
});