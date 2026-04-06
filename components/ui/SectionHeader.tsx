"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h3
        className="text-base font-bold"
        style={{ color: "var(--text-label)" }}
      >
        {title}
      </h3>
      {icon && <div className="w-5 h-5">{icon}</div>}
    </div>
  );
}
