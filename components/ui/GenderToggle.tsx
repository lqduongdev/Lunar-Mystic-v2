"use client";

import React from "react";

interface GenderToggleProps {
  value: "male" | "female" | null;
  onChange: (value: "male" | "female") => void;
  maleLabel: string;
  femaleLabel: string;
}

export function GenderToggle({
  value,
  onChange,
  maleLabel,
  femaleLabel,
}: GenderToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("male")}
        className={`
          flex-1 h-[40px] rounded-full text-sm font-medium
          transition-all duration-200
          ${
            value === "male"
              ? "text-white"
              : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)]"
          }
        `}
        style={
          value === "male"
            ? {
                background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
              }
            : {
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }
        }
      >
        {maleLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("female")}
        className={`
          flex-1 h-[40px] rounded-full text-sm font-medium
          transition-all duration-200
          ${
            value === "female"
              ? "text-white"
              : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)]"
          }
        `}
        style={
          value === "female"
            ? {
                background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
              }
            : {
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }
        }
      >
        {femaleLabel}
      </button>
    </div>
  );
}
