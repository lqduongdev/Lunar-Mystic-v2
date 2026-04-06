/**
 * Astrology (Tử Vi) Calculation Engine
 * Five Elements, Earthly Branches, and Lunar Year helpers
 */

export interface LunarInfo {
  lunarDate: string;
  element: string;
  zodiac: string;
  palace: string;
}

/**
 * Five Elements (Ngũ Hành) mapping by year's last digit
 */
const FIVE_ELEMENTS = {
  vi: {
    0: "Canh - Kim (Metal)",
    1: "Tân - Kim (Metal)",
    2: "Nhâm - Thủy (Water)",
    3: "Quý - Thủy (Water)",
    4: "Giáp - Mộc (Wood)",
    5: "Ất - Mộc (Wood)",
    6: "Bính - Hỏa (Fire)",
    7: "Đinh - Hỏa (Fire)",
    8: "Mậu - Thổ (Earth)",
    9: "Kỷ - Thổ (Earth)"
  },
  en: {
    0: "Metal",
    1: "Metal",
    2: "Water",
    3: "Water",
    4: "Wood",
    5: "Wood",
    6: "Fire",
    7: "Fire",
    8: "Earth",
    9: "Earth"
  }
} as const;

/**
 * 12 Earthly Branches (12 con giáp) - Vietnamese Zodiac
 * Year % 12 determines the animal
 */
const EARTHLY_BRANCHES = {
  vi: [
    "Tý - Chuột (Rat)",
    "Sửu - Trâu (Ox)",
    "Dần - Hổ (Tiger)",
    "Mão - Mèo (Rabbit)",
    "Thìn - Rồng (Dragon)",
    "Tỵ - Rắn (Snake)",
    "Ngọ - Ngựa (Horse)",
    "Mùi - Dê (Goat)",
    "Thân - Khỉ (Monkey)",
    "Dậu - Gà (Rooster)",
    "Tuất - Chó (Dog)",
    "Hợi - Lợn (Pig)"
  ],
  en: [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig"
  ]
} as const;

/**
 * Calculate Five Element from birth year
 */
export function calculateFiveElement(year: number, lang: "vi" | "en" = "vi"): string {
  const lastDigit = year % 10;
  return FIVE_ELEMENTS[lang][lastDigit as keyof typeof FIVE_ELEMENTS["vi"]];
}

/**
 * Calculate Earthly Branch (zodiac animal) from birth year
 */
export function calculateEarthlyBranch(year: number, lang: "vi" | "en" = "vi"): string {
  // 1900 was Rat year (index 0)
  const index = (year - 1900) % 12;
  const normalizedIndex = index < 0 ? index + 12 : index;
  return EARTHLY_BRANCHES[lang][normalizedIndex];
}

/**
 * Get element name only (for display)
 */
export function getElementName(year: number, lang: "vi" | "en" = "vi"): string {
  const elementMap: Record<number, string> = {
    0: lang === "vi" ? "Kim" : "Metal",
    1: lang === "vi" ? "Kim" : "Metal",
    2: lang === "vi" ? "Thủy" : "Water",
    3: lang === "vi" ? "Thủy" : "Water",
    4: lang === "vi" ? "Mộc" : "Wood",
    5: lang === "vi" ? "Mộc" : "Wood",
    6: lang === "vi" ? "Hỏa" : "Fire",
    7: lang === "vi" ? "Hỏa" : "Fire",
    8: lang === "vi" ? "Thổ" : "Earth",
    9: lang === "vi" ? "Thổ" : "Earth"
  };
  return elementMap[year % 10];
}

/**
 * Get zodiac animal name only
 */
export function getZodiacAnimal(year: number, lang: "vi" | "en" = "vi"): string {
  const index = (year - 1900) % 12;
  const normalizedIndex = index < 0 ? index + 12 : index;
  const full = EARTHLY_BRANCHES[lang][normalizedIndex];

  // Extract just the animal name
  if (lang === "vi") {
    const match = full.match(/- (.+?) \(/);
    return match ? match[1] : full;
  }
  return full;
}

/**
 * Calculate basic lunar info from birth date
 * Note: This is a simplified version - full lunar conversion requires complex algorithms
 */
export function calculateLunarInfo(birthDate: string, lang: "vi" | "en" = "vi"): LunarInfo {
  const parts = birthDate.split('/');
  if (parts.length !== 3) {
    return {
      lunarDate: "Unknown",
      element: "Unknown",
      zodiac: "Unknown",
      palace: "Unknown"
    };
  }

  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);

  // Simplified lunar date approximation
  // In production, use a proper lunar calendar library
  const lunarYear = year - 1; // Approximate lunar year offset
  const element = getElementName(year, lang);
  const zodiac = getZodiacAnimal(year, lang);

  // Calculate palace based on month and zodiac
  const palace = calculatePalace(month, year, lang);

  return {
    lunarDate: `${day}/${month}/${lunarYear}`,
    element,
    zodiac,
    palace
  };
}

/**
 * Calculate life palace based on birth month and year
 * Simplified calculation for MVP
 */
function calculatePalace(month: number, year: number, lang: "vi" | "en" = "vi"): string {
  const palaces = {
    vi: [
      "Tý (Thủy)", "Sửu (Thổ)", "Dần (Mộc)", "Mão (Mộc)",
      "Thìn (Thổ)", "Tỵ (Hỏa)", "Ngọ (Hỏa)", "Mùi (Thổ)",
      "Thân (Kim)", "Dậu (Kim)", "Tuất (Thổ)", "Hợi (Thủy)"
    ],
    en: [
      "Rat (Water)", "Ox (Earth)", "Tiger (Wood)", "Rabbit (Wood)",
      "Dragon (Earth)", "Snake (Fire)", "Horse (Fire)", "Goat (Earth)",
      "Monkey (Metal)", "Rooster (Metal)", "Dog (Earth)", "Pig (Water)"
    ]
  };

  const index = (month - 1 + year) % 12;
  return palaces[lang][index < 0 ? index + 12 : index];
}

/**
 * Get body palace (simplified)
 */
export function calculateBodyPalace(birthDate: string, lang: "vi" | "en" = "vi"): string {
  const parts = birthDate.split('/');
  const day = parts.length === 3 ? parseInt(parts[1], 10) : 1;

  const bodyPalaces = {
    vi: [
      "Tý (Thủy)", "Sửu (Thổ)", "Dần (Mộc)", "Mão (Mộc)",
      "Thìn (Thổ)", "Tỵ (Hỏa)", "Ngọ (Hỏa)", "Mùi (Thổ)",
      "Thân (Kim)", "Dậu (Kim)", "Tuất (Thổ)", "Hợi (Thủy)"
    ],
    en: [
      "Rat (Water)", "Ox (Earth)", "Tiger (Wood)", "Rabbit (Wood)",
      "Dragon (Earth)", "Snake (Fire)", "Horse (Fire)", "Goat (Earth)",
      "Monkey (Metal)", "Rooster (Metal)", "Dog (Earth)", "Pig (Water)"
    ]
  };

  const index = (day - 1) % 12;
  return bodyPalaces[lang][index < 0 ? index + 12 : index];
}
