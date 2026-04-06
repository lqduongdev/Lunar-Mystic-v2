import { z } from "zod";

// User Info Schema
const UserInfoSchema = z.object({
  lunarDate: z.string(),
  element: z.string(),
  palace: z.string(),
  bodyPalace: z.string(),
  birthHour: z.string(),
});

// Astrology Schema
const LifePalaceElementSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string(),
});

const KeyStarSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const SpecificAnalysisSchema = z.object({
  lovePalace: z.string(),
  compatibleSigns: z.string(),
  incompatibleSigns: z.string(),
  advice: z.string(),
});

const AstrologySchema = z.object({
  lifePalaceElements: z.array(LifePalaceElementSchema),
  keyStars: z.array(KeyStarSchema),
  palaces: z.array(z.object({
    id: z.number(),
    name: z.string(),
    stars: z.array(z.string()),
    analysis: z.string(),
  })).optional(),
  majorPeriods: z.array(z.object({
    ageRange: z.string(),
    description: z.string(),
  })).optional(),
  specificAnalysis: SpecificAnalysisSchema.optional(),
});

// Numerology Schema
const SubNumbersSchema = z.object({
  dayNumber: z.number(),
  lifePath: z.number(),
  mission: z.number(),
  soulNumber: z.number(),
});

const LifeCycleSchema = z.object({
  phase: z.string(),
  description: z.string(),
});

const NumerologySchema = z.object({
  mainNumber: z.number(),
  calculationSteps: z.array(z.string()),
  meaning: z.string(),
  subNumbers: SubNumbersSchema,
  lifeCycles: z.array(LifeCycleSchema),
  detailedAnalysis: z.string().optional(),
});

// I Ching Schema
const HexagramSchema = z.object({
  number: z.number(),
  name: z.string(),
  lines: z.array(z.number()),
  meaning: z.string(),
  advice: z.array(z.string()).optional(),
});

const IChingSchema = z.object({
  mainHexagram: HexagramSchema,
  supportHexagram: HexagramSchema,
  detailedAnalysis: z.string().optional(),
});

// Summary Schema
const SummarySchema = z.object({
  scores: z.object({
    love: z.number(),
    career: z.number(),
    finance: z.number(),
    health: z.number(),
    family: z.number(),
    spiritual: z.number(),
  }),
});

// Main Response Schema
export const AnalysisResponseSchema = z.object({
  userInfo: UserInfoSchema,
  astrology: AstrologySchema,
  numerology: NumerologySchema,
  iChing: IChingSchema,
  summary: SummarySchema.optional(),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;

export function validateAnalysisResponse(data: unknown): AnalysisResponse {
  return AnalysisResponseSchema.parse(data);
}
