"use client";

import React from "react";

interface InfoRowProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  description?: string;
}

export function InfoRow({ icon, label, value, description }: InfoRowProps) {
  return (
    <div className="info-row">
      {icon && <div className="icon">{icon}</div>}
      <div className="content">
        <div className="label">{label}</div>
        <div className="value">{value}</div>
        {description && (
          <div
            className="description"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
