"use client";

import React from "react";

export type TabType = "astrology" | "numerology" | "iching";

interface TabBarProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
  astrologyLabel: string;
  numerologyLabel: string;
  ichingLabel: string;
}

export function TabBar({
  activeTab,
  onChange,
  astrologyLabel,
  numerologyLabel,
  ichingLabel,
}: TabBarProps) {
  return (
    <div
      className="flex border-b"
      style={{
        borderBottomColor: "var(--border)",
      }}
    >
      <button
        onClick={() => onChange("astrology")}
        className={`tab flex-1 py-3 text-center ${activeTab === "astrology" ? "active" : ""}`}
        style={{
          color: activeTab === "astrology" ? "var(--accent-pink)" : "var(--text-caption)",
          borderBottomColor: activeTab === "astrology" ? "var(--accent-pink)" : "transparent",
        }}
      >
        <span className="mr-1">☸</span>
        {astrologyLabel}
      </button>
      <button
        onClick={() => onChange("numerology")}
        className={`tab flex-1 py-3 text-center ${activeTab === "numerology" ? "active" : ""}`}
        style={{
          color: activeTab === "numerology" ? "var(--accent-pink)" : "var(--text-caption)",
          borderBottomColor: activeTab === "numerology" ? "var(--accent-pink)" : "transparent",
        }}
      >
        <span className="mr-1">✦</span>
        {numerologyLabel}
      </button>
      <button
        onClick={() => onChange("iching")}
        className={`tab flex-1 py-3 text-center ${activeTab === "iching" ? "active" : ""}`}
        style={{
          color: activeTab === "iching" ? "var(--accent-pink)" : "var(--text-caption)",
          borderBottomColor: activeTab === "iching" ? "var(--accent-pink)" : "transparent",
        }}
      >
        <span className="mr-1">☯</span>
        {ichingLabel}
      </button>
    </div>
  );
}
