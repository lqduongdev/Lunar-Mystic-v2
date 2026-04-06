import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'https://lunar.lqduong.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    // Language variants
    {
      name: 'chromium-vi',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'vi-VN',
      },
    },
    {
      name: 'chromium-en',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en-US',
      },
    },
  ],

  // No webServer for production testing
  // For local testing, run: E2E_BASE_URL=http://localhost:3400 npx playwright test
});