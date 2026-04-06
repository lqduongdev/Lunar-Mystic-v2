"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { RadioGroup, Toggle, GradientButton } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";
import { getTranslator } from "@/lib/i18n";

export default function SettingsPage() {
  const router = useRouter();
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useAppStore();

  const translations = getTranslator(language);

  const themeOptions = [
    { value: "light", label: translations("settings.light") },
    { value: "dark", label: translations("settings.dark") },
    { value: "system", label: translations("settings.system") },
  ];

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-4 pb-8">
        <Header showSettings={false} title={translations("settings.title")} />

        <div className="mt-8 space-y-8">
          {/* Language Section */}
          <section>
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {translations("settings.language")}
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
              className="w-full pill-input"
              style={{
                height: "52px",
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </section>

          {/* Theme Section */}
          <section>
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {translations("settings.theme")}
            </h2>
            <RadioGroup
              options={themeOptions}
              value={theme}
              onChange={(value) => setTheme(value as "dark" | "light" | "system")}
            />
          </section>

          {/* Notifications Section */}
          <section>
            <div className="flex items-center justify-between">
              <h2
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {translations("settings.notifications")}
              </h2>
              <div className="flex items-center gap-3">
                {notificationsEnabled && (
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-label)" }}
                  >
                    {translations("settings.on")}
                  </span>
                )}
                <Toggle
                  enabled={notificationsEnabled}
                  onChange={setNotificationsEnabled}
                />
              </div>
            </div>
          </section>

          {/* Links Section */}
          <section className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <a
              href="#"
              className="block text-sm"
              style={{ color: "var(--accent-pink)" }}
            >
              {translations("settings.help")}
            </a>
            <a
              href="#"
              className="block text-sm"
              style={{ color: "var(--accent-pink)" }}
            >
              {translations("settings.privacy")}
            </a>
          </section>

          {/* Version Info */}
          <div className="pt-8 text-center">
            <p className="text-xs" style={{ color: "var(--text-caption)" }}>
              Lunar Mystic v1.0.0
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-caption)" }}>
              玄月占卜
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
