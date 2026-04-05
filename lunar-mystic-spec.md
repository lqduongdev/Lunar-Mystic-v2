# 🌙 LUNAR MYSTIC — PRODUCT SPEC FOR CLAUDE CODE
> Version 2.0 | Cập nhật từ Figma UI thực tế | Mobile-first Next.js

---

## 1. TỔNG QUAN DỰ ÁN

**Tên app:** Lunar Mystic (玄月占卜)
**Platform:** Web App (Next.js + React), responsive mobile-first 375px
**AI Backend:** Claude API — model `claude-sonnet-4-20250514`
**Authentication:** Guest mode — không cần đăng nhập, lưu localStorage
**Theme mặc định:** Dark Mode, có thể chuyển Light / System
**Ngôn ngữ MVP:** Tiếng Việt + Tiếng Anh (toggle trong Settings)
**Tổng số màn hình:** 8 màn hình × 2 theme = 16 screens

---

## 2. DESIGN TOKENS — CHÍNH XÁC TỪ FIGMA

### 2.1 Color Palette

```css
/* ═══ DARK MODE ═══ */
--dark-bg:            #0D0A1A;   /* Background chính — deep purple-black */
--dark-bg-card:       #160F2A;   /* Card/surface background */
--dark-bg-input:      #1A1230;   /* Input fields */
--dark-border:        #3D2060;   /* Border cards, inputs */
--dark-border-active: #8B3DFF;   /* Border selected/focused */

--accent-pink:        #FF2D9B;   /* Hot pink — CTA buttons, active tabs, labels */
--accent-purple:      #8B3DFF;   /* Purple — borders, highlights */
--accent-gradient:    linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%);

--dark-text-primary:  #FFFFFF;
--dark-text-secondary:#C8A0E0;   /* Muted purple-white */
--dark-text-label:    #FF2D9B;   /* Section labels — pink */
--dark-text-caption:  #8B6AAE;   /* Caption, sublabels, meta */

/* ═══ LIGHT MODE ═══ */
--light-bg:           #FAF5FF;
--light-bg-gradient:  linear-gradient(180deg, #FFFFFF 0%, #F0D6FF 100%);
--light-bg-card:      #FFFFFF;
--light-border:       #DCC6F0;
--light-border-active:#A855F7;

--light-text-primary: #2D1B4E;
--light-text-secondary:#6B3FA0;
--light-text-label:   #7C3AED;

/* ═══ SHARED ═══ */
--error-red:          #FF4444;
--moon-icon-color:    #CC44FF;
--star-icon-color:    #FF2D9B;
```

### 2.2 Typography

```css
--font-display: 'Cinzel', serif;       /* Headings: 28px/400, card titles: 18px/600 */
--font-body:    system-ui, sans-serif; /* Body: 14px/400, labels: 14px/700 */
--font-caption: system-ui, sans-serif; /* 12px/400 — meta info */

/* Import: */
/* <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap"> */
```

### 2.3 Component Tokens

```css
/* Buttons */
--btn-gradient:    linear-gradient(135deg, #FF2D9B, #8B3DFF);
--btn-radius:      50px;
--btn-height:      56px;

/* Cards */
--card-radius:     16px;
--card-padding:    16px;

/* Inputs & Pills */
--pill-radius:     50px;
--pill-height:     48px;

/* Tab bar */
--tab-active:      #FF2D9B;
--tab-inactive:    #8B6AAE;

/* Toggle */
--toggle-on:       #FF2D9B;
--toggle-off:      #3D2060;
```

---

## 3. MÀN HÌNH CHI TIẾT — PIXEL-PERFECT TỪ FIGMA

---

### SCREEN 1 — SPLASH

```
Dark:  bg radial-gradient(#1A0A2E center → #050510 edges)
Light: bg linear-gradient(#FFFFFF → #F5E6FF bottom)

Logo "Lunar Mystic": custom font, gradient pink→purple, center screen
Subtitle "玄月占卜": 14px, purple, centered below logo

Animation: logo fade-in + scale 0.8→1.0 (600ms ease-out)
Auto-navigate → /onboarding sau 2 giây
```

---

### SCREEN 2 — ENTER YOUR INFO (/onboarding)

