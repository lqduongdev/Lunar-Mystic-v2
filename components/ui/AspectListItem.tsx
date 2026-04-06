"use client";

import React from "react";

interface AspectListItemProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function AspectListItem({
  icon,
  label,
  selected = false,
  onClick,
}: AspectListItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 h-16 px-4 rounded-full cursor-pointer mb-3 transition-all duration-200"
      style={{
        background: selected
          ? "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)"
          : "transparent",
        border: selected ? "none" : "1px solid var(--border)",
      }}
    >
      {/* Icon Circle */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: selected
            ? "rgba(255, 255, 255, 0.2)"
            : "var(--bg-icon)",
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className="flex-1 text-base font-medium"
        style={{
          color: selected ? "white" : "var(--text-primary)",
        }}
      >
        {label}
      </span>

      {/* Chevron */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{
          color: selected ? "white" : "var(--text-caption)",
        }}
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
