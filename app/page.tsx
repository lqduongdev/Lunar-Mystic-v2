"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen min-h-dvh flex flex-col items-center justify-center bg-dark-gradient">
      {/* Logo Container */}
      <div className="animate-fade-in-scale flex flex-col items-center">
        {/* Main Logo */}
        <h1
          className="font-display text-4xl md:text-5xl font-bold text-center mb-2"
          style={{
            background: "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Lunar Mystic
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-display text-[#8B6AAE] tracking-wider">
          玄月占卜
        </p>

        {/* Decorative Moon Icon */}
        <div className="mt-8 relative">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse"
          >
            <circle cx="40" cy="40" r="38" stroke="url(#moon-gradient)" strokeWidth="2" fill="none" />
            <path
              d="M45 20C45 20 35 30 35 45C35 60 50 60 50 60"
              stroke="url(#moon-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="55" cy="30" r="2" fill="#CC44FF" />
            <circle cx="58" cy="35" r="1.5" fill="#FF2D9B" />
            <circle cx="52" cy="40" r="1" fill="#8B3DFF" />
            <defs>
              <linearGradient id="moon-gradient" x1="0" y1="0" x2="80" y2="80">
                <stop stopColor="#FF2D9B" />
                <stop offset="1" stopColor="#8B3DFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Loading Dots */}
      <div className="absolute bottom-20 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-[#FF2D9B] animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-[#8B3DFF] animate-pulse" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-[#CC44FF] animate-pulse" style={{ animationDelay: "300ms" }} />
      </div>
    </main>
  );
}
