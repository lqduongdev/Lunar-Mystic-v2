"use client";

import React from "react";

export function WholeLifeSVG() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Outer Circle */}
      <circle
        cx="60"
        cy="60"
        r="55"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />

      {/* Meditating Figure */}
      <circle cx="60" cy="35" r="12" stroke="url(#gradient)" strokeWidth="1.5" fill="none" />
      <path
        d="M60 47V70"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 55L45 65"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 55L75 65"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M45 85C45 85 52 80 60 80C68 80 75 85 75 85"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Decorative Stars */}
      <circle cx="30" cy="40" r="2" fill="#FF2D9B" opacity="0.6" />
      <circle cx="90" cy="35" r="1.5" fill="#8B3DFF" opacity="0.6" />
      <circle cx="25" cy="70" r="1" fill="#CC44FF" opacity="0.6" />
      <circle cx="95" cy="75" r="2" fill="#FF2D9B" opacity="0.6" />

      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="120">
          <stop stopColor="#FF2D9B" />
          <stop offset="1" stopColor="#8B3DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
