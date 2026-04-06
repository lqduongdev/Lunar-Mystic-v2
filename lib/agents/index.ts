/**
 * Agent Module Exports
 */

// Multi-agent orchestrator
export {
  runMultiAgentAnalysis,
  runSingleAgent,
  type SubagentResult,
  type CombinedAnalysisResult,
  type AgentRole,
} from "./orchestrator";

// Dynamic task queue
export {
  SubagentTaskQueue,
  getGlobalTaskQueue,
  type AgentTask,
  type TaskStatus,
  type TaskPriority,
  type TaskQueueOptions,
  type TaskResult,
} from "./task-queue";

// Ollama client
export {
  type AnalysisRequest,
  type OllamaMessage,
  type OllamaResponse,
  callOllama,
} from "@/lib/ollama";

// React hook
export {
  useAnalysis,
  type AnalysisOptions,
  type AnalysisState,
} from "./useAnalysis";
