"use client";

import React from "react";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="relative w-12 h-6 rounded-full transition-colors duration-200"
      style={{
        background: enabled ? "var(--toggle-on)" : "var(--toggle-off)",
      }}
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
        style={{
          transform: enabled ? "translateX(28px)" : "translateX(4px)",
        }}
      />
    </button>
  );
}
