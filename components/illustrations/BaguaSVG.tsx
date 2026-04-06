"use client";

import React from "react";

export function BaguaSVG() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Outer Octagon */}
      <circle
        cx="60"
        cy="60"
        r="55"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />

      {/* Yin Yang Circle */}
      <circle cx="60" cy="60" r="25" stroke="url(#gradient)" strokeWidth="1" fill="none" />

      {/* Yin Yang S-Curve */}
      <path
        d="M60 35C60 35 70 45 70 60C70 75 60 85 60 85"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Yin Yang Dots */}
      <circle cx="60" cy="47.5" r="3" fill="#FF2D9B" opacity="0.8" />
      <circle cx="60" cy="72.5" r="3" fill="#8B3DFF" opacity="0.8" />

      {/* Bagua Lines (Trigrams) */}
      {/* Top */}
      <line x1="45" y1="15" x2="55" y2="15" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="65" y1="15" x2="75" y2="15" stroke="url(#gradient)" strokeWidth="2" />

      {/* Top Right */}
      <line x1="85" y1="25" x2="95" y2="25" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="85" y1="30" x2="95" y2="30" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="85" y1="35" x2="90" y2="35" stroke="url(#gradient)" strokeWidth="2" />

      {/* Bottom Right */}
      <line x1="85" y1="85" x2="95" y2="85" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="85" y1="90" x2="90" y2="90" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="90" y1="95" x2="95" y2="95" stroke="url(#gradient)" strokeWidth="2" />

      {/* Bottom */}
      <line x1="45" y1="105" x2="75" y2="105" stroke="url(#gradient)" strokeWidth="2" />

      {/* Bottom Left */}
      <line x1="25" y1="85" x2="35" y2="85" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="25" y1="90" x2="35" y2="90" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="25" y1="95" x2="30" y2="95" stroke="url(#gradient)" strokeWidth="2" />

      {/* Top Left */}
      <line x1="25" y1="25" x2="35" y2="25" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="25" y1="30" x2="30" y2="30" stroke="url(#gradient)" strokeWidth="2" />
      <line x1="30" y1="35" x2="35" y2="35" stroke="url(#gradient)" strokeWidth="2" />

      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="120">
          <stop stopColor="#FF2D9B" />
          <stop offset="1" stopColor="#8B3DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
