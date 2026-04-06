/**
 * Multi-Agent Orchestrator for Lunar Mystic
 *
 * Parallelizes divination calculations across specialized subagents:
 * - Astrology Agent (Tử Vi specialist)
 * - Numerology Agent (Thần Số Học specialist)
 * - I Ching Agent (Kinh Dịch specialist)
 *
 * Uses Ollama models with role-specific prompts for optimal results.
 */

import { callOllama, AnalysisRequest } from "@/lib/ollama";

export interface AgentRole {
  name: string;
  systemPrompt: string;
  model?: string;
}

export interface SubagentResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  executionTimeMs: number;
}

export interface CombinedAnalysisResult {
  astrology: {
    lifePalaceElements: Array<{ label: string; value: string; description: string }>;
    keyStars: Array<{ name: string; description: string }>;
    palaces?: Array<{ id: number; name: string; stars: string[]; analysis: string }>;
    majorPeriods?: Array<{ ageRange: string; description: string }>;
    specificAnalysis?: {
      lovePalace: string;
      compatibleSigns: string;
      incompatibleSigns: string;
      advice: string;
    };
  };
  numerology: {
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
  };
  iChing: {
    mainHexagram: {
      number: number;
      name: string;
      lines: number[];
      meaning: string;
      advice?: string[];
    };
    supportHexagram: {
      number: number;
      name: string;
      lines: number[];
      meaning: string;
    };
    detailedAnalysis: string;
  };
}

/**
 * Agent roles with specialized prompts
 */
const AGENT_ROLES: Record<string, AgentRole> = {
  astrology: {
    name: "Astrology Specialist",
    systemPrompt: `Bạn là chuyên gia Tử Vi (Vietnamese Astrology) với 30 năm kinh nghiệm.
Nhiệm vụ: Phân tích cung mệnh, an sao, và luận giải tử vi.
Trả về CHỈ JSON hợp lệ theo schema được cung cấp. Không text nào khác. Không markdown.`,
    model: process.env.OLLAMA_ASTROLOGY_MODEL || "qwen3.5:cloud",
  },
  numerology: {
    name: "Numerology Specialist",
    systemPrompt: `Bạn là chuyên gia Thần Số Học (Pythagorean Numerology) với 20 năm kinh nghiệm.
Nhiệm vụ: Tính toán các chỉ số thần số học và luận giải.
Trả về CHỈ JSON hợp lệ theo schema được cung cấp. Không text nào khác. Không markdown.`,
    model: process.env.OLLAMA_NUMEROLOGY_MODEL || "qwen3.5:cloud",
  },
  iChing: {
    name: "I Ching Specialist",
    systemPrompt: `Bạn là chuyên gia Kinh Dịch (I Ching) với 40 năm kinh nghiệm.
Nhiệm vụ: Lập quẻ, phân tích hào, và đưa ra lời khuyên.
Trả về CHỈ JSON hợp lệ theo schema được cung cấp. Không text nào khác. Không markdown.`,
    model: process.env.OLLAMA_ICHING_MODEL || "qwen3.5:cloud",
  },
};

/**
 * Build prompts for each specialized agent
 */
function buildAgentPrompts(request: AnalysisRequest): Record<string, string> {
  const { name, birthDate, birthTime, gender, analysisType, language } = request;
  const lang = language === "vi" ? "Tiếng Việt" : "English";

  return {
    astrology: `Phân tích Tử Vi cho:
Tên: ${name}
Ngày sinh: ${birthDate}
Giờ sinh: ${birthTime}
Giới tính: ${gender === "male" ? "Nam" : "Nữ"}
Loại phân tích: ${analysisType}
Ngôn ngữ: ${lang}

Yêu cầu:
1. Xác định cung mệnh và ngũ hành
2. An 12 cung và các chính tinh
3. Luận giải các cung quan trọng
4. Phân tích đại vận

Trả về JSON với cấu trúc astrology schema.`,

    numerology: `Phân tích Thần Số Học cho:
Tên: ${name}
Ngày sinh: ${birthDate}
Giới tính: ${gender === "male" ? "Nam" : "Nữ"}
Ngôn ngữ: ${lang}

Yêu cầu:
1. Tính chỉ số đường đời (Life Path)
2. Tính chỉ số sứ mệnh (Mission)
3. Tính chỉ số linh hồn (Soul)
4. Tính chỉ số ngày sinh (Day Number)
5. Phân tích các chu kỳ cuộc đời
6. Luận giải chi tiết

Trả về JSON với cấu trúc numerology schema.`,

    iChing: `Gieo quẻ Kinh Dịch cho:
Tên: ${name}
Ngày sinh: ${birthDate}
Giờ sinh: ${birthTime}
Giới tính: ${gender === "male" ? "Nam" : "Nữ"}
Câu hỏi/Lĩnh vực: ${analysisType}
Ngôn ngữ: ${lang}

Yêu cầu:
1. Lập bản mệnh (chủ quẻ)
2. Xác định hỗ quẻ
3. Luận giải ý nghĩa
4. Đưa ra lời khuyên

Trả về JSON với cấu trúc iChing schema.`,
  };
}

