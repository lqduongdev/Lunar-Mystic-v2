/**
 * Video Recording Configuration
 * Defines resolution, frame rate, and style settings for demo videos
 */

export interface VideoConfig {
  resolution: {
    width: number;
    height: number;
  };
  frameRate: number;
  bitRate: string;
  format: 'mp4' | 'webm';
  cursor: {
    enabled: boolean;
    color: string;
    size: number;
  };
  timing: {
    preClickDelay: number;
    postClickDelay: number;
    pageLoadWait: number;
    animationWait: number;
  };
}

// Landscape (16:9) - For web documentation, YouTube
export const LANDSCAPE_1080P: VideoConfig = {
  resolution: {
    width: 1920,
    height: 1080,
  },
  frameRate: 60,
  bitRate: '8M',
  format: 'mp4',
  cursor: {
    enabled: true,
    color: '#FFD700', // Gold/Yellow for visibility
    size: 24,
  },
  timing: {
    preClickDelay: 300,
    postClickDelay: 500,
    pageLoadWait: 1000,
    animationWait: 500,
  },
};

// Vertical (9:16) - For TikTok, Instagram Reels, YouTube Shorts
export const VERTICAL_1080P: VideoConfig = {
  resolution: {
    width: 1080,
    height: 1920,
  },
  frameRate: 60,
  bitRate: '6M',
  format: 'mp4',
  cursor: {
    enabled: true,
    color: '#FFD700',
    size: 32, // Larger for mobile
  },
  timing: {
    preClickDelay: 300,
    postClickDelay: 500,
    pageLoadWait: 1000,
    animationWait: 500,
  },
};

// Mobile portrait (for mobile-specific demos)
export const MOBILE_PORTRAIT: VideoConfig = {
  resolution: {
    width: 390,
    height: 844,
  },
  frameRate: 60,
  bitRate: '4M',
  format: 'mp4',
  cursor: {
    enabled: true,
    color: '#FFD700',
    size: 20,
  },
  timing: {
    preClickDelay: 200,
    postClickDelay: 400,
    pageLoadWait: 800,
    animationWait: 400,
  },
};

// Tablet (iPad)
export const TABLET: VideoConfig = {
  resolution: {
    width: 1024,
    height: 768,
  },
  frameRate: 60,
  bitRate: '6M',
  format: 'mp4',
  cursor: {
    enabled: true,
    color: '#FFD700',
    size: 28,
  },
  timing: {
    preClickDelay: 300,
    postClickDelay: 500,
    pageLoadWait: 1000,
    animationWait: 500,
  },
};

export const DEFAULT_CONFIG = LANDSCAPE_1080P;

export const VIDEO_FORMATS = {
  landscape: LANDSCAPE_1080P,
  vertical: VERTICAL_1080P,
  mobile: MOBILE_PORTRAIT,
  tablet: TABLET,
};

// Video metadata for each demo
export interface DemoVideo {
  id: string;
  name: string;
  nameVi: string;
  nameEn: string;
  description: string;
  duration: {
    min: number;
    max: number;
  };
  flow: string[];
  features: string[];
}

export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'onboarding',
    name: 'Onboarding Flow',
    nameVi: 'Quy trình Onboarding',
    nameEn: 'Onboarding Flow',
    description: 'Complete user onboarding from splash to home',
    duration: { min: 45, max: 60 },
    flow: [
      'splash',
      'name-input',
      'date-picker',
      'time-picker',
      'gender-select',
      'submit',
      'redirect-home',
    ],
    features: [
      'Form validation',
      'Date picker',
      'Time picker',
      'Gender toggle',
      'Navigation',
    ],
  },
  {
    id: 'home',
    name: 'Home Navigation',
    nameVi: 'Điều hướng trang chủ',
    nameEn: 'Home Navigation',
    description: 'Navigate home page and select analysis type',
    duration: { min: 30, max: 45 },
    flow: [
      'home-load',
      'whole-life-card',
      'daily-forecast-card',
      'specific-analysis-card',
      'settings-access',
    ],
    features: [
      'Three analysis options',
      'Card interactions',
      'Settings navigation',
    ],
  },
  {
    id: 'aspects',
    name: 'Aspects Selection',
    nameVi: 'Chọn khía cạnh',
    nameEn: 'Aspects Selection',
    description: 'Select specific aspects for analysis',
    duration: { min: 30, max: 45 },
    flow: [
      'aspects-load',
      'love-select',
      'career-select',
      'finance-select',
      'health-select',
      'family-select',
      'other-select',
    ],
    features: [
      'Six aspect options',
      'Selection feedback',
      'Navigation to results',
    ],
  },
  {
    id: 'results',
    name: 'Results Display',
    nameVi: 'Hiển thị kết quả',
    nameEn: 'Results Display',
    description: 'View analysis results across three tabs',
    duration: { min: 60, max: 90 },
    flow: [
      'results-load',
      'user-info-card',
      'astrology-tab',
      'numerology-tab',
      'iching-tab',
      'edit-button',
      'share-button',
    ],
    features: [
      'User information display',
      'Astrology results',
      'Numerology results',
      'I Ching hexagram',
      'Edit and share actions',
    ],
  },
  {
    id: 'settings',
    name: 'Settings & Preferences',
    nameVi: 'Cài đặt & Tùy chọn',
    nameEn: 'Settings & Preferences',
    description: 'Manage app settings and preferences',
    duration: { min: 30, max: 45 },
    flow: [
      'settings-load',
      'language-switch',
      'theme-light',
      'theme-dark',
      'theme-system',
      'notifications-toggle',
      'back-navigation',
    ],
    features: [
      'Language switcher (VI/EN)',
      'Theme selector (Light/Dark/System)',
      'Notifications toggle',
      'Help and Privacy links',
    ],
  },
];