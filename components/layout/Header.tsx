"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showSettings?: boolean;
  title?: string;
}

export function Header({ showSettings = true, title }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-3 safe-area-top">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </button>

      {/* Optional Title */}
      {title && (
        <h1
          className="font-display text-lg font-semibold absolute left-1/2 -translate-x-1/2"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>
      )}

      {/* Settings Button */}
      {showSettings ? (
        <button
          onClick={() => router.push("/settings")}
          className="w-6 h-6"
          style={{ color: "var(--text-caption)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4 15C19.4 15 20 13.6 20 12C20 10.4 19.4 9 19.4 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.6 9C4.6 9 4 10.4 4 12C4 13.6 4.6 15 4.6 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 19.4C15 19.4 13.6 20 12 20C10.4 20 9 19.4 9 19.4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 4.6C9 4.6 10.4 4 12 4C13.6 4 15 4.6 15 4.6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.243 17.2426L19.021 19.0204"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.979 4.97949L6.757 6.75729"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div className="w-6" />
      )}
    </header>
  );
}