/**
 * Parse JSON from agent response with error handling
 */
function parseAgentResponse<T>(text: string): T | null {
  try {
    const cleanJson = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();
    return JSON.parse(cleanJson) as T;
  } catch {
    return null;
  }
}

/**
 * Run a single subagent with timeout protection
 */
async function runSubagent<T>(
  role: string,
  systemPrompt: string,
  userPrompt: string,
  model: string,
  timeoutMs: number = 60000
): Promise<SubagentResult<T>> {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    const response = await callOllama(messages, model, controller.signal);
    clearTimeout(timeoutId);

    const text = response.message?.content || "";
    const parsed = parseAgentResponse<T>(text);

    if (!parsed) {
      return {
        success: false,
        error: "Failed to parse JSON response",
        executionTimeMs: Date.now() - startTime,
      };
    }

    return {
      success: true,
      data: parsed,
      executionTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      executionTimeMs: Date.now() - startTime,
    };
  }
}

/**
 * Main orchestrator function - runs all agents in parallel
 */
export async function runMultiAgentAnalysis(
  request: AnalysisRequest
): Promise<SubagentResult<CombinedAnalysisResult>> {
  const startTime = Date.now();
  const prompts = buildAgentPrompts(request);

  // Run all three agents in parallel
  const [astrologyResult, numerologyResult, iChingResult] = await Promise.allSettled([
    runSubagent(
      "astrology",
      AGENT_ROLES.astrology.systemPrompt,
      prompts.astrology,
      AGENT_ROLES.astrology.model!
    ),
    runSubagent(
      "numerology",
      AGENT_ROLES.numerology.systemPrompt,
      prompts.numerology,
      AGENT_ROLES.numerology.model!
    ),
    runSubagent(
      "iChing",
      AGENT_ROLES.iChing.systemPrompt,
      prompts.iChing,
      AGENT_ROLES.iChing.model!
    ),
  ]);

  // Check for failures
  const errors: string[] = [];

  if (astrologyResult.status === "rejected" || !astrologyResult.value.success) {
    errors.push(`Astrology: ${astrologyResult.status === "rejected" ? astrologyResult.reason : astrologyResult.value.error}`);
  }

  if (numerologyResult.status === "rejected" || !numerologyResult.value.success) {
    errors.push(`Numerology: ${numerologyResult.status === "rejected" ? numerologyResult.reason : numerologyResult.value.error}`);
  }

  if (iChingResult.status === "rejected" || !iChingResult.value.success) {
    errors.push(`I Ching: ${iChingResult.status === "rejected" ? iChingResult.reason : iChingResult.value.error}`);
  }

  if (errors.length > 0) {
    return {
      success: false,
      error: errors.join("; "),
      executionTimeMs: Date.now() - startTime,
    };
  }

  // Combine results
  const combined: CombinedAnalysisResult = {
    astrology: (astrologyResult as PromiseFulfilledResult<SubagentResult<any>>).value.data,
    numerology: (numerologyResult as PromiseFulfilledResult<SubagentResult<any>>).value.data,
    iChing: (iChingResult as PromiseFulfilledResult<SubagentResult<any>>).value.data,
  };

  return {
    success: true,
    data: combined,
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * Run a single specialized agent independently
 */
export async function runSingleAgent<T>(
  agentType: "astrology" | "numerology" | "iChing",
  request: AnalysisRequest
): Promise<SubagentResult<T>> {
  const role = AGENT_ROLES[agentType];
  const prompts = buildAgentPrompts(request);

  return runSubagent<T>(
    agentType,
    role.systemPrompt,
    prompts[agentType],
    role.model!
  );
}
