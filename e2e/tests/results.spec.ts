import { test, expect } from '../fixtures';
import { ResultPage } from '../pages/ResultPage';
import { HomePage } from '../pages/HomePage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { TEST_USERS } from '../utils/test-data';

test.describe('Results Page', () => {
  let resultPage: ResultPage;
  let homePage: HomePage;
  let onboardingPage: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    resultPage = new ResultPage(page);
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
    test('RS-01: should display loading state while fetching results', async ({ page }) => {
      await resultPage.navigate('lifetime');

      // Should show loading initially or content
      const isLoading = await resultPage.isLoading();
      const hasContent = await resultPage.isAstrologyContentVisible().catch(() => false);

      expect(isLoading || hasContent).toBeTruthy();
    });

    test('RS-02: should display results after loading', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });

    test('RS-03: should display user info card', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.userInfoCard).toBeVisible();
    });

    test('RS-04: should display correct user name', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      const userName = await resultPage.getUserName();
      expect(userName.length).toBeGreaterThan(0);
    });
  });

  test.describe('Tab Navigation', () => {
    test('RS-05: should display Astrology tab by default', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });

    test('RS-06: should switch to Numerology tab', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.switchToNumerologyTab();
      await page.waitForTimeout(500);

      expect(await resultPage.isNumerologyContentVisible()).toBeTruthy();
    });

    test('RS-07: should switch to I Ching tab', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.switchToIchingTab();
      await page.waitForTimeout(500);

      expect(await resultPage.isIchingContentVisible()).toBeTruthy();
    });

    test('RS-08: should switch between tabs multiple times', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      // Switch to numerology
      await resultPage.switchToNumerologyTab();
      await page.waitForTimeout(300);
      expect(await resultPage.isNumerologyContentVisible()).toBeTruthy();

      // Switch to iching
      await resultPage.switchToIchingTab();
      await page.waitForTimeout(300);
      expect(await resultPage.isIchingContentVisible()).toBeTruthy();

      // Switch back to astrology
      await resultPage.switchToAstrologyTab();
      await page.waitForTimeout(300);
      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });
  });

  test.describe('Analysis Types', () => {
    test('RS-09: should display lifetime analysis', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(page).toHaveURL(/type=lifetime/);
    });

    test('RS-10: should display daily forecast', async ({ page }) => {
      await resultPage.navigate('daily');
      await resultPage.waitForResults();

      await expect(page).toHaveURL(/type=daily/);
    });

    test('RS-11: should display specific analysis with aspect', async ({ page }) => {
      await resultPage.navigate('specific', 'love');
      await resultPage.waitForResults();

      await expect(page).toHaveURL(/type=specific/);
      await expect(page).toHaveURL(/aspect=love/);
    });
  });

  test.describe('Navigation', () => {
    test('RS-12: should display settings button', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.settingsButton).toBeVisible();
    });

    test('RS-13: should display back button', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.backButton).toBeVisible();
    });

    test('RS-14: should navigate to settings from results', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.settingsButton.click();
      await expect(page).toHaveURL(/\/settings/);
    });

    test('RS-15: should navigate back to home', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.backButton.click();
      await expect(page).toHaveURL(/\/home/);
    });

    test('RS-16: should navigate to onboarding when editing user info', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.editUserInfo();
      await expect(page).toHaveURL(/\/onboarding/);
    });
  });

  test.describe('Action Buttons', () => {
    test('RS-17: should display save button', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.saveButton).toBeVisible();
    });

    test('RS-18: should display share button', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.shareButton).toBeVisible();
    });
  });

  test.describe('Content Display', () => {
    test('RS-19: should display astrology content', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      const content = await page.locator('.astrology-content, [data-testid="astrology-content"]').textContent();
      expect(content?.length).toBeGreaterThan(0);
    });

    test('RS-20: should display numerology content', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.switchToNumerologyTab();
      const content = await page.locator('.numerology-content, [data-testid="numerology-content"]').textContent();
      expect(content?.length).toBeGreaterThan(0);
    });

    test('RS-21: should display iching content', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await resultPage.switchToIchingTab();
      const content = await page.locator('.iching-content, [data-testid="iching-content"]').textContent();
      expect(content?.length).toBeGreaterThan(0);
    });
  });

  test.describe('Access Control', () => {
    test('RS-22: should redirect to onboarding if not authenticated', async ({ page }) => {
      await page.evaluate(() => localStorage.clear());
      await resultPage.navigate('lifetime');

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('RS-23: should allow direct access when authenticated', async ({ page }) => {
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(page).toHaveURL(/\/result/);
    });
  });

  test.describe('Responsive Design', () => {
    test('RS-24: should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.userInfoCard).toBeVisible();
      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });

    test('RS-25: should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.userInfoCard).toBeVisible();
      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });

    test('RS-26: should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await resultPage.navigate('lifetime');
      await resultPage.waitForResults();

      await expect(resultPage.userInfoCard).toBeVisible();
      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });
  });
});