```
[⚙️ icon — top right, 24px, color #8B6AAE]

[Title] "Enter Your Info"
  Cinzel 28px, center, margin-top 80px

[Form — margin 24px horizontal]

  "Full Name" (label 14px bold)
  [Pill input — height 48px, radius 50px]
    placeholder "Placeholder"
    Dark: bg #1A1230, border #3D2060
    Light: bg #FFF, border #DCC6F0

  "Date of Birth" (label)
  [Row: 3 pill inputs]
    [MM] width 64px  [DD] width 64px  [YYYY] width 90px
    Same pill style, center text
  [Error text — #FF4444, 12px]
    "Caption or warning for this form field"

  "Time of Birth" (label)
  [Row: 3 pill inputs]
    [00] [00] [AM]  — same widths as date pills

  "Gender" (label)
  [Row: 2 pill buttons]
    [Male — SELECTED] [Female]
    Selected: gradient bg + white text
    Unselected: transparent + border #8B3DFF + text #C8A0E0
    Height 40px, radius 50px

[CTA Button — full width, margin 0 24px]
  Text "Analyze"
  bg: gradient(135deg, #FF2D9B → #8B3DFF)
  height 56px, radius 50px, text white 16px semibold
```

**Validation:** Name required ≥2 chars · Date required & valid · Gender required
**On submit:** button → spinner + "Analyzing..." → navigate /home

---

### SCREEN 3 — CHOOSE ANALYSIS TYPE (/home)

```
[Header: "< Back"  ·  ⚙️]

[Title] "What would you like to view?"
  Cinzel 28px, center, 2 lines (break sau "you")

[3 Cards — vertical stack, gap 16px, margin 24px]

CARD 1 — "Whole Life Overview"
  Dark:  bg #200840, border #8B3DFF 1.5px, radius 16px, height ~140px
  Light: bg gradient pink→purple (filled), white text
  Left:  "Whole Life / Overview" — 18px semibold
  Right: Meditating figure SVG (line art, purple, opacity 0.6, ~120px)
  Selected state: border brightens + slight scale-down 0.98

CARD 2 — "Daily Forecast"
  Dark:  bg #160F2A, border #3D2060, height ~120px
  Light: bg #FFF, border #DCC6F0
  Text:  Dark=#FF2D9B, Light=purple
  Right: Eclipse circle SVG (line art)

CARD 3 — "Specific Aspect Analysis"
  Same style as Card 2 (unselected)
  Right: Bagua/yin-yang SVG (line art)
```

**Tap Card 1 or 2** → navigate /result?type=lifetime | today
**Tap Card 3** → navigate /aspects

---

### SCREEN 4 — SPECIFIC ASPECT LIST (/aspects)

```
[Header: "< Back"  ·  ⚙️]

[Title] "What would you like to view?"
  Cinzel 26px (nhỏ hơn S3 vì text dài)

[List 6 items — gap 12px, margin 24px]

Each item — pill shape:
  height 64px, radius 50px
  Dark: border #3D2060, bg transparent
  Light: border #DCC6F0, bg #FFF

  [Icon circle left — 40px]
    Dark bg: #2A1545 | Light bg: #F0E6FF
    White SVG icon 20px

  [Text center-left]
    Dark #FFF | Light #6B3FA0, 16px/500

  [Chevron > right]
    Dark #8B6AAE | Light #A855F7

Items:
  🌺 Love Life    🏛️ Career
  👤 Health       ⊕  Finance
  🔗 Family       ☯️ Others...

Selected item (e.g. Love Life):
  bg gradient(135deg, #FF2D9B → #8B3DFF)
  text white, icon-bg rgba(255,255,255,0.2), chevron white
```

**Tap item** → navigate /result?type=love|career|health|finance|family|other

---

### SCREEN 5 — SUMMARY RESULTS (/result?type=lifetime|today)

