"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import {
  TabBar,
  TabType,
  UserInfoCard,
  SectionHeader,
  InfoRow,
  KeyStarItem,
  BottomActionBar,
  GradientButton,
} from "@/components/ui";
import { MoonIcon, StarIcon, HexagramDisplay } from "@/components/illustrations";
import { useAppStore, AnalysisResult } from "@/store/useAppStore";
import { getTranslator } from "@/lib/i18n";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "lifetime";

  const {
    userInfo,
    analysisResult,
    isLoading,
    error,
    fetchAnalysis,
    language,
    setTheme,
    theme,
  } = useAppStore();

  const translations = getTranslator(language);
  const [activeTab, setActiveTab] = useState<TabType>("astrology");

  // Fetch analysis on mount if no result
  useEffect(() => {
    if (!analysisResult && userInfo) {
      fetchAnalysis();
    }
  }, []);

  // Apply theme from store
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Loading state
  if (isLoading || !analysisResult) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="var(--border)"
                  strokeWidth="3"
                />
                <path
                  d="M20 2a18 18 0 0 1 18 18"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#FF2D9B" />
                    <stop offset="1" stopColor="#8B3DFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              {translations("result.loading")}
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Error state
  if (error) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-[var(--error-red)] mb-4">{error}</p>
            <GradientButton onClick={() => router.back()}>
              {translations("common.back")}
            </GradientButton>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Get title based on analysis type
  const getTitle = () => {
    const typeMap: Record<string, string> = {
      lifetime: "result.overviewTitle",
      today: "result.dailyTitle",
      love: "result.loveTitle",
      career: "result.careerTitle",
      health: "result.healthTitle",
      finance: "result.financeTitle",
      family: "result.familyTitle",
      other: "result.otherTitle",
    };
    return translations(typeMap[type] || "result.overviewTitle");
  };

  // Navigate to edit
  const handleEdit = () => {
    router.push("/onboarding");
  };

  // Save results (placeholder)
  const handleSave = () => {
    alert("Save functionality coming soon");
  };

  // Share results (placeholder)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Lunar Mystic Results",
        text: "Check out my destiny analysis!",
      });
    } else {
      alert("Share functionality coming soon");
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto pb-24">
        <Header showSettings={true} title={getTitle()} />

        {/* Tab Bar */}
        <div className="sticky top-0 bg-[var(--bg)] z-10 safe-area-top">
          <TabBar
            activeTab={activeTab}
            onChange={setActiveTab}
            astrologyLabel={translations("result.astrology")}
            numerologyLabel={translations("result.numerology")}
            ichingLabel={translations("result.iching")}
          />
        </div>

        {/* User Info Card */}
        <div className="px-4 mt-4">
          <UserInfoCard
            name={userInfo?.name || ""}
            lunarDate={analysisResult.userInfo.lunarDate}
            birthHour={analysisResult.userInfo.birthHour}
            onEdit={handleEdit}
            editLabel={translations("result.edit")}
          />
        </div>

        {/* Tab Content */}
        <div className="px-4 mt-6">
          {activeTab === "astrology" && (
            <AstrologyTab content={analysisResult.astrology} translations={translations} />
          )}
          {activeTab === "numerology" && (
            <NumerologyTab content={analysisResult.numerology} translations={translations} />
          )}
          {activeTab === "iching" && (
            <IChingTab content={analysisResult.iChing} translations={translations} />
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <BottomActionBar
        onSave={handleSave}
        onShare={handleShare}
        saveLabel={translations("result.save")}
        shareLabel={translations("result.share")}
      />
    </PageWrapper>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="var(--border)" strokeWidth="3" />
              <path d="M20 2a18 18 0 0 1 18 18" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#FF2D9B" />
                  <stop offset="1" stopColor="#8B3DFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </PageWrapper>
    }>
      <ResultContent />
    </Suspense>
  );
}

