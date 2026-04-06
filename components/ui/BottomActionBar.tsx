"use client";

import React from "react";
import { GradientButton } from "./GradientButton";

interface BottomActionBarProps {
  onSave?: () => void;
  onShare?: () => void;
  saveLabel: string;
  shareLabel: string;
}

export function BottomActionBar({
  onSave,
  onShare,
  saveLabel,
  shareLabel,
}: BottomActionBarProps) {
  return (
    <div
      className="sticky bottom-0 left-0 right-0 p-4 flex gap-3 safe-area-bottom"
      style={{
        background: "rgba(13, 10, 26, 0.8)",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        onClick={onSave}
        className="flex-1 btn-gradient"
        style={{
          background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
        }}
      >
        <span className="mr-1">💾</span>
        {saveLabel}
      </button>
      <button
        onClick={onShare}
        className="flex-1 btn-gradient"
        style={{
          background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
        }}
      >
        <span className="mr-1">↗</span>
        {shareLabel}
      </button>
    </div>
  );
}
