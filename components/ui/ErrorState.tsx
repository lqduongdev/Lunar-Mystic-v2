"use client";

import React from "react";
import { GradientButton } from "./GradientButton";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  retryLabel?: string;
  backLabel?: string;
}

export function ErrorState({
  message = "An error occurred",
  onRetry,
  onBack,
  retryLabel = "Retry",
  backLabel = "Go Back",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      {/* Error Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(255, 68, 68, 0.2) 0%, rgba(255, 45, 155, 0.2) 100%)",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "var(--error-red)" }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 8v4m0 4h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h2
        className="text-xl font-bold mb-2 font-display"
        style={{ color: "var(--text-primary)" }}
      >
        Oops!
      </h2>
      <p
        className="text-sm mb-8 max-w-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        {message}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full max-w-xs">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 h-[48px] rounded-full text-sm font-medium"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          >
            {backLabel}
          </button>
        )}
        {onRetry && (
          <GradientButton onClick={onRetry} fullWidth={!onBack}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="inline mr-2"
            >
              <path
                d="M23 4v6h-6M1 20v-6h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {retryLabel}
          </GradientButton>
        )}
      </div>
    </div>
  );
}

/**
 * Loading error state with more mystical styling
 */
export function MysticalErrorState({
  message = "The stars are silent...",
  subtitle = "Please try again when the cosmos aligns",
  onRetry,
}: {
  message?: string;
  subtitle?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      {/* Mystical Error Icon */}
      <div className="relative mb-6">
        <div
          className="w-24 h-24 rounded-full animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(139, 61, 255, 0.3) 0%, transparent 70%)",
          }}
        />
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ color: "var(--moon-icon)" }}
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 10h.01M15 10h.01M9 14h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h2
        className="text-2xl font-bold mb-2 font-display"
        style={{
          background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {message}
      </h2>
      <p
        className="text-sm mb-8 max-w-xs"
        style={{ color: "var(--text-caption)" }}
      >
        {subtitle}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <GradientButton onClick={onRetry}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="inline mr-2"
          >
            <path
              d="M23 4v6h-6M1 20v-6h6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Try Again
        </GradientButton>
      )}
    </div>
  );
}