```
[Header: "< Back"  ·  ⚙️]

[Title] "Overview Results" | "Daily Forecast"
  Cinzel 28px, center

─── TAB BAR ─────────────────────────────────────
  [⊙ Astrology]  [✕✕ Numerology]  [☯ I Ching]
  Height 48px
  Active: text #FF2D9B, underline 2px #FF2D9B, icon shown
  Inactive: text #8B6AAE, no icon
  Bottom border: 1px solid #3D2060 (dark) / #DCC6F0 (light)
─────────────────────────────────────────────────

┌─ USER INFO CARD ─────────────────────────────────┐
│ radius 12px, padding 16px                         │
│ Dark: bg #1A1230, border #3D2060                  │
│ Light: bg #FFF, border #DCC6F0                    │
│                                                    │
│ Row 1: [Name bold 16px]          [✎ Edit button] │
│         Edit: pink text, pink border, small pill  │
│ Row 2: 📅 "Mar 10, 1996 (Gregorian)"              │
│         🕐 "Hour: Dog (7–9 PM)"   (same row)     │
│ Row 3: 🌙 "21/01, Year of the Rat (Lunar)"       │
│ Meta text: 12px, #8B6AAE (dark) / #9B7BC0 (light)│
└──────────────────────────────────────────────────┘

─── SCROLLABLE CONTENT ──────────────────────────────

[Section Header] "Life Palace and Five Elements"
  16px bold, Dark #FF2D9B / Light #2D1B4E
  🌙 Moon icon right (20px, purple)

  3 Info Rows:
  [Moon SVG 32px] | LABEL (10px, #FF2D9B)
                  | VALUE (14px bold, primary)
                  | DESC  (13px, secondary)

  Labels: "ELEMENT:" / "LIFE PALACE:" / "BODY PLACEMENT PALACE:"

[Section Header] "Key Stars"
  Same style, but ✦ 4-point star icon right (pink)

  Star items:
  [✦ small] STAR NAME (11px caps, pink/purple)
             Description (13px, secondary)

─── STICKY BOTTOM ──────────────────────────────────
  [💾 Save Results]    [↗ Share]
  Both gradient buttons, height 52px, radius 50px
  Side by side, padding 16px, bg blur backdrop
─────────────────────────────────────────────────────
```

**Numerology tab content:**
- Large number display (main number "1")
- Calculation steps: "1+0+0+3+1+9+9+6=28 → 2+8=10 → 1+0=1"
- Sub-numbers grid (Day Number, Life Path, Mission, Soul)
- Life cycles (0-30, 30-60, 60+)

**I Ching tab content:**
- Main hexagram: 6 SVG lines (solid=yang, broken=yin), number + name
- Support hexagram: smaller card below
- Advice bullet list

---

### SCREEN 6 — DETAILED ASPECT (/result?type=love|career|...)

```
[Header + Tab Bar + User Info Card — same as Screen 5]

[Title] "Love Life Analysis" (hoặc Career/Health/Finance/Family)
  Cinzel 26px

─── ASTROLOGY TAB CONTENT ──────────────────────────

Sections (4 sections, spacing 24px between):

"Love Palace"          + 🌙 right
Body: "Metal - Fire match"

"Compatible Signs"     + 🌙 right
Body: "Rabbit, Pig"

"Incompatible"         + 🌙 right
Body: "Dragon, Snake"

"Advice"               + 🌙 right
Body: "Use colors like..."

Section title: 16px bold
  Dark #FF2D9B | Light #2D1B4E
Body: 14px
  Dark #C8A0E0 | Light #6B3FA0

[Sticky Bottom: Save + Share — same]
```

---

### SCREEN 7 — SETTINGS (/settings)

```
[Header: "< Back" only — NO settings icon]

[Title] "Settings" — Cinzel 28px, center

─── Language ───────────────────────────────────────
Label "Language" 16px bold

[Dropdown full-width]
  Text "English" + ▼ chevron right
  height 52px, radius 12px
  Dark: bg #1A1230, border #3D2060
  Light: bg #FFF, border #DCC6F0
  Options: English | Tiếng Việt

─── Theme ──────────────────────────────────────────
Label "Theme"

[3 Radio buttons — horizontal row, gap 24px]
  ○ Light    ○ Dark    ○ System

  Selected: filled pink circle inside purple ring
  Unselected: empty circle, border #3D2060
  Label 14px right of radio
  Default selected: Dark (dark mode) / Light (light mode)

─── Notifications ──────────────────────────────────
Label "Notifications" + [Toggle right]
  Dark mode: shows "On" label left of toggle
  Toggle On: #FF2D9B track, white thumb
  Toggle Off: #3D2060 track

─── Links ──────────────────────────────────────────
"Help & User Guide"   — 14px, #FF2D9B (dark) / #CC0077 (light)
"Privacy Policy"      — same color
```

---

## 4. NAVIGATION FLOW

