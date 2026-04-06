"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { AspectListItem } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";
import { getTranslator } from "@/lib/i18n";

// Icon components for each aspect
const LoveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CareerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
    <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HealthIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FinanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6v12M15 9h-3a3 3 0 0 0 0 6h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FamilyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OthersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function AspectsPage() {
  const router = useRouter();
  const { setAnalysisType, language } = useAppStore();
  const translations = getTranslator(language);

  const aspects = [
    { id: "love", label: translations("home.love"), icon: <LoveIcon /> },
    { id: "career", label: translations("home.career"), icon: <CareerIcon /> },
    { id: "health", label: translations("home.health"), icon: <HealthIcon /> },
    { id: "finance", label: translations("home.finance"), icon: <FinanceIcon /> },
    { id: "family", label: translations("home.family"), icon: <FamilyIcon /> },
    { id: "other", label: translations("home.others"), icon: <OthersIcon /> },
  ];

  const handleAspectClick = (aspectId: string) => {
    setAnalysisType(aspectId);
    router.push(`/result?type=${aspectId}`);
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-4 pb-8">
        <Header showSettings={true} />

        {/* Title */}
        <div className="mt-4 mb-6">
          <h1
            className="font-display text-xl md:text-2xl font-bold text-center"
            style={{ color: "var(--text-primary)" }}
          >
            {translations("home.title")}
          </h1>
        </div>

        {/* Aspect List */}
        <div className="mt-4">
          {aspects.map((aspect) => (
            <AspectListItem
              key={aspect.id}
              icon={aspect.icon}
              label={aspect.label}
              onClick={() => handleAspectClick(aspect.id)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
