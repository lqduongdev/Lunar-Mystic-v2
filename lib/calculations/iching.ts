/**
 * I Ching (Kinh Dịch) Calculation Engine
 * Generates hexagrams from birth data using traditional methods
 */

export interface Hexagram {
  number: number;
  name: string;
  lines: number[]; // 1 = yang (solid), 0 = yin (broken), bottom to top
  meaning: string;
  advice?: string[];
}

export interface IChingResult {
  mainHexagram: Hexagram;
  supportHexagram: Hexagram;
  detailedAnalysis: string;
}

export interface IChingInput {
  birthDate: string; // MM/DD/YYYY
  birthTime: string; // HH:MM AM/PM
  gender: "male" | "female";
}

/**
 * The 64 Hexagrams of I Ching with names and meanings
 */
const HEXAGRAMS: Record<number, { name: string; meaning: string; advice: string[] }> = {
  1: {
    name: "Qián - The Creative",
    meaning: "Pure yang energy. Great success through perseverance. Creative power and leadership.",
    advice: ["Take initiative", "Stay persistent", "Lead with integrity"]
  },
  2: {
    name: "Kūn - The Receptive",
    meaning: "Pure yin energy. Receptivity brings success. Nurturing and supporting role.",
    advice: ["Be receptive", "Support others", "Practice patience"]
  },
  3: {
    name: "Zhūn - Difficulty at the Beginning",
    meaning: "Initial challenges before growth. Perseverance through confusion.",
    advice: ["Don't give up early", "Seek help when needed", "Build foundations slowly"]
  },
  4: {
    name: "Méng - Youthful Folly",
    meaning: "Learning and inexperience. Seeking wisdom from teachers.",
    advice: ["Be humble and learn", "Find a good teacher", "Ask questions"]
  },
  5: {
    name: "Xū - Waiting",
    meaning: "Patient waiting brings success. Nourishment during delay.",
    advice: ["Be patient", "Use waiting time wisely", "Trust the process"]
  },
  6: {
    name: "Sòng - Conflict",
    meaning: "Disagreement and opposition. Avoid escalation.",
    advice: ["Seek compromise", "Avoid direct confrontation", "Find middle ground"]
  },
  7: {
    name: "Shī - The Army",
    meaning: "Organization and discipline. Leadership through structure.",
    advice: ["Organize systematically", "Lead with discipline", "Maintain order"]
  },
  8: {
    name: "Bǐ - Holding Together",
    meaning: "Unity and cooperation. Building alliances.",
    advice: ["Build relationships", "Cooperate with others", "Create harmony"]
  },
  9: {
    name: "Xiǎo Chù - Taming Power of the Small",
    meaning: "Gentle restraint. Small efforts accumulate.",
    advice: ["Be gentle in approach", "Focus on small steps", "Practice restraint"]
  },
  10: {
    name: "Lǚ - Treading",
    meaning: "Careful conduct. Walking on a tiger's tail with caution.",
    advice: ["Proceed carefully", "Mind your manners", "Stay humble"]
  },
  11: {
    name: "Tài - Peace",
    meaning: "Harmony and prosperity. Heaven and earth in union.",
    advice: ["Enjoy this period", "Maintain balance", "Share prosperity"]
  },
  12: {
    name: "Pǐ - Standstill",
    meaning: "Stagnation. Heaven and earth apart. Time to withdraw.",
    advice: ["Don't force progress", "Conserve energy", "Wait for better times"]
  },
  13: {
    name: "Tóng Rén - Fellowship",
    meaning: "Community and shared vision. Working with like-minded people.",
    advice: ["Build community", "Share your vision", "Collaborate openly"]
  },
  14: {
    name: "Dà Yǒu - Great Possession",
    meaning: "Abundance and success. Great achievements possible.",
    advice: ["Use resources wisely", "Be generous", "Stay humble in success"]
  },
  15: {
    name: "Qiān - Modesty",
    meaning: "Humility brings success. Mountain within, earth without.",
    advice: ["Practice humility", "Don't boast", "Let results speak"]
  },
  16: {
    name: "Yù - Enthusiasm",
    meaning: "Inspiration and motivation. Moving others through joy.",
    advice: ["Share your enthusiasm", "Inspire others", "Celebrate progress"]
  },
  17: {
    name: "Suí - Following",
    meaning: "Adaptation and flexibility. Following the right leader.",
    advice: ["Know when to follow", "Be adaptable", "Choose wisely"]
  },
  18: {
    name: "Gǔ - Work on Decay",
    meaning: "Repairing what has been damaged. Correcting past mistakes.",
    advice: ["Fix root causes", "Learn from mistakes", "Renew systematically"]
  },
  19: {
    name: "Lín - Approach",
    meaning: "Progress and growth. Favorable time to advance.",
    advice: ["Move forward confidently", "Be sincere", "Stay grounded"]
  },
  20: {
    name: "Guān - Contemplation",
    meaning: "Observation and reflection. Seeing the bigger picture.",
    advice: ["Observe before acting", "Reflect deeply", "Seek understanding"]
  },
  21: {
    name: "Shì Kè - Biting Through",
    meaning: "Breaking through obstacles. Justice and clarity.",
    advice: ["Be decisive", "Seek truth", "Remove obstacles"]
  },
  22: {
    name: "Bì - Grace",
    meaning: "Beauty and elegance. Form supports substance.",
    advice: ["Cultivate beauty", "Balance form and substance", "Express gracefully"]
  },
  23: {
    name: "Bō - Splitting Apart",
    meaning: "Decline and erosion. Old structures falling.",
    advice: ["Accept endings", "Let go gracefully", "Prepare for renewal"]
  },
  24: {
    name: "Fù - Return",
    meaning: "Revival and renewal. Light returns after darkness.",
    advice: ["Embrace new beginnings", "Learn from cycles", "Start fresh"]
  },
  25: {
    name: "Wú Wàng - Innocence",
    meaning: "Natural spontaneity. Acting without ulterior motives.",
    advice: ["Be genuine", "Trust your nature", "Act spontaneously"]
  },
  26: {
    name: "Dà Chù - Taming Power of the Great",
    meaning: "Great restraint and accumulation. Building strength.",
    advice: ["Build reserves", "Practice discipline", "Accumulate wisdom"]
  },
  27: {
    name: "Yí - Corners of the Mouth",
    meaning: "Nourishment. What we take in and give out.",
    advice: ["Nourish yourself well", "Watch your words", "Feed your spirit"]
  },
  28: {
    name: "Dà Guò - Preponderance of the Great",
    meaning: "Extraordinary times require extraordinary measures.",
    advice: ["Take bold action", "Accept responsibility", "Rise to the occasion"]
  },
  29: {
    name: "Kǎn - The Abysmal",
    meaning: "Danger and depth. Water over water. Keep moving.",
    advice: ["Keep flowing", "Face fears", "Trust your path"]
  },
  30: {
    name: "Lí - The Clinging",
    meaning: "Fire and clarity. Dependence on what is correct.",
    advice: ["Seek clarity", "Cultivate awareness", "Stay centered"]
  },
  31: {
    name: "Xián - Influence",
    meaning: "Attraction and influence. Mutual responsiveness.",
    advice: ["Be open to influence", "Respond genuinely", "Create connection"]
  },
  32: {
    name: "Héng - Duration",
    meaning: "Perseverance and consistency. Long-term success.",
    advice: ["Stay consistent", "Build lasting habits", "Be patient"]
  },
  33: {
    name: "Dùn - Retreat",
    meaning: "Strategic withdrawal. Retreat to advance.",
    advice: ["Know when to retreat", "Preserve your strength", "Live to fight another day"]
  },
  34: {
    name: "Dà Zhuàng - Power of the Great",
    meaning: "Great strength and vigor. Right action through power.",
    advice: ["Use power wisely", "Stay on the right path", "Avoid arrogance"]
  },
  35: {
    name: "Jìn - Progress",
    meaning: "Advancement and recognition. Rising like the sun.",
    advice: ["Move forward confidently", "Accept recognition", "Shine brightly"]
  },
  36: {
    name: "Míng Yí - Darkening of the Light",
    meaning: "Light hidden. Difficult times require inner strength.",
    advice: ["Protect your light", "Stay inner-focused", "Endure patiently"]
  },
  37: {
    name: "Jiā Rén - The Family",
    meaning: "Family and household. Order begins at home.",
    advice: ["Strengthen family bonds", "Create harmony at home", "Lead by example"]
  },
  38: {
    name: "Kuí - Opposition",
    meaning: "Contradiction and misunderstanding. Small progress possible.",
    advice: ["Accept differences", "Find common ground", "Work independently"]
  },
  39: {
    name: "Jiǎn - Obstruction",
    meaning: "Obstacles ahead. Turn inward for solutions.",
    advice: ["Pause and reflect", "Seek inner guidance", "Go around obstacles"]
  },
  40: {
    name: "Xiè - Deliverance",
    meaning: "Release and relief. Tension resolves.",
    advice: ["Let go of burdens", "Forgive and move on", "Embrace relief"]
  },
  41: {
    name: "Sǔn - Decrease",
    meaning: "Sacrifice and simplification. Less is more.",
    advice: ["Simplify", "Give generously", "Reduce attachments"]
  },
  42: {
    name: "Yì - Increase",
    meaning: "Growth and expansion. Beneficial to undertake.",
    advice: ["Expand confidently", "Share benefits", "Grow sustainably"]
  },
  43: {
    name: "Guài - Breakthrough",
    meaning: "Decisive breakthrough. Resolute action needed.",
    advice: ["Be decisive", "Speak truth", "Act with resolution"]
  },
  44: {
    name: "Gòu - Coming to Meet",
    meaning: "Unexpected encounter. The feminine meets the masculine.",
    advice: ["Be open to meetings", "Stay discerning", "Welcome the new"]
  },
  45: {
    name: "Cuì - Gathering Together",
    meaning: "Collection and assembly. People unite around a leader.",
    advice: ["Gather your resources", "Unite with others", "Find common purpose"]
  },
  46: {
    name: "Shēng - Pushing Upward",
    meaning: "Steady growth. Like a plant rising through earth.",
    advice: ["Grow steadily", "Be persistent", "Rise naturally"]
  },
  47: {
    name: "Kùn - Oppression",
    meaning: "Exhaustion and constraint. Words are not believed.",
    advice: ["Conserve energy", "Stay true", "Wait for release"]
  },
  48: {
    name: "Jǐng - The Well",
    meaning: "Source of nourishment. The well serves all.",
    advice: ["Draw from deep sources", "Serve others", "Maintain your well"]
  },
  49: {
    name: "Gé - Revolution",
    meaning: "Radical change. Molting and transformation.",
    advice: ["Embrace change", "Time your actions", "Transform completely"]
  },
  50: {
    name: "Dǐng - The Cauldron",
    meaning: "Nourishment and transformation. Sacred vessel.",
    advice: ["Nourish yourself", "Transform wisely", "Honor traditions"]
  },
  51: {
    name: "Zhèn - The Arousing",
    meaning: "Shock and awakening. Thunder brings movement.",
    advice: ["Stay centered in chaos", "Embrace awakening", "Move with the shock"]
  },
  52: {
    name: "Gèn - Keeping Still",
    meaning: "Mountain and stillness. Know when to stop.",
    advice: ["Practice stillness", "Know limits", "Rest when needed"]
  },
  53: {
    name: "Jiàn - Development",
    meaning: "Gradual progress. Like a tree growing slowly.",
    advice: ["Progress gradually", "Build step by step", "Be patient"]
  },
  54: {
    name: "Guī Mèi - The Marrying Maiden",
    meaning: "Secondary position. Accepting a supporting role.",
    advice: ["Know your position", "Be supportive", "Accept gracefully"]
  },
  55: {
    name: "Fēng - Abundance",
    meaning: "Peak abundance. Sun at zenith. Share generously.",
    advice: ["Share your abundance", "Prepare for cycles", "Enjoy fully"]
  },
  56: {
    name: "Lǚ - The Wanderer",
    meaning: "Traveling and impermanence. Find home within.",
    advice: ["Stay adaptable", "Be respectful abroad", "Find inner home"]
  },
  57: {
    name: "Xùn - The Gentle",
    meaning: "Wind and penetration. Gentle persistence works.",
    advice: ["Be gently persistent", "Penetrate slowly", "Yield to overcome"]
  },
  58: {
    name: "Duì - The Joyous",
    meaning: "Lake and joy. Pleasure and satisfaction.",
    advice: ["Cultivate joy", "Share happiness", "Practice gratitude"]
  },
  59: {
    name: "Huàn - Dispersion",
    meaning: "Dissolving obstacles. Scattering and spreading.",
    advice: ["Let go of rigidity", "Spread your influence", "Dissolve barriers"]
  },
  60: {
    name: "Jié - Limitation",
    meaning: "Boundaries and moderation. Accept limits gracefully.",
    advice: ["Accept limits", "Practice moderation", "Create healthy boundaries"]
  },
  61: {
    name: "Zhōng Fú - Inner Truth",
    meaning: "Sincerity and trust. Truth in the heart.",
    advice: ["Be sincere", "Trust your truth", "Act with integrity"]
  },
  62: {
    name: "Xiǎo Guò - Preponderance of the Small",
    meaning: "Small things matter. Humble actions succeed.",
    advice: ["Focus on details", "Be humble", "Do small things well"]
  },
  63: {
    name: "Jì Jì - After Completion",
    meaning: "Order achieved. Success attained. Stay vigilant.",
    advice: ["Stay vigilant", "Maintain order", "Prepare for change"]
  },
  64: {
    name: "Wèi Jì - Before Completion",
    meaning: "Transition phase. Success near but not yet achieved.",
    advice: [" persevere", "Stay focused", "Complete what you start"]
  }
};

