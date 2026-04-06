/**
 * Demo Video Recording Script
 * Records automated demo videos for Lunar Mystic app
 *
 * Usage:
 *   npx ts-node tests/demo/scripts/record-demo.ts
 *   npx ts-node tests/demo/scripts/record-demo.ts --video=onboarding
 *   npx ts-node tests/demo/scripts/record-demo.ts --lang=vi
 *   npx ts-node tests/demo/scripts/record-demo.ts --resolution=vertical
 */

import { chromium, Browser, Page, BrowserContext } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import {
  VIDEO_FORMATS,
  DEFAULT_CONFIG,
  DEMO_VIDEOS,
  VideoConfig
} from '../config/video-config';
import {
  DEMO_USER_VI,
  DEMO_USER_EN,
  DEMO_SCENARIOS,
  ASPECTS
} from './demo-data';

// Configuration
const BASE_URL = process.env.E2E_BASE_URL || 'https://lunar.lqduong.dev';
const OUTPUT_DIR = path.join(process.cwd(), 'public/videos/raw');
const RECORDING_FORMAT = 'mp4';

interface RecordingOptions {
  video?: string;
  lang?: 'vi' | 'en';
  resolution?: 'landscape' | 'vertical' | 'mobile' | 'tablet';
  headless?: boolean;
}

class DemoRecorder {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private config: VideoConfig;

  constructor(config: VideoConfig = DEFAULT_CONFIG) {
    this.config = config;
  }

  async init() {
    console.log('🚀 Initializing browser...');

    this.browser = await chromium.launch({
      headless: false, // Set to true for CI
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });

    this.context = await this.browser.newContext({
      viewport: {
        width: this.config.resolution.width,
        height: this.config.resolution.height,
      },
      recordVideo: {
        dir: OUTPUT_DIR,
        size: {
          width: this.config.resolution.width,
          height: this.config.resolution.height,
        },
      },
      locale: 'vi-VN',
    });

    this.page = await this.context.newPage();

    console.log(`📱 Viewport: ${this.config.resolution.width}x${this.config.resolution.height}`);
  }

