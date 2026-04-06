"use client";

import React from "react";

export function DailyForecastSVG() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Eclipse Circle */}
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />

      {/* Overlapping Circle (Eclipse Effect) */}
      <circle
        cx="70"
        cy="60"
        r="35"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeDasharray="4 4"
      />

      {/* Inner Glow */}
      <circle cx="60" cy="60" r="20" fill="url(#gradient)" opacity="0.1" />

      {/* Rays */}
      <line x1="60" y1="15" x2="60" y2="25" stroke="url(#gradient)" strokeWidth="1.5" />
      <line x1="60" y1="95" x2="60" y2="105" stroke="url(#gradient)" strokeWidth="1.5" />
      <line x1="15" y1="60" x2="25" y2="60" stroke="url(#gradient)" strokeWidth="1.5" />
      <line x1="95" y1="60" x2="105" y2="60" stroke="url(#gradient)" strokeWidth="1.5" />

      {/* Small Stars */}
      <circle cx="35" cy="35" r="1.5" fill="#FF2D9B" />
      <circle cx="85" cy="30" r="1" fill="#8B3DFF" />
      <circle cx="80" cy="85" r="1.5" fill="#CC44FF" />
      <circle cx="30" cy="80" r="1" fill="#FF2D9B" />

      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="120">
          <stop stopColor="#FF2D9B" />
          <stop offset="1" stopColor="#8B3DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
