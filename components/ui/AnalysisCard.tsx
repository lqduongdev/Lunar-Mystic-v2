"use client";

import React from "react";

interface AnalysisCardProps {
  title: string;
  subtitle?: string;
  illustration: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  filled?: boolean;
}

export function AnalysisCard({
  title,
  subtitle,
  illustration,
  selected = false,
  onClick,
  filled = false,
}: AnalysisCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        card cursor-pointer mb-4
        ${selected ? "selected" : ""}
        ${filled ? "bg-gradient-to-br from-[#FF2D9B] to-[#8B3DFF] text-white" : ""}
      `}
      style={{
        minHeight: "120px",
        background: filled
          ? "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)"
          : "var(--bg-card)",
        border: selected
          ? "1.5px solid var(--accent-pink)"
          : "1.5px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex-1">
          <h3
            className="text-lg font-semibold"
            style={{ color: filled ? "white" : "var(--text-primary)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-sm mt-1"
              style={{ color: filled ? "rgba(255,255,255,0.8)" : "var(--text-secondary)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="w-24 h-24 opacity-60">{illustration}</div>
      </div>
    </div>
  );
}
