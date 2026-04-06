/**
 * React Hook for Multi-Agent Analysis
 *
 * Provides easy integration with the subagent orchestration system
 */

"use client";

import { useState, useCallback, useRef } from "react";

export interface AnalysisOptions {
  useMultiAgent?: boolean;
  timeoutMs?: number;
}

export interface AnalysisState {
  isLoading: boolean;
  isMultiAgentRunning: boolean;
  error: string | null;
  result: unknown | null;
  progress: {
    astrology?: "pending" | "running" | "completed" | "failed";
    numerology?: "pending" | "running" | "completed" | "failed";
    iChing?: "pending" | "running" | "completed" | "failed";
  };
  executionTimeMs?: number;
}

const initialState: AnalysisState = {
  isLoading: false,
  isMultiAgentRunning: false,
  error: null,
  result: null,
  progress: {},
};

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Run analysis using the standard single-endpoint approach
   */
  const analyze = useCallback(async (
    payload: {
      name: string;
      birthDate: string;
      birthTime: string;
      gender: string;
      analysisType: string;
      language?: string;
    },
    options?: AnalysisOptions
  ) => {
    const useMultiAgent = options?.useMultiAgent ?? false;
    const endpoint = useMultiAgent ? "/api/analyze-multi" : "/api/analyze";

    setState((prev) => ({
      ...initialState,
      isLoading: true,
      isMultiAgentRunning: useMultiAgent,
      progress: useMultiAgent
        ? {
            astrology: "pending",
            numerology: "pending",
            iChing: "pending",
          }
        : {},
    }));

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        result: data,
        executionTimeMs: data._meta?.executionTimeMs,
        progress: useMultiAgent
          ? {
              astrology: "completed",
              numerology: "completed",
              iChing: "completed",
            }
          : {},
      }));

      return { success: true, data };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return { success: false, error: "Analysis cancelled" };
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Analysis failed",
      }));

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
  []);

  /**
   * Cancel ongoing analysis
   */
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isMultiAgentRunning: false,
      error: "Analysis cancelled",
    }));
  }, []);

  /**
   * Clear results and reset state
   */
  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    analyze,
    cancel,
    clear,
  };
}
