"use client";

import React, { InputHTMLAttributes } from "react";

interface PillInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PillInput = React.forwardRef<HTMLInputElement, PillInputProps>(
  function PillInput({ label, error, className = "", ...props }, ref) {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-bold text-[var(--text-label)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            pill-input
            ${className}
          `}
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          {...props}
        />
        {error && (
          <span className="text-xs text-[var(--error-red)]">{error}</span>
        )}
      </div>
    );
  }
);