```
/splash (2s)
    ↓
/onboarding          ←─── Edit (từ UserInfoCard)
    ↓ Analyze
/home
    ├── Whole Life Overview ──→ /result?type=lifetime
    ├── Daily Forecast ────────→ /result?type=today
    └── Specific Aspect ───────→ /aspects
                                    ├── Love Life → /result?type=love
                                    ├── Career   → /result?type=career
                                    ├── Health   → /result?type=health
                                    ├── Finance  → /result?type=finance
                                    ├── Family   → /result?type=family
                                    └── Others   → /result?type=other

/settings ← ⚙️ icon (available từ mọi màn hình trừ /settings)
```

---

## 5. COMPONENTS LIST

```tsx
// ui/
GradientButton      // "Analyze", "Save Results", "Share"
PillInput           // MM/DD/YYYY, HH/MM/AM
GenderToggle        // Male | Female exclusive
TabBar              // Astrology | Numerology | I Ching
SectionHeader       // title + icon (Moon or Star)
InfoRow             // label + value + description + icon
KeyStarItem         // star name + description
UserInfoCard        // name + dates + Edit button
AnalysisCard        // home screen cards with SVG illustration
AspectListItem      // icon + label + chevron pill
RadioGroup          // Theme selection
Toggle              // Notifications
SettingsDropdown    // Language selector
BottomActionBar     // Save + Share sticky bar

// illustrations/ (all inline SVG)
WholeLifeSVG        // meditating figure in circle
DailyForecastSVG    // eclipse/circle motif
BaguaSVG            // bagua yin-yang
MoonIcon            // crescent (16, 20, 32px variants)
StarIcon            // 4-point star ✦ (16, 20px)
HexagramDisplay     // 6 lines (1=solid, 0=broken), animated

// layout/
PageWrapper         // theme + safe-area padding
Header              // Back + optional Settings icon
```

---

## 6. CLAUDE API

### Route Handler

```typescript
// app/api/analyze/route.ts
export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(body) }]
    })
  });

  const data = await res.json();
  const text = data.content.map((b: any) => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    return Response.json(JSON.parse(clean));
  } catch {
    return Response.json({ error: "Parse failed", raw: text }, { status: 500 });
  }
}
```

### Prompts

```typescript
const SYSTEM_PROMPT = `Bạn là chuyên gia Tử Vi, Thần Số Học và Kinh Dịch với 30 năm kinh nghiệm.
Trả về CHỈ raw JSON hợp lệ theo schema. Không text nào khác. Không markdown fence.
Ngôn ngữ: theo yêu cầu người dùng.`;

function buildPrompt(data: AnalysisRequest): string {
  return `Phân tích vận mệnh:
Tên: ${data.name}
Ngày sinh: ${data.birthDate}
Giờ sinh: ${data.birthTime}
Giới tính: ${data.gender === 'male' ? 'Nam' : 'Nữ'}
Loại phân tích: ${data.analysisType}
Ngôn ngữ: ${data.language === 'vi' ? 'Tiếng Việt' : 'English'}

Thực hiện:
1. Chuyển sang ngày âm lịch
2. An 12 cung Tử Vi + sao chính tinh
3. Tính Thần Số Học (tất cả chỉ số)
4. Xác định quẻ Kinh Dịch
5. Trả JSON schema bên dưới — CHỈ JSON:

${JSON.stringify(RESPONSE_SCHEMA)}`;
}
```

### Response Schema

```typescript
const RESPONSE_SCHEMA = {
  userInfo: {
    lunarDate: "string",        // "21/01/Bính Tý"
    element: "string",          // "Giản Hạ Thủy"
    palace: "string",           // "Dậu (Kim)"
    bodyPalace: "string",       // "Tý (Thủy)"
    birthHour: "string"         // "Giờ Tuất"
  },
  astrology: {
    lifePalaceElements: [
      { label: "string", value: "string", description: "string" }
      // label: "ELEMENT" | "LIFE PALACE" | "BODY PLACEMENT PALACE"
    ],
    keyStars: [
      { name: "string", description: "string" }
    ],
    palaces: [
      { id: "number", name: "string", stars: ["string"], analysis: "string" }
    ],
    majorPeriods: [
      { ageRange: "string", description: "string" }
    ],
    specificAnalysis: {       // chỉ khi type = love/career/health/etc
      lovePalace: "string",
      compatibleSigns: "string",
      incompatibleSigns: "string",
      advice: "string"
    }
  },
  numerology: {
    mainNumber: "number",
    calculationSteps: ["string"],  // ["1+0+0+3+1+9+9+6=28", "2+8=10", "1+0=1"]
    meaning: "string",
    subNumbers: {
      dayNumber: "number",
      lifePath: "number",
      mission: "number",
      soulNumber: "number"
    },
    lifeCycles: [{ phase: "string", description: "string" }],
    detailedAnalysis: "string"
  },
  iChing: {
    mainHexagram: {
      number: "number",
      name: "string",
      lines: [1, 1, 1, 0, 1, 1],  // 1=solid(yang), 0=broken(yin)
      meaning: "string",
      advice: ["string"]
    },
    supportHexagram: {
      number: "number",
      name: "string",
      lines: [1, 1, 0, 0, 1, 1],
      meaning: "string"
    },
    detailedAnalysis: "string"
  },
  summary: {
    scores: {
      love: "number 1-10",
      career: "number 1-10",
      finance: "number 1-10",
      health: "number 1-10",
      family: "number 1-10",
      spiritual: "number 1-10"
    }
  }
};
```

