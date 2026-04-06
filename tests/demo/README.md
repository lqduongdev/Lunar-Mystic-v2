# Demo Video Recording Guide

## Overview

This directory contains scripts and configurations for recording automated demo videos of the Lunar Mystic application using Playwright.

## Directory Structure

```
tests/demo/
├── config/
│   └── video-config.ts      # Resolution, frame rate, timing settings
├── scripts/
│   ├── record-demo.ts       # Main recording script
│   ├── post-process.ts      # Video processing utilities
│   └── demo-data.ts         # Test data for recordings
├── storyboards/
│   ├── 01-onboarding.md     # Onboarding flow storyboard
│   ├── 02-home.md           # Home page storyboard
│   ├── 03-aspects.md        # Aspects selection storyboard
│   ├── 04-results.md        # Results page storyboard
│   └── 05-settings.md       # Settings page storyboard
└── assets/
    └── overlays/            # Text overlay assets

public/videos/
├── raw/                     # Raw recorded footage
└── final/                   # Processed final videos
```

## Quick Start

### Prerequisites

1. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

2. Ensure the app is running:
   ```bash
   npm run dev
   # or use production: https://lunar.lqduong.dev
   ```

3. Install ffmpeg (for video processing):
   ```bash
   brew install ffmpeg  # macOS
   # or
   apt-get install ffmpeg  # Linux
   ```

### Recording Videos

1. **Record all videos:**
   ```bash
   npx ts-node tests/demo/scripts/record-demo.ts
   ```

2. **Record specific video:**
   ```bash
   npx ts-node tests/demo/scripts/record-demo.ts --video=onboarding
   ```

3. **Record specific language:**
   ```bash
   npx ts-node tests/demo/scripts/record-demo.ts --lang=vi
   ```

4. **Record specific resolution:**
   ```bash
   npx ts-node tests/demo/scripts/record-demo.ts --resolution=vertical
   ```

### Processing Videos

After recording, process videos for web delivery:

```bash
   npx ts-node tests/demo/scripts/post-process.ts
```

This will:
- Add intro/outro bumpers
- Compress to target file size
- Generate multiple resolutions

## Video Specifications

### Output Formats

| Format | Resolution | Use Case |
|--------|------------|----------|
| Landscape | 1920x1080 | YouTube, Web docs |
| Vertical | 1080x1920 | TikTok, Instagram Reels |
| Mobile | 390x844 | App store previews |

### Quality Settings

- **Frame Rate:** 60fps (smooth animations)
- **Bit Rate:** 8Mbps (1080p), 6Mbps (vertical)
- **Codec:** H.264 (MP4)
- **Audio:** None (text overlays only)

## Recording Tips

### Cursor Visibility

The recording script highlights the cursor with a yellow circle for visibility:
- Cursor size: 24px (desktop), 32px (mobile)
- Color: #FFD700 (gold)
- Pre-click delay: 300ms
- Post-click delay: 500ms

### Animation Timing

Wait for animations to complete:
- Page load: 1000ms
- CSS transitions: 500ms
- Tab switches: 300ms
- Form submissions: 2000ms

### Text Overlays

Add text overlays at key moments:
- Duration: 2-3 seconds
- Font: System UI, 24px
- Position: Top-center
- Style: White with shadow

## Video Inventory

| # | Video | VI | EN | Duration |
|---|-------|----|----|----------|
| 1 | Onboarding | ✅ | ✅ | 45-60s |
| 2 | Home | ✅ | ✅ | 30-45s |
| 3 | Aspects | ✅ | ✅ | 30-45s |
| 4 | Results | ✅ | ✅ | 60-90s |
| 5 | Settings | ✅ | ✅ | 30-45s |

**Total:** 20 videos (5 flows × 2 languages × 2 resolutions)

## Troubleshooting

### Videos are too large
- Reduce bit rate in `video-config.ts`
- Use ffmpeg compression in post-process

### Animations not smooth
- Increase frame rate to 60fps
- Add explicit waits between actions

### Cursor not visible
- Check `cursor.enabled` in config
- Increase cursor size for mobile recordings

### Text overlays not readable
- Increase font size
- Add more shadow/contrast
- Use semi-transparent background

## Post-Processing

### Adding Intro/Outro

Create a 3-second branded intro/outro:
1. Logo animation
2. App name: "Lunar Mystic"
3. URL: "lunar.lqduong.dev"

### Compression

Target file sizes:
- Landscape: <10MB
- Vertical: <8MB
- Mobile: <5MB

### Hosting

Upload final videos to:
- `/public/videos/final/` for self-hosting
- YouTube/Vimeo for public sharing
- Social media platforms directly

## Maintenance

When updating app features:

1. **Update storyboards** if UI changes
2. **Update selectors** in recording scripts
3. **Re-record affected videos**
4. **Process and compress** new videos

## License

Demo videos are for promotional use only. Ensure proper rights for any music or assets used.