"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circular" | "rounded" | "card";
}

export function Skeleton({
  className = "",
  width,
  height,
  variant = "rounded",
}: SkeletonProps) {
  const baseStyles = "animate-pulse bg-gradient-to-r from-[#FF2D9B]/20 via-[#8B3DFF]/20 to-[#FF2D9B]/20 bg-[length:200%_100%]";

  const variantStyles = {
    text: "rounded",
    circular: "rounded-full",
    rounded: "rounded-lg",
    card: "rounded-xl",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{
        width,
        height,
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  );
}

/**
 * Pre-built skeleton components for common UI patterns
 */

export function UserInfoCardSkeleton() {
  return (
    <div
      className="rounded-[12px] p-4 mb-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <Skeleton variant="text" width="120px" height="20px" />
        <Skeleton variant="rounded" width="48px" height="24px" />
      </div>
      <Skeleton variant="text" width="200px" height="14px" className="mb-2" />
      <Skeleton variant="text" width="150px" height="14px" />
    </div>
  );
}

export function SectionSkeleton({ title = true }: { title?: boolean }) {
  return (
    <div className="space-y-3 mb-6">
      {title && <Skeleton variant="text" width="180px" height="20px" />}
      <div className="space-y-2">
        <Skeleton variant="rounded" width="100%" height="60px" />
        <Skeleton variant="rounded" width="100%" height="60px" />
        <Skeleton variant="rounded" width="100%" height="60px" />
      </div>
    </div>
  );
}

export function TabContentSkeleton() {
  return (
    <div className="space-y-6">
      <SectionSkeleton />
      <SectionSkeleton title={false} />
    </div>
  );
}

export function FullPageSkeleton() {
  return (
    <div className="min-h-screen p-4 space-y-4">
      <Skeleton variant="text" width="200px" height="32px" className="mx-auto" />
      <Skeleton variant="card" width="100%" height="200px" />
      <Skeleton variant="card" width="100%" height="150px" />
      <Skeleton variant="card" width="100%" height="150px" />
    </div>
  );
}