---

## 7. STATE (Zustand)

```typescript
// store/useAppStore.ts
interface AppStore {
  userInfo: { name: string; birthDate: string; birthTime: string; gender: "male"|"female" } | null;
  analysisType: string | null;
  analysisResult: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  language: "vi" | "en";
  theme: "dark" | "light" | "system";
  notificationsEnabled: boolean;

  setUserInfo: (info: UserInfo) => void;
  setAnalysisType: (type: string) => void;
  fetchAnalysis: () => Promise<void>;
  setLanguage: (lang: "vi"|"en") => void;
  setTheme: (theme: "dark"|"light"|"system") => void;
}
```

---

## 8. I18N

```json
// lib/i18n/vi.json (excerpt)
{
  "onboarding": { "title": "Nhập thông tin của bạn", "fullName": "Họ và tên",
    "dateOfBirth": "Ngày sinh", "timeOfBirth": "Giờ sinh",
    "gender": "Giới tính", "male": "Nam", "female": "Nữ", "analyze": "Phân tích" },
  "home": { "title": "Bạn muốn xem gì?", "wholeLife": "Toàn bộ cuộc đời",
    "daily": "Dự báo hôm nay", "specific": "Phân tích chuyên sâu",
    "love": "Tình duyên", "career": "Sự nghiệp", "health": "Sức khỏe",
    "finance": "Tài chính", "family": "Gia đình", "others": "Lĩnh vực khác..." },
  "result": { "overviewTitle": "Kết quả tổng quan", "dailyTitle": "Dự báo hôm nay",
    "loveTitle": "Phân tích Tình duyên", "loading": "Đang giải mã vận mệnh...",
    "astrology": "Tử Vi", "numerology": "Thần Số", "iching": "Kinh Dịch",
    "edit": "Sửa", "save": "Lưu kết quả", "share": "Chia sẻ",
    "lifePalace": "Cung Mệnh và Ngũ Hành", "keyStars": "Chính Tinh nổi bật" },
  "settings": { "title": "Cài đặt", "language": "Ngôn ngữ", "theme": "Giao diện",
    "light": "Sáng", "dark": "Tối", "system": "Hệ thống",
    "notifications": "Thông báo", "help": "Trợ giúp & Hướng dẫn",
    "privacy": "Chính sách bảo mật" }
}
```

---

## 9. FILE STRUCTURE

```
lunar-mystic/
├── .env.local                        # ANTHROPIC_API_KEY=sk-ant-...
├── app/
│   ├── layout.tsx                    # Root layout + ThemeProvider
│   ├── page.tsx                      # Splash → redirect /onboarding
│   ├── onboarding/page.tsx
│   ├── home/page.tsx
│   ├── aspects/page.tsx
│   ├── result/page.tsx               # ?type=lifetime|today|love|...
│   ├── settings/page.tsx
│   └── api/analyze/route.ts          # Claude API handler
├── components/
│   ├── ui/                           # (see Components List section)
│   ├── illustrations/                # SVG components
│   └── layout/
│       ├── PageWrapper.tsx
│       └── Header.tsx
├── lib/
│   ├── claude.ts
│   ├── prompts.ts
│   └── i18n/ { vi.json, en.json }
├── store/useAppStore.ts
└── styles/
    ├── globals.css                   # CSS variables, dark/light tokens
    └── animations.css
```

---

## 10. IMPLEMENTATION NOTES

