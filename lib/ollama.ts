const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "https://ollama.zvr.sh";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen3.5:cloud";

export interface AnalysisRequest {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: "male" | "female";
  analysisType: string;
  language: "vi" | "en";
}

export interface OllamaMessage {
  role: string;
  content: string;
}

export interface OllamaResponse {
  model: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

export async function callOllama(
  messages: OllamaMessage[],
  model?: string,
  signal?: AbortSignal
): Promise<OllamaResponse> {
  if (!OLLAMA_BASE_URL) {
    throw new Error("OLLAMA_BASE_URL not configured");
  }

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({
      model: model || OLLAMA_MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}
