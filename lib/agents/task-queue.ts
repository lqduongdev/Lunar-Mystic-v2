/**
 * Dynamic Task Queue for Subagent Orchestration
 *
 * Allows dynamic creation and execution of subagent tasks
 * with support for parallel, sequential, and prioritized execution.
 */

import { callOllama, OllamaMessage } from "@/lib/ollama";

export type TaskStatus = "pending" | "running" | "completed" | "failed";

export type TaskPriority = "low" | "normal" | "high" | "critical";

export interface AgentTask<T = unknown> {
  id: string;
  name: string;
  description?: string;
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  priority: TaskPriority;
  status: TaskStatus;
  result?: T;
  error?: string;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  timeoutMs?: number;
  retries?: number;
  maxRetries?: number;
}

export interface TaskQueueOptions {
  maxConcurrent?: number;
  defaultTimeoutMs?: number;
  defaultModel?: string;
}

export interface TaskResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  taskId: string;
  executionTimeMs: number;
}

/**
 * Priority ordering for task execution
 */
const PRIORITY_ORDER: Record<TaskPriority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
};

/**
 * Task Queue for managing subagent execution
 */
export class SubagentTaskQueue {
  private tasks: Map<string, AgentTask> = new Map();
  private runningTasks: Set<string> = new Set();
  private maxConcurrent: number;
  private defaultTimeoutMs: number;
  private defaultModel: string;
  private processing: boolean = false;

  constructor(options: TaskQueueOptions = {}) {
    this.maxConcurrent = options.maxConcurrent ?? 5;
    this.defaultTimeoutMs = options.defaultTimeoutMs ?? 60000;
    this.defaultModel = options.defaultModel ?? "qwen3.5:cloud";
  }

  /**
   * Add a new task to the queue
   */
  addTask<T = unknown>(task: Omit<AgentTask<T>, "id" | "status" | "createdAt"> & { id?: string }): string {
    const id = task.id || `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const newTask: AgentTask<T> = {
      ...task,
      id,
      status: "pending",
      createdAt: Date.now(),
      retries: 0,
      maxRetries: task.maxRetries ?? 1,
    };

    this.tasks.set(id, newTask);
    this.processQueue();
    return id;
  }

  /**
   * Add multiple tasks at once
   */
  addTasks<T = unknown>(tasks: Array<Omit<AgentTask<T>, "id" | "status" | "createdAt">>): string[] {
    return tasks.map((task) => this.addTask(task));
  }

  /**
   * Get task status
   */
  getTaskStatus(taskId: string): { status: TaskStatus; result?: unknown; error?: string } | null {
    const task = this.tasks.get(taskId);
    if (!task) return null;

    return {
      status: task.status,
      result: task.result,
      error: task.error,
    };
  }

  /**
   * Get all pending tasks sorted by priority
   */
  private getPendingTasks(): AgentTask[] {
    return Array.from(this.tasks.values())
      .filter((task) => task.status === "pending")
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }

  /**
   * Process the task queue
   */
  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    try {
      while (this.runningTasks.size < this.maxConcurrent) {
        const pending = this.getPendingTasks();
        if (pending.length === 0) break;

        const task = pending[0];
        this.runTask(task);
      }
    } finally {
      this.processing = false;
    }
  }

  /**
   * Run a single task
   */
  private async runTask(task: AgentTask): Promise<void> {
    if (this.runningTasks.has(task.id)) return;

    this.runningTasks.add(task.id);
    task.status = "running";
    task.startedAt = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        task.timeoutMs ?? this.defaultTimeoutMs
      );

      const messages: OllamaMessage[] = [
        { role: "system", content: task.systemPrompt },
        { role: "user", content: task.userPrompt },
      ];

      const response = await callOllama(
        messages,
        task.model || this.defaultModel,
        controller.signal
      );

      clearTimeout(timeoutId);

      // Parse JSON response
      const text = response.message?.content || "";
      const cleanJson = text
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      try {
        task.result = JSON.parse(cleanJson);
        task.status = "completed";
      } catch (parseError) {
        throw new Error(`JSON parse failed: ${parseError instanceof Error ? parseError.message : "Unknown error"}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      // Retry logic
      if ((task.retries ?? 0) < (task.maxRetries ?? 1)) {
        task.retries = (task.retries ?? 0) + 1;
        task.status = "pending";
        this.processQueue();
        return;
      }

      task.error = errorMessage;
      task.status = "failed";
    } finally {
      task.completedAt = Date.now();
      this.runningTasks.delete(task.id);
      this.processQueue();
    }
  }

  /**
   * Wait for all tasks to complete
   */
  async waitForAll(timeoutMs?: number): Promise<Map<string, TaskResult<unknown>>> {
    const startTime = Date.now();
    const maxTime = timeoutMs ?? 300000; // 5 min default

    while (true) {
      const allDone = Array.from(this.tasks.values()).every(
        (task) => task.status === "completed" || task.status === "failed"
      );

      if (allDone) break;
      if (Date.now() - startTime > maxTime) {
        throw new Error("Timeout waiting for tasks");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const results = new Map<string, TaskResult<unknown>>();
    for (const [id, task] of this.tasks.entries()) {
      results.set(id, {
        success: task.status === "completed",
        data: task.result,
        error: task.error,
        taskId: id,
        executionTimeMs: (task.completedAt ?? Date.now()) - (task.startedAt ?? task.createdAt),
      });
    }

    return results;
  }

  /**
   * Wait for specific tasks
   */
  async waitForTasks(taskIds: string[], timeoutMs?: number): Promise<Map<string, TaskResult<unknown>>> {
    const startTime = Date.now();
    const maxTime = timeoutMs ?? 60000;

    while (true) {
      const allDone = taskIds.every((id) => {
        const task = this.tasks.get(id);
        return task && (task.status === "completed" || task.status === "failed");
      });

      if (allDone) break;
      if (Date.now() - startTime > maxTime) {
        throw new Error("Timeout waiting for tasks");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const results = new Map<string, TaskResult<unknown>>();
    for (const id of taskIds) {
      const task = this.tasks.get(id);
      if (task) {
        results.set(id, {
          success: task.status === "completed",
          data: task.result,
          error: task.error,
          taskId: id,
          executionTimeMs: (task.completedAt ?? Date.now()) - (task.startedAt ?? task.createdAt),
        });
      }
    }

    return results;
  }

  /**
   * Clear completed tasks from queue
   */
  clearCompleted(): void {
    for (const [id, task] of this.tasks.entries()) {
      if (task.status === "completed" || task.status === "failed") {
        this.tasks.delete(id);
      }
    }
  }

  /**
   * Get queue statistics
   */
  getStats(): {
    total: number;
    pending: number;
    running: number;
    completed: number;
    failed: number;
  } {
    const tasks = Array.from(this.tasks.values());
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      running: tasks.filter((t) => t.status === "running").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      failed: tasks.filter((t) => t.status === "failed").length,
    };
  }
}

/**
 * Singleton queue instance for global use
 */
let globalTaskQueue: SubagentTaskQueue | null = null;

export function getGlobalTaskQueue(): SubagentTaskQueue {
  if (!globalTaskQueue) {
    globalTaskQueue = new SubagentTaskQueue();
  }
  return globalTaskQueue;
}
