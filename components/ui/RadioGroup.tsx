"use client";

import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex gap-6">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onChange(option.value)}
        >
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: value === option.value ? "var(--accent-pink)" : "var(--border)",
            }}
          >
            {value === option.value && (
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--accent-pink)" }}
              />
            )}
          </div>
          <span
            className="text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
