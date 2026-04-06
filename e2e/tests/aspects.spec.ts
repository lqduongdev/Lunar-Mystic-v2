import { test, expect } from '../fixtures';
import { AspectsPage } from '../pages/AspectsPage';
import { HomePage } from '../pages/HomePage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { TEST_USERS, ASPECTS } from '../utils/test-data';

test.describe('Aspects Page', () => {
  let aspectsPage: AspectsPage;
  let homePage: HomePage;
  let onboardingPage: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    aspectsPage = new AspectsPage(page);
    homePage = new HomePage(page);
    onboardingPage = new OnboardingPage(page);

    // Clear state and complete onboarding
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    await onboardingPage.navigate();
    await onboardingPage.fillForm(TEST_USERS.vietnamese);
    await onboardingPage.submit();
    await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
  });

  test.describe('Page Load', () => {
    test('AS-01: should display aspects page with all 6 aspects', async ({ page }) => {
      await aspectsPage.navigate();

      const count = await aspectsPage.getAspectCount();
      expect(count).toBe(6);
    });

    test('AS-02: should display settings button on aspects page', async ({ page }) => {
      await aspectsPage.navigate();
      await expect(aspectsPage.settingsButton).toBeVisible();
    });

    test('AS-03: should display back button on aspects page', async ({ page }) => {
      await aspectsPage.navigate();
      await expect(aspectsPage.backButton).toBeVisible();
    });
  });

  test.describe('Aspect Selection', () => {
    test('AS-04: should select Love aspect', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.selectAspect('love');
      await expect(page).toHaveURL(/\/result.*aspect=love/);
    });

    test('AS-05: should select Career aspect', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.selectAspect('career');
      await expect(page).toHaveURL(/\/result.*aspect=career/);
    });

    test('AS-06: should select Finance aspect', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.selectAspect('finance');
      await expect(page).toHaveURL(/\/result.*aspect=finance/);
    });

    test('AS-07: should select Health aspect', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.selectAspect('health');
      await expect(page).toHaveURL(/\/result.*aspect=health/);
    });

    test('AS-08: should select Family aspect', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.selectAspect('family');
      await expect(page).toHaveURL(/\/result.*aspect=family/);
    });

    test('AS-09: should select Other aspect', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.selectAspect('other');
      await expect(page).toHaveURL(/\/result.*aspect=other/);
    });
  });

  test.describe('Aspect Visibility', () => {
    test('AS-10: should show all aspect options', async ({ page }) => {
      await aspectsPage.navigate();

      for (const aspect of ASPECTS) {
        expect(await aspectsPage.isAspectVisible(aspect.key)).toBeTruthy();
      }
    });

    test('AS-11: should show Vietnamese labels in VI locale', async ({ page }) => {
      await aspectsPage.navigate();

      const aspects = await aspectsPage.getAllAspects();
      const hasVietnamese = aspects.some(text =>
        ASPECTS.some(a => text.includes(a.labelVi))
      );
      expect(hasVietnamese).toBeTruthy();
    });
  });

  test.describe('Navigation', () => {
    test('AS-12: should navigate back to home', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.goBack();
      await expect(page).toHaveURL(/\/home/);
    });

    test('AS-13: should access aspects from home via specific analysis card', async ({ page }) => {
      await homePage.navigate();
      await homePage.selectSpecificAnalysis();
      await expect(page).toHaveURL(/\/aspects/);
    });

    test('AS-14: should navigate to settings from aspects', async ({ page }) => {
      await aspectsPage.navigate();
      await aspectsPage.settingsButton.click();
      await expect(page).toHaveURL(/\/settings/);
    });
  });

  test.describe('Access Control', () => {
    test('AS-15: should redirect to onboarding if not authenticated', async ({ page }) => {
      await page.evaluate(() => localStorage.clear());
      await aspectsPage.navigate();

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('AS-16: should allow direct access when authenticated', async ({ page }) => {
      await aspectsPage.navigate();
      await expect(page).toHaveURL(/\/aspects/);
    });
  });

  test.describe('Responsive Design', () => {
    test('AS-17: should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await aspectsPage.navigate();

      const count = await aspectsPage.getAspectCount();
      expect(count).toBeGreaterThanOrEqual(6);
    });

    test('AS-18: should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await aspectsPage.navigate();

      const count = await aspectsPage.getAspectCount();
      expect(count).toBe(6);
    });

    test('AS-19: should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await aspectsPage.navigate();

      const count = await aspectsPage.getAspectCount();
      expect(count).toBe(6);
    });
  });
});