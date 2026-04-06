# Aspects Selection Storyboard

## Video: Aspects Selection (Chọn khía cạnh)

**Duration:** 30-45 seconds
**Languages:** Vietnamese, English
**Resolution:** 1920x1080 (landscape), 1080x1920 (vertical)

---

## Shot List

### Shot 1: Page Load (3s)
- **Action:** Navigate to `/aspects`
- **Visual:** Six aspect cards load with animation
- **Highlight:** All aspect options visible
- **Text Overlay:** "Choose an area of life to explore"

### Shot 2: Love Aspect (5s)
- **Action:** Hover and click Love aspect
- **Visual:** Card highlight, click animation
- **Text Overlay:** "Tình duyên / Love"
- **Transition:** Brief pause, then back

### Shot 3: Career Aspect (5s)
- **Action:** Hover and click Career aspect
- **Visual:** Card highlight, click animation
- **Text Overlay:** "Sự nghiệp / Career"
- **Transition:** Brief pause, then back

### Shot 4: Finance Aspect (5s)
- **Action:** Hover and click Finance aspect
- **Visual:** Card highlight, click animation
- **Text Overlay:** "Tài lộc / Finance"
- **Transition:** Brief pause, then back

### Shot 5: Health Aspect (5s)
- **Action:** Hover and click Health aspect
- **Visual:** Card highlight, click animation
- **Text Overlay:** "Sức khỏe / Health"
- **Transition:** Brief pause, then back

### Shot 6: Family Aspect (5s)
- **Action:** Hover and click Family aspect
- **Visual:** Card highlight, click animation
- **Text Overlay:** "Gia đạo / Family"
- **Transition:** Brief pause, then back

### Shot 7: Full Flow Demo (8s)
- **Action:** Complete selection flow
- **Visual:** Select Love aspect, show result page briefly
- **Highlight:** Navigation to result with aspect parameter
- **Text Overlay:** "Your personalized reading"

---

## Technical Notes

### Aspect Selectors
```css
[data-testid="aspect-love"]    /* Love / Tình duyên */
[data-testid="aspect-career"]  /* Career / Sự nghiệp */
[data-testid="aspect-finance"] /* Finance / Tài lộc */
[data-testid="aspect-health"]  /* Health / Sức khỏe */
[data-testid="aspect-family"]  /* Family / Gia đạo */
[data-testid="aspect-other"]   /* Other / Khác */
```

### Pre-Recording Setup
- User must be authenticated
- Navigate from home for realistic flow

---

## Recording Script

```typescript
async function recordAspects(page, language) {
  await authenticateUser(page, language);
  await startRecording('aspects', language);

  // Shot 1: Page load
  await page.goto('/aspects');
  await wait(1000);
  await addOverlay('Choose an area of life to explore');

  const aspects = ['love', 'career', 'finance', 'health', 'family'];

  // Shots 2-6: Each aspect
  for (const aspect of aspects) {
    await hoverWithDelay(page, `[data-testid="aspect-${aspect}"]`, 500);
    await addOverlay(getAspectLabel(aspect, language));
    await wait(1000);
    await page.click(`[data-testid="aspect-${aspect}"]`);
    await wait(2000);
    await page.goBack();
    await wait(500);
  }

  // Shot 7: Full flow
  await page.goto('/aspects');
  await wait(800);
  await page.click('[data-testid="aspect-love"]');
  await wait(2000);
  await addOverlay('Your personalized reading');
  await wait(1500);

  await stopRecording();
}

function getAspectLabel(aspect: string, lang: string): string {
  const labels = {
    love: { vi: 'Tình duyên', en: 'Love' },
    career: { vi: 'Sự nghiệp', en: 'Career' },
    finance: { vi: 'Tài lộc', en: 'Finance' },
    health: { vi: 'Sức khỏe', en: 'Health' },
    family: { vi: 'Gia đạo', en: 'Family' },
  };
  return labels[aspect][lang];
}
```

---

## Output Files

| Language | Resolution | Filename |
|----------|------------|----------|
| Vietnamese | 1920x1080 | `aspects-vi-landscape.mp4` |
| Vietnamese | 1080x1920 | `aspects-vi-vertical.mp4` |
| English | 1920x1080 | `aspects-en-landscape.mp4` |
| English | 1080x1920 | `aspects-en-vertical.mp4` |