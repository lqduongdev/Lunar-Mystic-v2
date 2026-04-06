"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { AnalysisCard } from "@/components/ui";
import { WholeLifeSVG, DailyForecastSVG, BaguaSVG } from "@/components/illustrations";
import { useAppStore } from "@/store/useAppStore";
import { getTranslator } from "@/lib/i18n";

export default function HomePage() {
  const router = useRouter();
  const { setAnalysisType, language } = useAppStore();
  const translations = getTranslator(language);

  const handleCardClick = (type: string) => {
    setAnalysisType(type);
    if (type === "specific") {
      router.push("/aspects");
    } else {
      router.push(`/result?type=${type}`);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-4 pb-8">
        <Header showSettings={true} />

        {/* Title */}
        <div className="mt-4 mb-6">
          <h1
            className="font-display text-2xl md:text-3xl font-bold text-center leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {translations("home.title")}
          </h1>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {/* Whole Life Overview */}
          <AnalysisCard
            title={translations("home.wholeLife")}
            subtitle={translations("home.overview")}
            illustration={<WholeLifeSVG />}
            onClick={() => handleCardClick("lifetime")}
          />

          {/* Daily Forecast */}
          <AnalysisCard
            title={translations("home.daily")}
            illustration={<DailyForecastSVG />}
            onClick={() => handleCardClick("today")}
          />

          {/* Specific Aspect Analysis */}
          <AnalysisCard
            title={translations("home.specific")}
            illustration={<BaguaSVG />}
            onClick={() => handleCardClick("specific")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
