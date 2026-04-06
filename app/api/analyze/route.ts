import { NextRequest, NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { getSystemPrompt, buildUserPrompt } from "@/lib/prompts";
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

    // Build messages for Ollama
    const systemPrompt = getSystemPrompt(language || "vi");
    const userPrompt = buildUserPrompt({
      name,
      birthDate,
      birthTime,
      gender,
      analysisType,
      language: language || "vi",
    });

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    // Call Ollama API
    const response = await callOllama(messages);

    // Extract text from response
    const text = response.message?.content || "";

    // Clean and parse JSON
    const cleanJson = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleanJson);
      const validated = validateAnalysisResponse(parsed);
      return NextResponse.json(validated);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response:", text);

      // Retry once with a simpler prompt
      const retryMessages = [
        { role: "system", content: "Return ONLY valid JSON. No other text." },
        { role: "user", content: `Parse this into JSON: ${text.substring(0, 2000)}` },
      ];

      const retryResponse = await callOllama(retryMessages);
      const retryText = retryResponse.message?.content || "";
      const retryClean = retryText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      try {
        const parsed = JSON.parse(retryClean);
        const validated = validateAnalysisResponse(parsed);
        return NextResponse.json(validated);
      } catch {
        return NextResponse.json(
          { error: "Failed to parse analysis result", raw: text },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
