/**
 * Numerology (Thần Số Học) Calculation Engine
 * Based on Pythagorean numerology system
 */

export interface NumerologyResult {
  mainNumber: number;
  calculationSteps: string[];
  meaning: string;
  subNumbers: {
    dayNumber: number;
    lifePath: number;
    mission: number;
    soulNumber: number;
  };
  lifeCycles: Array<{ phase: string; description: string }>;
  detailedAnalysis: string;
}

export interface NumerologyInput {
  birthDate: string; // MM/DD/YYYY
  name: string;
}

/**
 * Calculate the main numerology number from birth date
 * Reduces digits until single digit (1-9) or master number (11, 22, 33)
 */
export function calculateLifePathNumber(birthDate: string): number {
  const parts = birthDate.split('/');
  if (parts.length !== 3) return 1;

  const [month, day, year] = parts.map(p => parseInt(p, 10));

  // Reduce each component first
  const reducedMonth = reduceNumber(month);
  const reducedDay = reduceNumber(day);
  const reducedYear = reduceNumber(year);

  // Sum and reduce to final number
  const sum = reducedMonth + reducedDay + reducedYear;
  return reduceNumber(sum);
}

/**
 * Calculate Day Number (from birth day)
 */
export function calculateDayNumber(birthDate: string): number {
  const parts = birthDate.split('/');
  if (parts.length !== 3) return 1;

  const day = parseInt(parts[1], 10);
  return reduceNumber(day);
}

/**
 * Calculate Mission Number (from full name)
 * Uses Pythagorean letter-number correspondence
 */
export function calculateMissionNumber(name: string): number {
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };

  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of cleanName) {
    sum += letterValues[char] || 0;
  }

  return reduceNumber(sum);
}

/**
 * Calculate Soul Number (from vowels in name)
 */
export function calculateSoulNumber(name: string): number {
  const vowels = 'aeiou';
  const letterValues: Record<string, number> = {
    a: 1, e: 5, i: 9, o: 6, u: 3, y: 7
  };

  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of cleanName) {
    if (vowels.includes(char)) {
      sum += letterValues[char] || 0;
    }
  }

  return reduceNumber(sum);
}

/**
 * Reduce a number to single digit or master number
 */
function reduceNumber(num: number): number {
  if (num <= 0) return 1;

  // Keep master numbers
  if (num === 11 || num === 22 || num === 33) return num;

  let n = num;
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = n.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }

  return n;
}

/**
 * Get meaning for a numerology number
 */
export function getNumberMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: "Pioneer, leader, creative thinking, independence, pioneering spirit",
    2: "Diplomat, mediator, sensitive, cooperative, partnership",
    3: "Creative, expressive, optimistic, social, artistic",
    4: "Builder, practical, hardworking, reliable, systematic",
    5: "Adventurer, freedom-loving, versatile, dynamic, change",
    6: "Nurturer, responsible, caring, family-oriented, healing",
    7: "Seeker, analytical, spiritual, introspective, wisdom",
    8: "Achiever, ambitious, material success, power, authority",
    9: "Humanitarian, compassionate, generous, selfless, completion",
    11: "Master number: Intuitive, inspirational, idealistic, visionary",
    22: "Master number: Master builder, turns dreams into reality",
    33: "Master number: Master teacher, spiritual upliftment"
  };
  return meanings[num] || meanings[1];
}

/**
 * Get life cycle descriptions
 */
export function getLifeCycles(birthDate: string): Array<{ phase: string; description: string }> {
  const lifePath = calculateLifePathNumber(birthDate);

  return [
    {
      phase: "0 - 30",
      description: `Learning and experience accumulation. Influenced by Day Number ${calculateDayNumber(birthDate)}. Formative years of personal development.`
    },
    {
      phase: "31 - 55",
      description: `Strong development phase. Main Life Path ${lifePath} energy. Peak productivity and achievement period.`
    },
    {
      phase: "56+",
      description: `Wisdom and stability. Harvesting the fruits of labor. Sharing knowledge with younger generations.`
    }
  ];
}

/**
 * Full numerology calculation
 */
export function calculateNumerology(input: NumerologyInput): NumerologyResult {
  const mainNumber = calculateLifePathNumber(input.birthDate);
  const dayNumber = calculateDayNumber(input.birthDate);
  const missionNumber = calculateMissionNumber(input.name);
  const soulNumber = calculateSoulNumber(input.name);

  // Build calculation steps
  const calculationSteps = buildCalculationSteps(input.birthDate, mainNumber);

  return {
    mainNumber,
    calculationSteps,
    meaning: getNumberMeaning(mainNumber),
    subNumbers: {
      dayNumber,
      lifePath: mainNumber,
      mission: missionNumber,
      soulNumber
    },
    lifeCycles: getLifeCycles(input.birthDate),
    detailedAnalysis: `Life Path ${mainNumber} symbolizes ${getNumberMeaning(mainNumber).toLowerCase()}. Your Day Number ${dayNumber} influences your natural talents, while Mission Number ${missionNumber} guides your purpose. Soul Number ${soulNumber} reveals your inner desires.`
  };
}

function buildCalculationSteps(birthDate: string, finalNumber: number): string[] {
  const parts = birthDate.split('/');
  const [month, day, year] = parts.map(p => parseInt(p, 10));

  const monthSum = month.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
  const daySum = day.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
  const yearSum = year.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);

  const totalSum = monthSum + daySum + yearSum;

  const steps: string[] = [];
  steps.push(`${month} + ${day} + ${year} = ${totalSum}`);

  let current = totalSum;
  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    const digits = current.toString().split('+').join('+');
    const next = current.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
    steps.push(`${digits} = ${current} → ${next}`);
    current = next;
  }

  steps.push(`Final: ${finalNumber}`);

  return steps;
}
