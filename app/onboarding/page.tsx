"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { PillInput, GenderToggle, GradientButton } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";
import { getTranslator } from "@/lib/i18n";

export default function OnboardingPage() {
  const router = useRouter();
  const { setUserInfo, language } = useAppStore();

  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const translations = getTranslator(language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError(translations("onboarding.errorRequired"));
      return;
    }

    if (!month || !day || !year) {
      setError(translations("onboarding.errorRequired"));
      return;
    }

    // Validate date
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);
    const yearNum = parseInt(year, 10);

    if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31 || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError(translations("onboarding.errorInvalidDate"));
      return;
    }

    if (!hour || !minute || !gender) {
      setError(translations("onboarding.errorRequired"));
      return;
    }

    setIsLoading(true);

    // Format data
    const birthDate = `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
    const birthTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${ampm}`;

    setUserInfo({
      name,
      birthDate,
      birthTime,
      gender,
    });

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push("/home");
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-4 pb-8">
        <Header showSettings={true} />

        {/* Title */}
        <div className="mt-8 mb-8">
          <h1
            className="font-display text-3xl font-bold text-center"
            style={{ color: "var(--text-primary)" }}
          >
            {translations("onboarding.title")}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <PillInput
            label={translations("onboarding.fullName")}
            placeholder={translations("onboarding.placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ height: "48px" }}
          />

          {/* Date of Birth */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold block"
              style={{ color: "var(--text-label)" }}
            >
              {translations("onboarding.dateOfBirth")}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                maxLength={2}
                className="pill-input flex-1 text-center"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  maxWidth: "70px",
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                maxLength={2}
                className="pill-input flex-1 text-center"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  maxWidth: "70px",
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                maxLength={4}
                className="pill-input flex-1 text-center"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  maxWidth: "90px",
                }}
              />
            </div>
          </div>

          {/* Time of Birth */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold block"
              style={{ color: "var(--text-label)" }}
            >
              {translations("onboarding.timeOfBirth")}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                placeholder="00"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                maxLength={2}
                className="pill-input flex-1 text-center"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  maxWidth: "60px",
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="00"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                maxLength={2}
                className="pill-input flex-1 text-center"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  maxWidth: "60px",
                }}
              />
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="pill-input flex-1 text-center"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  maxWidth: "70px",
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold block"
              style={{ color: "var(--text-label)" }}
            >
              {translations("onboarding.gender")}
            </label>
            <GenderToggle
              value={gender}
              onChange={setGender}
              maleLabel={translations("onboarding.male")}
              femaleLabel={translations("onboarding.female")}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-[var(--error-red)]">{error}</p>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <GradientButton
              type="submit"
              fullWidth
              loading={isLoading}
            >
              {translations("onboarding.analyze")}
            </GradientButton>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
