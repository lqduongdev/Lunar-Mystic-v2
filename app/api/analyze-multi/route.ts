/**
 * Multi-Agent Analysis API Endpoint
 *
 * Runs astrology, numerology, and I Ching agents in parallel
 * for faster, more specialized divination results.
 */

import { NextRequest, NextResponse } from "next/server";
import { runMultiAgentAnalysis } from "@/lib/agents/orchestrator";
import { validateAnalysisResponse } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, birthDate, birthTime, gender, analysisType, language } = body;

    // Validation
    if (!name || !birthDate || !birthTime || !gender || !analysisType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Run multi-agent analysis
    const result = await runMultiAgentAnalysis({
      name,
      birthDate,
      birthTime,
      gender,
      analysisType,
      language: language || "vi",
    });

    if (!result.success) {
      console.error("Multi-agent analysis failed:", result.error);
      return NextResponse.json(
        { error: result.error || "Analysis failed" },
        { status: 500 }
      );
    }

    // Validate and return
    const validated = validateAnalysisResponse(result.data);

    return NextResponse.json({
      ...validated,
      _meta: {
        executionTimeMs: result.executionTimeMs,
        agentsUsed: ["astrology", "numerology", "iChing"],
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
