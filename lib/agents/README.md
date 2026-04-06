# Multi-Agent Orchestration System

A dynamic subagent system for parallel divination calculations using specialized Ollama models.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Astrology   │  │ Numerology   │  │   I Ching    │       │
│  │   Agent      │  │   Agent      │  │   Agent      │       │
│  │ (Tử Vi)      │  │ (Thần Số)    │  │ (Kinh Dịch)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                 │                 │                │
│         └─────────────────┴─────────────────┘                │
│                          │                                   │
│                  Combined Result                             │
└─────────────────────────────────────────────────────────────┘
```

## Features

- **Parallel Execution**: All three agents run simultaneously (~60% faster than sequential)
- **Specialized Prompts**: Each agent has domain-specific system prompts
- **Task Queue**: Dynamic task creation with priority-based scheduling
- **Retry Logic**: Automatic retry on failed requests
- **Timeout Protection**: Prevents hung requests
- **React Hook**: Easy integration with components

## Usage

### Option 1: Multi-Agent API Endpoint

```typescript
// POST /api/analyze-multi
const response = await fetch("/api/analyze-multi", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Nguyễn Văn A",
    birthDate: "10/03/1996",
    birthTime: "Giờ Tuất",
    gender: "male",
    analysisType: "lifetime",
    language: "vi",
  }),
});

const result = await response.json();
// Returns: { astrology, numerology, iChing, _meta }
```

### Option 2: React Hook (Recommended for components)

```tsx
"use client";

import { useAnalysis } from "@/lib/agents";

function AnalysisComponent() {
  const {
    analyze,
    cancel,
    clear,
    isLoading,
    isMultiAgentRunning,
    result,
    error,
    progress,
    executionTimeMs,
  } = useAnalysis();

  const handleAnalyze = async () => {
    const { success, data, error } = await analyze(
      {
        name: "Nguyễn Văn A",
        birthDate: "10/03/1996",
        birthTime: "Giờ Tuất",
        gender: "male",
        analysisType: "lifetime",
      },
      { useMultiAgent: true } // Enable multi-agent
    );

    if (success) {
      console.log("Result:", data);
    } else {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {isMultiAgentRunning && (
        <div>
          <p>Astrology: {progress.astrology}</p>
          <p>Numerology: {progress.numerology}</p>
          <p>I Ching: {progress.iChing}</p>
        </div>
      )}
      <button onClick={handleAnalyze}>Analyze</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
```

### Option 3: Direct Orchestrator (Server-side)

```typescript
import { runMultiAgentAnalysis } from "@/lib/agents/orchestrator";

const result = await runMultiAgentAnalysis({
  name: "Nguyễn Văn A",
  birthDate: "10/03/1996",
  birthTime: "Giờ Tuất",
  gender: "male",
  analysisType: "lifetime",
  language: "vi",
});

if (result.success) {
  console.log("Astrology:", result.data.astrology);
  console.log("Numerology:", result.data.numerology);
  console.log("I Ching:", result.data.iChing);
  console.log(`Execution time: ${result.executionTimeMs}ms`);
}
```

### Option 4: Dynamic Task Queue

```typescript
import { getGlobalTaskQueue } from "@/lib/agents";

const queue = getGlobalTaskQueue();

// Add tasks dynamically
const taskIds = queue.addTasks([
  {
    name: "Astrology Analysis",
    systemPrompt: "You are an astrology expert...",
    userPrompt: "Analyze this birth chart...",
    priority: "high",
  },
  {
    name: "Numerology Analysis",
    systemPrompt: "You are a numerology expert...",
    userPrompt: "Calculate life path number...",
    priority: "high",
  },
]);

// Wait for completion
const results = await queue.waitForTasks(taskIds);

for (const [id, result] of results.entries()) {
  if (result.success) {
    console.log(`${id}:`, result.data);
  } else {
    console.error(`${id} failed:`, result.error);
  }
}
```

## Configuration

### Environment Variables

```bash
# .env.local

# Base Ollama URL
OLLAMA_BASE_URL=https://ollama.zvr.sh

# Default model
OLLAMA_MODEL=qwen3.5:cloud

# Specialized models per agent (optional)
OLLAMA_ASTROLOGY_MODEL=qwen3.5:cloud
OLLAMA_NUMEROLOGY_MODEL=qwen3.5:cloud
OLLAMA_ICHING_MODEL=qwen3.5:cloud
```

### Task Queue Options

```typescript
import { SubagentTaskQueue } from "@/lib/agents";

const queue = new SubagentTaskQueue({
  maxConcurrent: 5,        // Max parallel tasks
  defaultTimeoutMs: 60000, // 60 second timeout
  defaultModel: "qwen3.5:cloud",
});
```

## Agent Roles

| Agent | Specialization | Model |
|-------|---------------|-------|
| Astrology | Tử Vi, cung mệnh, an sao | qwen3.5:cloud |
| Numerology | Thần Số Học, chỉ số | qwen3.5:cloud |
| I Ching | Kinh Dịch, quẻ, hào | qwen3.5:cloud |

## Response Schema

```typescript
interface CombinedAnalysisResult {
  astrology: {
    lifePalaceElements: Array<{ label; value; description }>;
    keyStars: Array<{ name; description }>;
    palaces?: Array<{ id; name; stars; analysis }>;
    majorPeriods?: Array<{ ageRange; description }>;
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
    subNumbers: { dayNumber; lifePath; mission; soulNumber };
    lifeCycles: Array<{ phase; description }>;
    detailedAnalysis: string;
  };
  iChing: {
    mainHexagram: { number; name; lines; meaning; advice? };
    supportHexagram: { number; name; lines; meaning };
    detailedAnalysis: string;
  };
}
```

## Performance

| Mode | Execution Time |
|------|---------------|
| Single Agent (sequential) | ~180s |
| Multi-Agent (parallel) | ~60-90s |
| Speed Improvement | ~60% faster |

## Error Handling

The system includes built-in error handling:

- **Timeout Protection**: Tasks abort after timeout (default 60s)
- **Retry Logic**: Failed tasks retry once automatically
- **Graceful Degradation**: Partial results returned if some agents fail
- **Abort Support**: Cancel ongoing analyses via `cancel()`

## Best Practices

1. **Use multi-agent for full readings** - When you need all three aspects (astrology, numerology, I Ching)
2. **Use single-agent for quick lookups** - When you only need one specific analysis
3. **Set appropriate timeouts** - Longer for complex readings, shorter for simple queries
4. **Monitor progress** - Use the `progress` state from `useAnalysis` hook for UI feedback
5. **Handle errors gracefully** - Always check `success` flag before using results