  async cleanup() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    console.log('🧹 Browser closed');
  }

  // Highlight cursor for visibility
  async highlightCursor(x: number, y: number) {
    if (!this.page) return;

    await this.page.evaluate(`
      const highlight = document.createElement('div');
      highlight.id = 'cursor-highlight';
      highlight.style.cssText = 'position:fixed;z-index:99999;width:${this.config.cursor.size}px;height:${this.config.cursor.size}px;border-radius:50%;background:rgba(255,215,0,0.5);border:2px solid ${this.config.cursor.color};pointer-events:none;transform:translate(-50%,-50%);';
      highlight.style.left = '${x}px';
      highlight.style.top = '${y}px';
      document.body.appendChild(highlight);
    `);
  }

  async removeCursorHighlight() {
    if (!this.page) return;
    await this.page.evaluate(`
      const highlight = document.getElementById('cursor-highlight');
      if (highlight) highlight.remove();
    `);
  }

  // Smooth mouse movement
  async moveCursorTo(x: number, y: number) {
    if (!this.page) return;

    await this.page.mouse.move(x, y, {
      steps: 20, // Smooth movement
    });
  }

  async clickWithHighlight(selector: string) {
    if (!this.page) return;

    const element = await this.page.locator(selector).first();
    const box = await element.boundingBox();

    if (box) {
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;

      await this.moveCursorTo(x, y);
      await this.highlightCursor(x, y);
      await this.wait(this.config.timing.preClickDelay);

      await element.click();
      await this.wait(this.config.timing.postClickDelay);

      await this.removeCursorHighlight();
    }
  }

  // Wait helper
  async wait(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  // Type with natural delay
  async typeWithDelay(selector: string, text: string, delay = 50) {
    if (!this.page) return;

    const element = this.page.locator(selector);
    await element.click();

    for (const char of text) {
      await element.press(char);
      await this.wait(delay);
    }
  }

  // Authenticate user (pre-populate state)
  async authenticateUser(language: 'vi' | 'en' = 'vi') {
    if (!this.page) return;

    const user = language === 'vi' ? DEMO_USER_VI : DEMO_USER_EN;

    // Navigate and clear state
    await this.page.goto('/');
    await this.page.evaluate(() => localStorage.clear());

    // Go to onboarding
    await this.page.goto('/onboarding');
    await this.wait(1000);

    // Fill form
    await this.typeWithDelay('input[name="name"]', user.name);
    await this.page.fill('input[name="birthDate"]', user.birthDate);
    await this.page.fill('input[name="birthTime"]', user.birthTime);

    // Select gender
    const genderSelector = user.gender === 'male'
      ? 'button[data-gender="male"], button:has-text("Nam")'
      : 'button[data-gender="female"], button:has-text("Nữ")';
    await this.page.click(genderSelector);

    // Submit
    await this.page.click('button[type="submit"]');
    await this.page.waitForURL(/\/home/, { timeout: 10000 });

    console.log(`✅ Authenticated as ${user.name}`);
  }

  // Record onboarding flow
  async recordOnboarding(language: 'vi' | 'en') {
    if (!this.page) throw new Error('Page not initialized');

    const videoId = `onboarding-${language}`;
    console.log(`🎬 Recording: ${videoId}`);

    const user = language === 'vi' ? DEMO_USER_VI : DEMO_USER_EN;

    // Clear state
    await this.page.goto('/');
    await this.page.evaluate(() => localStorage.clear());
    await this.page.goto('/onboarding');
    await this.wait(1000);

    // Fill name
    await this.clickWithHighlight('input[name="name"]');
    await this.typeWithDelay('input[name="name"]', user.name, 80);
    await this.wait(500);

    // Fill birth date
    await this.clickWithHighlight('input[name="birthDate"]');
    await this.page.fill('input[name="birthDate"]', user.birthDate);
    await this.wait(500);

    // Fill birth time
    await this.clickWithHighlight('input[name="birthTime"]');
    await this.page.fill('input[name="birthTime"]', user.birthTime);
    await this.wait(500);

    // Select gender
    const genderSelector = user.gender === 'male'
      ? 'button[data-gender="male"], button:has-text("Nam")'
      : 'button[data-gender="female"], button:has-text("Nữ")';
    await this.clickWithHighlight(genderSelector);
    await this.wait(800);

    // Submit
    await this.clickWithHighlight('button[type="submit"]');
    await this.wait(2000);

    // Wait for redirect
    await this.page.waitForURL(/\/home/, { timeout: 10000 });
    await this.wait(2000);

    console.log(`✅ Completed: ${videoId}`);
  }

  // Record home page
  async recordHome(language: 'vi' | 'en') {
    if (!this.page) throw new Error('Page not initialized');

    const videoId = `home-${language}`;
    console.log(`🎬 Recording: ${videoId}`);

    await this.authenticateUser(language);
    await this.page.goto('/home');
    await this.wait(1000);

    // Show cards
    const cards = [
      '[data-testid="lifetime-card"], a:has-text("Cả đời"), a:has-text("Whole Life")',
      '[data-testid="daily-card"], a:has-text("Dự báo"), a:has-text("Daily")',
      '[data-testid="specific-card"], a:has-text("Cụ thể"), a:has-text("Specific")',
    ];

    for (const card of cards) {
      await this.clickWithHighlight(card);
      await this.wait(2000);
      await this.page.goBack();
      await this.wait(500);
    }

    // Settings
    await this.clickWithHighlight('a[href="/settings"], button[aria-label="settings"]');
    await this.wait(2000);

    console.log(`✅ Completed: ${videoId}`);
  }

  // Record aspects page
  async recordAspects(language: 'vi' | 'en') {
    if (!this.page) throw new Error('Page not initialized');

    const videoId = `aspects-${language}`;
    console.log(`🎬 Recording: ${videoId}`);

    await this.authenticateUser(language);
    await this.page.goto('/aspects');
    await this.wait(1000);

    // Show each aspect
    for (const aspect of ASPECTS) {
      const selector = `[data-testid="aspect-${aspect.key}"], button[data-aspect="${aspect.key}"]`;
      try {
        await this.clickWithHighlight(selector);
        await this.wait(2000);
        await this.page.goBack();
        await this.wait(500);
      } catch {
        // Aspect selector might be different
        console.log(`⚠️ Aspect ${aspect.key} selector not found`);
      }
    }

    console.log(`✅ Completed: ${videoId}`);
  }

  // Record results page
  async recordResults(language: 'vi' | 'en') {
    if (!this.page) throw new Error('Page not initialized');

    const videoId = `results-${language}`;
    console.log(`🎬 Recording: ${videoId}`);

    await this.authenticateUser(language);
    await this.page.goto('/result?type=lifetime');
    await this.wait(3000);

    // Switch tabs
    const tabs = [
      '[data-testid="tab-astrology"], button:has-text("Tử vi"), button:has-text("Astrology")',
      '[data-testid="tab-numerology"], button:has-text("Thần số"), button:has-text("Numerology")',
      '[data-testid="tab-iching"], button:has-text("Kinh Dịch"), button:has-text("I Ching")',
    ];

    for (const tab of tabs) {
      try {
        await this.clickWithHighlight(tab);
        await this.wait(2000);
      } catch {
        console.log(`⚠️ Tab selector not found`);
      }
    }

    // Show buttons
    await this.clickWithHighlight('[data-testid="edit-btn"], button:has-text("Sửa"), button:has-text("Edit")');
    await this.page.goBack();
    await this.wait(1000);

    console.log(`✅ Completed: ${videoId}`);
  }

  // Record settings page
  async recordSettings(language: 'vi' | 'en') {
    if (!this.page) throw new Error('Page not initialized');

    const videoId = `settings-${language}`;
    console.log(`🎬 Recording: ${videoId}`);

    await this.authenticateUser(language);
    await this.page.goto('/settings');
    await this.wait(1000);

    // Language switch
    await this.clickWithHighlight('select');
    await this.page.selectOption('select', language === 'vi' ? 'en' : 'vi');
    await this.wait(1000);
    await this.page.selectOption('select', language);
    await this.wait(500);

    // Theme toggles
    await this.clickWithHighlight('input[type="radio"][value="light"], label:has-text("Sáng"), label:has-text("Light")');
    await this.wait(1000);
    await this.clickWithHighlight('input[type="radio"][value="dark"], label:has-text("Tối"), label:has-text("Dark")');
    await this.wait(1000);

    // Notifications toggle
    await this.clickWithHighlight('[data-testid="notification-toggle"], .toggle');
    await this.wait(500);

    // Back
    await this.clickWithHighlight('a[href="/home"], button[aria-label="back"]');
    await this.wait(1000);

    console.log(`✅ Completed: ${videoId}`);
  }

  // Main recording function
  async recordAll(options: RecordingOptions) {
    const videos = options.video
      ? DEMO_VIDEOS.filter(v => v.id === options.video)
      : DEMO_VIDEOS;

    const languages = options.lang ? [options.lang] : ['vi', 'en'] as const;

    console.log(`\n📹 Recording ${videos.length} video(s) in ${languages.length} language(s)\n`);

    for (const lang of languages) {
      for (const video of videos) {
        await this.init();

        try {
          switch (video.id) {
            case 'onboarding':
              await this.recordOnboarding(lang);
              break;
            case 'home':
              await this.recordHome(lang);
              break;
            case 'aspects':
              await this.recordAspects(lang);
              break;
            case 'results':
              await this.recordResults(lang);
              break;
            case 'settings':
              await this.recordSettings(lang);
              break;
          }

          // Save video
          const videoPath = await this.context?.page()?.video()?.path();
          if (videoPath) {
            const filename = `${video.id}-${lang}-${this.getResolutionSuffix()}.mp4`;
            const destPath = path.join(OUTPUT_DIR, filename);
            fs.renameSync(videoPath, destPath);
            console.log(`📁 Saved: ${filename}`);
          }
        } catch (error) {
          console.error(`❌ Error recording ${video.id}:`, error);
        }

        await this.cleanup();
      }
    }

    console.log('\n✅ All recordings complete!');
    console.log(`📁 Output: ${OUTPUT_DIR}`);
  }

  private getResolutionSuffix(): string {
    if (this.config.resolution.width === 1920) return 'landscape';
    if (this.config.resolution.width === 1080) return 'vertical';
    if (this.config.resolution.width === 390) return 'mobile';
    return 'custom';
  }
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2);
  const options: RecordingOptions = {
    video: args.find(a => a.startsWith('--video='))?.split('=')[1],
    lang: args.find(a => a.startsWith('--lang='))?.split('=')[1] as 'vi' | 'en',
    resolution: args.find(a => a.startsWith('--resolution='))?.split('=')[1] as 'landscape' | 'vertical',
    headless: args.includes('--headless'),
  };

  const resolution = options.resolution || 'landscape';
  const config = VIDEO_FORMATS[resolution] || DEFAULT_CONFIG;

  const recorder = new DemoRecorder(config);

  try {
    await recorder.recordAll(options);
  } catch (error) {
    console.error('Recording failed:', error);
    process.exit(1);
  } finally {
    await recorder.cleanup();
  }
}

main();