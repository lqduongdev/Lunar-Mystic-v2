"use client";

import React from "react";

interface HexagramDisplayProps {
  lines: number[]; // 1 = solid (yang), 0 = broken (yin)
  size?: "small" | "medium" | "large";
}

export function HexagramDisplay({ lines, size = "medium" }: HexagramDisplayProps) {
  const heights = {
    small: 8,
    medium: 12,
    large: 16,
  };

  const width = size === "small" ? 80 : size === "medium" ? 120 : 160;
  const gap = size === "small" ? 4 : size === "medium" ? 6 : 8;

  return (
    <div
      className="flex flex-col items-center gap-1"
      style={{ gap: `${gap}px` }}
    >
      {lines.slice().reverse().map((line, index) => (
        <div
          key={index}
          className="relative"
          style={{
            width: `${width}px`,
            height: `${heights[size]}px`,
          }}
        >
          {line === 1 ? (
            // Solid line (yang)
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #FF2D9B 0%, #8B3DFF 100%)",
              }}
            />
          ) : (
            // Broken line (yin)
            <>
              <div
                className="absolute left-0 h-full rounded-full"
                style={{
                  width: `${width * 0.4}px`,
                  background: "linear-gradient(90deg, #FF2D9B 0%, #8B3DFF 100%)",
                }}
              />
              <div
                className="absolute right-0 h-full rounded-full"
                style={{
                  width: `${width * 0.4}px`,
                  background: "linear-gradient(90deg, #FF2D9B 0%, #8B3DFF 100%)",
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