1. **API key:** Route Handler `/api/analyze` — không gọi Claude từ client
2. **CSS theme:** `data-theme="dark|light"` trên `<html>`, CSS variables tự đổi
3. **Date/Time input:** 3 PillInput riêng biệt — không dùng native `<input type="date">`
4. **SVG illustrations:** Inline SVG với `currentColor` để theo theme
5. **Bottom bar:** `position: sticky; bottom: 0` với `backdrop-filter: blur`
6. **Scroll:** Chỉ content area scroll, header + tabs + bottom bar fixed
7. **Loading:** Skeleton loader từng section (không full-screen spinner)
8. **Edit flow:** UserInfoCard → /onboarding với pre-filled data từ store
9. **JSON parse:** Strip ``` fences → trim() → JSON.parse trong try-catch
10. **Retry:** Nếu parse fail, retry 1 lần; nếu vẫn fail, hiển thị error state

---

## 11. SAMPLE DATA (Dev/Test)

```typescript
export const SAMPLE_USER = {
  name: "Nguyễn Văn Anh",
  birthDate: "10/03/1996",
  birthTime: "Giờ Tuất (19:00-21:00)",
  gender: "male" as const
};

export const SAMPLE_RESULT = {
  userInfo: {
    lunarDate: "21/01/Bính Tý",
    element: "Giản Hạ Thủy",
    palace: "Dậu (Kim)",
    bodyPalace: "Tý (Thủy)",
    birthHour: "Giờ Tuất"
  },
  astrology: {
    lifePalaceElements: [
      { label: "ELEMENT", value: "Mountain Stream Water",
        description: "Flexible, adaptive, intelligent, and skillful in communication." },
      { label: "LIFE PALACE", value: "Rooster – Metal",
        description: "Metal nourishes Water → favorable external support." },
      { label: "BODY PLACEMENT PALACE", value: "Rat – Water",
        description: "Harmonizes with element, ensuring later life stability." }
    ],
    keyStars: [
      { name: "THIÊN CƠ – THIÊN LƯƠNG (IN LIFE PALACE)",
        description: "Logical thinking, creative, strong analytical skills." },
      { name: "THÁI ÂM (CAREER PALACE)",
        description: "Suitable for research, creativity, business, or tech fields." },
      { name: "TẢ PHÙ – HỮU BẬT (WEALTH PALACE)",
        description: "Strong financial support." },
      { name: "LIÊM TRINH – PHÁ QUÂN (FORTUNE PALACE)",
        description: "Strong-willed, decisive, yet can be impulsive." }
    ],
    majorPeriods: [
      { ageRange: "0 – 30", description: "Personal development, learning, experience accumulation." },
      { ageRange: "31 – 50", description: "Major achievements if on the right path." },
      { ageRange: "51+", description: "Stability, enjoying the fruits of labor." }
    ]
  },
  numerology: {
    mainNumber: 1,
    calculationSteps: ["1+0+0+3+1+9+9+6=28", "2+8=10", "1+0=1"],
    meaning: "Pioneer, creative thinking, leadership ability.",
    subNumbers: { dayNumber: 10, lifePath: 1, mission: 1, soulNumber: 3 },
    lifeCycles: [
      { phase: "0 – 30", description: "Learning and experience accumulation." },
      { phase: "30 – 60", description: "Strong development phase." },
      { phase: "60+", description: "Stability, sharing wisdom." }
    ],
    detailedAnalysis: "Life Path number 1 symbolizes beginnings, pioneering spirit..."
  },
  iChing: {
    mainHexagram: {
      number: 34, name: "Lôi Thiên Đại Tráng",
      lines: [1,1,1,0,1,1],
      meaning: "Rapid development, full of energy — avoid arrogance.",
      advice: ["Leverage the strong growth phase", "Avoid impulsive actions", "Patience leads to sustainable success"]
    },
    supportHexagram: {
      number: 33, name: "Thiên Sơn Độn",
      lines: [1,1,0,0,1,1],
      meaning: "When facing difficulty, know when to retreat wisely."
    },
    detailedAnalysis: "Hexagram 34 shows you are in a strong development period..."
  },
  summary: {
    scores: { love: 7, career: 9, finance: 8, health: 6, family: 7, spiritual: 8 }
  }
};
```

---

*Spec v2.0 — Updated từ Figma UI review | April 2026*
*Đưa file này cho Claude Code để implement pixel-perfect theo design*
