/**
 * Mock Data Generator for Lunar Mystic
 * Generates realistic sample analysis results for testing
 */

import type { AnalysisResult } from "@/store/useAppStore";
import { calculateNumerology } from "./calculations/numerology";
import { calculateIChing } from "./calculations/iching";
import { calculateLunarInfo, calculateBodyPalace } from "./calculations/astrology";

/**
 * Generate mock analysis result for testing
 */
export function generateMockResult(
  name: string,
  birthDate: string,
  birthTime: string = "12:00 PM",
  gender: "male" | "female" = "male",
  language: "vi" | "en" = "vi"
): AnalysisResult {
  const parts = birthDate.split('/');
  const year = parts.length === 3 ? parseInt(parts[2], 10) : 1996;

  const lunarInfo = calculateLunarInfo(birthDate, language);
  const bodyPalace = calculateBodyPalace(birthDate, language);
  const numerology = calculateNumerology({ birthDate, name });
  const iching = calculateIChing({ birthDate, birthTime, gender });

  // Sample astrology data
  const lifePalaceElements = [
    {
      label: language === "vi" ? "NGŨ HÀNH" : "ELEMENT",
      value: lunarInfo.element,
      description: language === "vi"
        ? "Ngũ hành bản mệnh, ảnh hưởng đến tính cách và vận mệnh"
        : "Your elemental nature, influencing personality and destiny"
    },
    {
      label: language === "vi" ? "CUNG MỆNH" : "LIFE PALACE",
      value: lunarInfo.palace,
      description: language === "vi"
        ? "Cung chủ quản cuộc đời, thể hiện hướng đi chính"
        : "Main palace governing your life path and direction"
    },
    {
      label: language === "vi" ? "CUNG THÂN" : "BODY PALACE",
      value: bodyPalace,
      description: language === "vi"
        ? "Cung thể hiện hậu vận và cách hành xử"
        : "Palace showing later life and behavioral patterns"
    }
  ];

  const keyStars = [
    {
      name: language === "vi" ? "THIÊN CƠ - THIÊN LƯƠNG" : "TIAN JI - TIAN LIANG",
      description: language === "vi"
        ? "Tư duy logic, sáng tạo, khả năng phân tích mạnh"
        : "Logical thinking, creativity, strong analytical skills"
    },
    {
      name: language === "vi" ? "THÁI ÂM" : "MOON STAR",
      description: language === "vi"
        ? "Phù hợp nghiên cứu, sáng tạo, kinh doanh hoặc công nghệ"
        : "Suitable for research, creativity, business, or tech fields"
    },
    {
      name: language === "vi" ? "TẢ PHÙ - HỮU BẬT" : "LEFT & RIGHT ASSISTANTS",
      description: language === "vi"
        ? "Có quý nhân phù trợ, đặc biệt về tài chính"
        : "Strong support from benefactors, especially in finances"
    },
    {
      name: language === "vi" ? "LIÊM TRINH - PHÁ QUÂN" : "LIAN ZHEN - PO JUN",
      description: language === "vi"
        ? "Ý chí mạnh mẽ, quyết đoán, có thể hơi nóng vội"
        : "Strong-willed, decisive, yet can be impulsive"
    }
  ];

  return {
    userInfo: {
      lunarDate: lunarInfo.lunarDate,
      element: lunarInfo.element,
      palace: lunarInfo.palace,
      bodyPalace,
      birthHour: language === "vi" ? "Giờ Ngọ (11:00-13:00)" : "Horse Hour (11AM-1PM)"
    },
    astrology: {
      lifePalaceElements,
      keyStars,
      majorPeriods: [
        {
          ageRange: language === "vi" ? "0 - 30 tuổi" : "0 - 30",
          description: language === "vi"
            ? "Học hỏi, tích lũy kinh nghiệm và phát triển bản thân"
            : "Personal development, learning, experience accumulation"
        },
        {
          ageRange: language === "vi" ? "31 - 50 tuổi" : "31 - 50",
          description: language === "vi"
            ? "Giai đoạn thành tựu lớn nếu đi đúng hướng"
            : "Major achievements if on the right path"
        },
        {
          ageRange: language === "vi" ? "51+ tuổi" : "51+",
          description: language === "vi"
            ? "Ổn định, hưởng thành quả lao động"
            : "Stability, enjoying the fruits of labor"
        }
      ],
      specificAnalysis: {
        lovePalace: language === "vi"
          ? "Kim - Hỏa tương khắc, cần kiên nhẫn trong tình cảm"
          : "Metal-Fire clash requires patience in relationships",
        compatibleSigns: language === "vi"
          ? "Tý, Thìn, Tỵ"
          : "Rat, Dragon, Snake",
        incompatibleSigns: language === "vi"
          ? "Ngọ, Sửu"
          : "Horse, Ox",
        advice: language === "vi"
          ? "Dùng màu đỏ, hồng để tăng cường vận may tình duyên"
          : "Use red and pink colors to enhance love luck"
      }
    },
    numerology: {
      mainNumber: numerology.mainNumber,
      calculationSteps: numerology.calculationSteps,
      meaning: numerology.meaning,
      subNumbers: numerology.subNumbers,
      lifeCycles: numerology.lifeCycles,
      detailedAnalysis: numerology.detailedAnalysis
    },
    iChing: {
      mainHexagram: iching.mainHexagram,
      supportHexagram: iching.supportHexagram,
      detailedAnalysis: iching.detailedAnalysis
    },
    summary: {
      scores: {
        love: 7,
        career: 9,
        finance: 8,
        health: 6,
        family: 7,
        spiritual: 8
      }
    }
  };
}

/**
 * Sample user data for testing
 */
export const SAMPLE_USERS = [
  {
    name: "Nguyễn Văn Anh",
    birthDate: "10/03/1996",
    birthTime: "07:30 PM",
    gender: "male" as const
  },
  {
    name: "Trần Thị Mai",
    birthDate: "25/12/1990",
    birthTime: "06:15 AM",
    gender: "female" as const
  },
  {
    name: "Lê Hoàng Minh",
    birthDate: "08/08/1988",
    birthTime: "11:45 PM",
    gender: "male" as const
  }
];

/**
 * Generate mock result for default sample user
 */
export function getDefaultMockResult(): AnalysisResult {
  const user = SAMPLE_USERS[0];
  return generateMockResult(user.name, user.birthDate, user.birthTime, user.gender);
}
