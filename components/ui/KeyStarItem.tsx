"use client";

import React from "react";

interface KeyStarItemProps {
  name: string;
  description: string;
}

export function KeyStarItem({ name, description }: KeyStarItemProps) {
  return (
    <div className="flex items-start gap-2 py-2">
      <span className="text-sm" style={{ color: "var(--star-icon)" }}>
        ✦
      </span>
      <div className="flex-1">
        <div
          className="text-xs font-bold uppercase tracking-wide"
          style={{ color: "var(--text-label)" }}
        >
          {name}
        </div>
        <div
          className="text-sm mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