/**
 * Calculate hexagram from birth data using simplified method
 * Combines date and time to generate 6-line hexagram
 */
export function calculateHexagram(birthDate: string, birthTime: string): Hexagram {
  const dateParts = birthDate.split('/');
  const [month, day, year] = dateParts.map(p => parseInt(p, 10));

  // Parse time
  const timeMatch = birthTime.match(/(\d+):(\d+)/);
  const hour = timeMatch ? parseInt(timeMatch[1], 10) : 12;

  // Generate hexagram number from birth data
  // Traditional method uses yarrow stalks or coins
  // Here we use a deterministic algorithm based on birth data
  const sum = month + day + year + hour;

  // Use modulo to get hexagram number (1-64)
  let hexNum = ((sum - 1) % 64) + 1;

  return getHexagram(hexNum);
}

/**
 * Get hexagram by number
 */
export function getHexagram(number: number): Hexagram {
  const data = HEXAGRAMS[number] || HEXAGRAMS[1];

  // Generate lines from the number
  // This is a simplified representation
  const lines = generateLinesFromNumber(number);

  return {
    number,
    name: data.name,
    lines,
    meaning: data.meaning,
    advice: data.advice
  };
}

/**
 * Generate 6 lines from hexagram number
 * Uses binary representation for deterministic output
 */