// Astrology Tab Content
function AstrologyTab({
  content,
  translations,
}: {
  content: AnalysisResult["astrology"];
  translations: (key: string) => string;
}) {
  const hasSpecific = !!content.specificAnalysis;

  return (
    <div className="space-y-6">
      {/* Life Palace Section */}
      <section>
        <SectionHeader
          title={translations("result.lifePalace")}
          icon={<MoonIcon size={20} />}
        />
        <div className="space-y-3">
          {content.lifePalaceElements.map((element, idx) => (
            <InfoRow
              key={idx}
              icon={<MoonIcon size={32} />}
              label={element.label}
              value={element.value}
              description={element.description}
            />
          ))}
        </div>
      </section>

      {/* Key Stars Section */}
      <section>
        <SectionHeader
          title={translations("result.keyStars")}
          icon={<StarIcon size={20} />}
        />
        <div className="space-y-1">
          {content.keyStars.map((star, idx) => (
            <KeyStarItem key={idx} name={star.name} description={star.description} />
          ))}
        </div>
      </section>

      {/* Specific Analysis (if applicable) */}
      {hasSpecific && content.specificAnalysis && (
        <section className="space-y-4">
          <SectionHeader
            title={translations("palaces.love")}
            icon={<MoonIcon size={20} />}
          />
          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--bg-card)" }}
          >
            <div className="space-y-3">
              <div>
                <div className="text-xs uppercase" style={{ color: "var(--text-label)" }}>
                  Love Palace
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {content.specificAnalysis.lovePalace}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase" style={{ color: "var(--text-label)" }}>
                  Compatible Signs
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {content.specificAnalysis.compatibleSigns}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase" style={{ color: "var(--text-label)" }}>
                  Incompatible Signs
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {content.specificAnalysis.incompatibleSigns}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase" style={{ color: "var(--text-label)" }}>
                  Advice
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {content.specificAnalysis.advice}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Numerology Tab Content
function NumerologyTab({
  content,
  translations,
}: {
  content: AnalysisResult["numerology"];
  translations: (key: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Main Number */}
      <div className="text-center py-6">
        <div
          className="text-6xl font-display font-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {content.mainNumber}
        </div>
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {content.calculationSteps.join(" → ")}
        </div>
        <div className="mt-4 text-base" style={{ color: "var(--text-primary)" }}>
          {content.meaning}
        </div>
      </div>

      {/* Sub Numbers Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="p-4 rounded-lg text-center"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="text-xs" style={{ color: "var(--text-label)" }}>
            {translations("numerology.dayNumber")}
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
            {content.subNumbers.dayNumber}
          </div>
        </div>
        <div
          className="p-4 rounded-lg text-center"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="text-xs" style={{ color: "var(--text-label)" }}>
            {translations("numerology.lifePath")}
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
            {content.subNumbers.lifePath}
          </div>
        </div>
        <div
          className="p-4 rounded-lg text-center"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="text-xs" style={{ color: "var(--text-label)" }}>
            {translations("numerology.mission")}
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
            {content.subNumbers.mission}
          </div>
        </div>
        <div
          className="p-4 rounded-lg text-center"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="text-xs" style={{ color: "var(--text-label)" }}>
            {translations("numerology.soulNumber")}
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
            {content.subNumbers.soulNumber}
          </div>
        </div>
      </div>

      {/* Life Cycles */}
      <section>
        <h3
          className="text-base font-bold mb-3"
          style={{ color: "var(--text-label)" }}
        >
          {translations("numerology.lifeCycles")}
        </h3>
        <div className="space-y-3">
          {content.lifeCycles.map((cycle, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {cycle.phase}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {cycle.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// I Ching Tab Content
function IChingTab({
  content,
  translations,
}: {
  content: AnalysisResult["iChing"];
  translations: (key: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Main Hexagram */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-base font-bold"
            style={{ color: "var(--text-label)" }}
          >
            Main Hexagram
          </h3>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            #{content.mainHexagram.number}
          </span>
        </div>

        <div
          className="p-6 rounded-lg flex flex-col items-center"
          style={{ background: "var(--bg-card)" }}
        >
          <HexagramDisplay lines={content.mainHexagram.lines} size="large" />
          <div className="mt-4 text-center">
            <div className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {content.mainHexagram.name}
            </div>
            <div
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {content.mainHexagram.meaning}
            </div>
          </div>
        </div>

        {content.mainHexagram.advice && (
          <div className="mt-4">
            <h4
              className="text-sm font-bold mb-2"
              style={{ color: "var(--text-label)" }}
            >
              Advice
            </h4>
            <ul className="space-y-2">
              {content.mainHexagram.advice.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent-pink)" }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Support Hexagram */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-base font-bold"
            style={{ color: "var(--text-label)" }}
          >
            Support Hexagram
          </h3>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            #{content.supportHexagram.number}
          </span>
        </div>

        <div
          className="p-4 rounded-lg flex flex-col items-center"
          style={{ background: "var(--bg-card)" }}
        >
          <HexagramDisplay lines={content.supportHexagram.lines} size="medium" />
          <div className="mt-4 text-center">
            <div className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              {content.supportHexagram.name}
            </div>
            <div
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {content.supportHexagram.meaning}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      {content.detailedAnalysis && (
        <section>
          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--bg-card)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {content.detailedAnalysis}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
