"use client";

import React from "react";

interface UserInfoCardProps {
  name: string;
  lunarDate: string;
  birthHour: string;
  onEdit?: () => void;
  editLabel: string;
}

export function UserInfoCard({
  name,
  lunarDate,
  birthHour,
  onEdit,
  editLabel,
}: UserInfoCardProps) {
  return (
    <div
      className="rounded-[12px] p-4 mb-4"
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Row 1: Name + Edit */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
          {name}
        </span>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              color: "var(--accent-pink)",
              border: "1px solid var(--accent-pink)",
            }}
          >
            {editLabel}
          </button>
        )}
      </div>

      {/* Row 2: Date + Hour */}
      <div className="flex items-center gap-4 text-xs mb-2">
        <div className="flex items-center gap-1" style={{ color: "var(--text-caption)" }}>
          <span>📅</span>
          <span>{lunarDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-caption)" }}>
        <span>🕐</span>
        <span>{birthHour}</span>
      </div>
    </div>
  );
}