function generateLinesFromNumber(num: number): number[] {
  const lines: number[] = [];
  let n = num - 1; // 0-indexed

  for (let i = 0; i < 6; i++) {
    lines.push(n % 2);
    n = Math.floor(n / 2);
  }

  return lines;
}

/**
 * Calculate support hexagram (opposite/complementary)
 */
export function calculateSupportHexagram(main: Hexagram): Hexagram {
  // Invert all lines to get complementary hexagram
  const invertedLines = main.lines.map(line => line === 1 ? 0 : 1);

  // Find the hexagram number that matches these lines
  let supportNum = 0;
  for (let i = 5; i >= 0; i--) {
    supportNum = supportNum * 2 + invertedLines[i];
  }
  supportNum += 1; // Convert back to 1-indexed

  return getHexagram(supportNum);
}

/**
 * Full I Ching calculation
 */
export function calculateIChing(input: IChingInput): IChingResult {
  const mainHexagram = calculateHexagram(input.birthDate, input.birthTime);
  const supportHexagram = calculateSupportHexagram(mainHexagram);

  return {
    mainHexagram,
    supportHexagram,
    detailedAnalysis: `Your main hexagram ${mainHexagram.name} indicates ${mainHexagram.meaning.toLowerCase()} The support hexagram ${supportHexagram.name} shows ${supportHexagram.meaning.toLowerCase()}`
  };
}
