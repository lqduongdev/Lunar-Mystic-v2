/**
 * Demo Data for Video Recordings
 * Consistent test data across all recordings
 */

export interface DemoUser {
  name: string;
  nameEn: string;
  nameVi: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
}

// Primary demo user - Vietnamese
export const DEMO_USER_VI: DemoUser = {
  name: 'Nguyễn Văn An',
  nameEn: 'Nguyen Van An',
  nameVi: 'Nguyễn Văn An',
  birthDate: '1990-06-15',
  birthTime: '14:30',
  gender: 'male',
};

// Primary demo user - English
export const DEMO_USER_EN: DemoUser = {
  name: 'John Smith',
  nameEn: 'John Smith',
  nameVi: 'John Smith',
  birthDate: '1992-03-20',
  birthTime: '09:00',
  gender: 'male',
};

// Alternative demo user - Female
export const DEMO_USER_FEMALE_VI: DemoUser = {
  name: 'Trần Thị Bình',
  nameEn: 'Tran Thi Binh',
  nameVi: 'Trần Thị Bình',
  birthDate: '1995-08-25',
  birthTime: '16:00',
  gender: 'female',
};

export const DEMO_USER_FEMALE_EN: DemoUser = {
  name: 'Emily Johnson',
  nameEn: 'Emily Johnson',
  nameVi: 'Emily Johnson',
  birthDate: '1993-11-10',
  birthTime: '11:30',
  gender: 'female',
};

// Demo data for different scenarios
export const DEMO_SCENARIOS = {
  // Onboarding flow demo
  onboarding: {
    user: DEMO_USER_VI,
    steps: [
      { action: 'type', field: 'name', value: DEMO_USER_VI.name, delay: 100 },
      { action: 'type', field: 'birthDate', value: DEMO_USER_VI.birthDate, delay: 50 },
      { action: 'type', field: 'birthTime', value: DEMO_USER_VI.birthTime, delay: 50 },
      { action: 'click', selector: 'button[data-gender="male"]', delay: 200 },
      { action: 'click', selector: 'button[type="submit"]', delay: 300 },
    ],
  },

  // Home page demo
  home: {
    navigation: [
      { action: 'wait', duration: 1000 },
      { action: 'hover', selector: '[data-testid="lifetime-card"]', delay: 300 },
      { action: 'click', selector: '[data-testid="lifetime-card"]', delay: 500 },
      { action: 'wait', duration: 2000 },
      { action: 'navigate', path: '/home', delay: 300 },
      { action: 'hover', selector: '[data-testid="daily-card"]', delay: 300 },
      { action: 'click', selector: '[data-testid="daily-card"]', delay: 500 },
    ],
  },

  // Aspects demo
  aspects: {
    steps: [
      { action: 'wait', duration: 800 },
      { action: 'hover', selector: '[data-testid="aspect-love"]', delay: 200 },
      { action: 'click', selector: '[data-testid="aspect-love"]', delay: 300 },
      { action: 'wait', duration: 1500 },
      { action: 'navigate', path: '/aspects', delay: 300 },
      { action: 'hover', selector: '[data-testid="aspect-career"]', delay: 200 },
      { action: 'click', selector: '[data-testid="aspect-career"]', delay: 300 },
    ],
  },

  // Settings demo
  settings: {
    steps: [
      { action: 'wait', duration: 500 },
      { action: 'click', selector: 'select[name="language"]', delay: 200 },
      { action: 'select', selector: 'select[name="language"]', value: 'en', delay: 300 },
      { action: 'wait', duration: 500 },
      { action: 'click', selector: 'input[type="radio"][value="light"]', delay: 200 },
      { action: 'wait', duration: 300 },
      { action: 'click', selector: 'input[type="radio"][value="dark"]', delay: 200 },
    ],
  },
};

// Aspect options for recording
export const ASPECTS = [
  { key: 'love', labelVi: 'Tình duyên', labelEn: 'Love' },
  { key: 'career', labelVi: 'Sự nghiệp', labelEn: 'Career' },
  { key: 'finance', labelVi: 'Tài lộc', labelEn: 'Finance' },
  { key: 'health', labelVi: 'Sức khỏe', labelEn: 'Health' },
  { key: 'family', labelVi: 'Gia đạo', labelEn: 'Family' },
  { key: 'other', labelVi: 'Khác', labelEn: 'Other' },
];

// Analysis types
export const ANALYSIS_TYPES = [
  { key: 'lifetime', labelVi: 'Cả đời', labelEn: 'Whole Life' },
  { key: 'daily', labelVi: 'Dự báo ngày', labelEn: 'Daily Forecast' },
  { key: 'specific', labelVi: 'Cụ thể', labelEn: 'Specific Analysis' },
];

// Theme options
export const THEMES = [
  { key: 'light', labelVi: 'Sáng', labelEn: 'Light' },
  { key: 'dark', labelVi: 'Tối', labelEn: 'Dark' },
  { key: 'system', labelVi: 'Hệ thống', labelEn: 'System' },
];

// Language options
export const LANGUAGES = [
  { key: 'vi', label: 'Tiếng Việt' },
  { key: 'en', label: 'English' },
];