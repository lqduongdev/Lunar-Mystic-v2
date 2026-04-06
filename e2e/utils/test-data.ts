/**
 * Test data generators for E2E tests
 */

export interface TestUser {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
}

// Valid Vietnamese names for testing
const VIETNAMESE_NAMES = [
  'Nguyễn Văn An',
  'Trần Thị Bình',
  'Lê Hoàng Cường',
  'Phạm Thu Dung',
  'Hoàng Văn Đức',
  'Vũ Thị Hoa',
  'Đặng Minh Khôi',
  'Bùi Ngọc Lan',
];

// Valid English names for testing
const ENGLISH_NAMES = [
  'John Smith',
  'Jane Doe',
  'Michael Johnson',
  'Emily Davis',
  'Robert Wilson',
  'Sarah Brown',
  'David Lee',
  'Lisa Anderson',
];

/**
 * Generate a random valid test user
 */
export function generateTestUser(): TestUser {
  const useVietnameseName = Math.random() > 0.5;
  const names = useVietnameseName ? VIETNAMESE_NAMES : ENGLISH_NAMES;

  return {
    name: names[Math.floor(Math.random() * names.length)]!,
    birthDate: generateRandomBirthDate(),
    birthTime: generateRandomBirthTime(),
    gender: Math.random() > 0.5 ? 'male' : 'female',
  };
}

/**
 * Generate a valid random birth date (1950-2005)
 */
export function generateRandomBirthDate(): string {
  const startYear = 1950;
  const endYear = 2005;
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid invalid dates

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

/**
 * Generate a valid random birth time (HH:MM format)
 */
export function generateRandomBirthTime(): string {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * Generate test users for boundary testing
 */
export const BOUNDARY_USERS = {
  // Edge case: Very old person
  oldest: {
    name: 'Elder Test',
    birthDate: '1920-01-15',
    birthTime: '06:00',
    gender: 'male' as const,
  },

  // Edge case: Young person
  youngest: {
    name: 'Young Test',
    birthDate: '2005-12-31',
    birthTime: '23:59',
    gender: 'female' as const,
  },

  // Edge case: Leap year birthday
  leapYear: {
    name: 'Leap Year',
    birthDate: '2000-02-29',
    birthTime: '12:00',
    gender: 'male' as const,
  },

  // Edge case: Midnight birth
  midnight: {
    name: 'Midnight Birth',
    birthDate: '1990-06-15',
    birthTime: '00:00',
    gender: 'female' as const,
  },
};

/**
 * Invalid test data for validation testing
 */
export const INVALID_USERS = {
  // Empty name
  emptyName: {
    name: '',
    birthDate: '1990-01-15',
    birthTime: '10:00',
    gender: 'male' as const,
    expectedError: 'name',
  },

  // Invalid date: month > 12
  invalidMonth: {
    name: 'Invalid Month',
    birthDate: '1990-13-15',
    birthTime: '10:00',
    gender: 'male' as const,
    expectedError: 'birthDate',
  },

  // Invalid date: day > 31
  invalidDay: {
    name: 'Invalid Day',
    birthDate: '1990-01-32',
    birthTime: '10:00',
    gender: 'male' as const,
    expectedError: 'birthDate',
  },

  // Invalid date: year < 1900
  invalidYearOld: {
    name: 'Too Old',
    birthDate: '1899-01-15',
    birthTime: '10:00',
    gender: 'male' as const,
    expectedError: 'birthDate',
  },

  // Invalid date: future year
  invalidYearFuture: {
    name: 'Future Birth',
    birthDate: '2030-01-15',
    birthTime: '10:00',
    gender: 'male' as const,
    expectedError: 'birthDate',
  },

  // Invalid time format
  invalidTime: {
    name: 'Invalid Time',
    birthDate: '1990-01-15',
    birthTime: '25:00',
    gender: 'male' as const,
    expectedError: 'birthTime',
  },
};

/**
 * Predefined test users for consistent testing
 */
export const TEST_USERS = {
  vietnamese: {
    name: 'Nguyễn Văn Test',
    birthDate: '1990-06-15',
    birthTime: '14:30',
    gender: 'male' as const,
  },

  english: {
    name: 'Test User',
    birthDate: '1985-03-20',
    birthTime: '09:00',
    gender: 'female' as const,
  },

  male: {
    name: 'Male User',
    birthDate: '1995-08-25',
    birthTime: '16:00',
    gender: 'male' as const,
  },

  female: {
    name: 'Female User',
    birthDate: '1995-08-25',
    birthTime: '16:00',
    gender: 'female' as const,
  },
};

/**
 * Get expected zodiac sign based on birth date (for validation)
 */
export function getZodiacSign(month: number, day: number): string {
  const zodiacSigns = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
  ];

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start;
    const [endMonth, endDay] = zodiac.end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && (month === startMonth || month === endMonth))
    ) {
      return zodiac.sign;
    }
  }

  return 'Unknown';
}

/**
 * Expected aspects for analysis
 */
export const ASPECTS = [
  { key: 'love', labelVi: 'Tình duyên', labelEn: 'Love' },
  { key: 'career', labelVi: 'Sự nghiệp', labelEn: 'Career' },
  { key: 'finance', labelVi: 'Tài lộc', labelEn: 'Finance' },
  { key: 'health', labelVi: 'Sức khỏe', labelEn: 'Health' },
  { key: 'family', labelVi: 'Gia đạo', labelEn: 'Family' },
  { key: 'other', labelVi: 'Khác', labelEn: 'Other' },
];

/**
 * Analysis types
 */
export const ANALYSIS_TYPES = [
  { key: 'lifetime', labelVi: 'Cả đời', labelEn: 'Whole Life' },
  { key: 'daily', labelVi: 'Dự báo ngày', labelEn: 'Daily Forecast' },
  { key: 'specific', labelVi: 'Cụ thể', labelEn: 'Specific Analysis' },
];