# Results Page Storyboard

## Video: Results Display (Hiển thị kết quả)

**Duration:** 60-90 seconds
**Languages:** Vietnamese, English
**Resolution:** 1920x1080 (landscape), 1080x1920 (vertical)

---

## Shot List

### Shot 1: Results Load (5s)
- **Action:** Navigate to `/result?type=lifetime`
- **Visual:** Loading state → Results appear
- **Highlight:** Loading animation
- **Text Overlay:** "Calculating your destiny..."

### Shot 2: User Info Card (8s)
- **Action:** Pan to user info section
- **Visual:** User name, birth date, lunar date display
- **Highlight:** Info card with subtle animation
- **Text Overlay:** "Your birth information"

### Shot 3: Astrology Tab (15s)
- **Action:** Show default astrology tab
- **Visual:** Life palace elements, key stars
- **Highlight:** Each section briefly
- **Text Overlay:** "Tử vi - Your astrological reading"

### Shot 4: Tab Switch to Numerology (5s)
- **Action:** Click Numerology tab
- **Visual:** Tab transition animation
- **Highlight:** Active tab state
- **Text Overlay:** "Thần số - Numerology insights"

### Shot 5: Numerology Content (10s)
- **Action:** Show numerology results
- **Visual:** Life path number, calculation steps
- **Highlight:** Main number prominently

### Shot 6: Tab Switch to I Ching (5s)
- **Action:** Click I Ching tab
- **Visual:** Tab transition animation
- **Text Overlay:** "Kinh Dịch - I Ching hexagram"

### Shot 7: I Ching Content (10s)
- **Action:** Show hexagram display
- **Visual:** Hexagram visual, meaning, advice
- **Highlight:** Hexagram number and lines

### Shot 8: Edit Button (5s)
- **Action:** Hover over edit button
- **Visual:** Button highlight
- **Text Overlay:** "Edit your information"

### Shot 9: Share Button (5s)
- **Action:** Hover over share button
- **Visual:** Button highlight
- **Text Overlay:** "Share your reading"

### Shot 10: Navigation (5s)
- **Action:** Show back navigation
- **Visual:** Back button interaction
- **Text Overlay:** "Return to home"

---

## Technical Notes

### Tab Selectors
```css
[data-testid="tab-astrology"]   /* Tử vi tab */
[data-testid="tab-numerology"]  /* Thần số tab */
[data-testid="tab-iching"]      /* Kinh Dịch tab */
```

### Content Selectors
```css
.user-info-card                  /* User information */
.astrology-content               /* Astrology results */
.numerology-content              /* Numerology results */
.iching-content                  /* I Ching results */
[data-testid="edit-btn"]         /* Edit button */
[data-testid="share-btn"]        /* Share button */
```

### Pre-Recording Setup
- Complete onboarding flow first
- Ensure results are loaded

---

## Recording Script

```typescript
async function recordResults(page, language) {
  await authenticateUser(page, language);
  await startRecording('results', language);

  // Shot 1: Load results
  await page.goto('/result?type=lifetime');
  await addOverlay('Calculating your destiny...');
  await wait(2000);
  await waitForResults(page);

  // Shot 2: User info
  await scrollToElement(page, '.user-info-card');
  await addOverlay('Your birth information');
  await wait(3000);

  // Shot 3: Astrology tab (default)
  await addOverlay('Tử vi - Your astrological reading');
  await wait(3000);
  await highlightElement(page, '.life-palace');
  await wait(2000);
  await highlightElement(page, '.key-stars');
  await wait(2000);

  // Shot 4: Switch to Numerology
  await page.click('[data-testid="tab-numerology"]');
  await addOverlay('Thần số - Numerology insights');
  await wait(3000);

  // Shot 5: Numerology content
  await highlightElement(page, '.life-path-number');
  await wait(2000);
  await highlightElement(page, '.calculation-steps');
  await wait(2000);

  // Shot 6: Switch to I Ching
  await page.click('[data-testid="tab-iching"]');
  await addOverlay('Kinh Dịch - I Ching hexagram');
  await wait(3000);

  // Shot 7: I Ching content
  await highlightElement(page, '.hexagram-display');
  await wait(2000);
  await highlightElement(page, '.hexagram-meaning');
  await wait(2000);

  // Shot 8: Edit button
  await hoverWithDelay(page, '[data-testid="edit-btn"]', 500);
  await addOverlay('Edit your information');
  await wait(2000);

  // Shot 9: Share button
  await hoverWithDelay(page, '[data-testid="share-btn"]', 500);
  await addOverlay('Share your reading');
  await wait(2000);

  // Shot 10: Back navigation
  await hoverWithDelay(page, 'button[aria-label="back"]', 300);
  await addOverlay('Return to home');
  await wait(2000);

  await stopRecording();
}
```

---

## Output Files

| Language | Resolution | Filename |
|----------|------------|----------|
| Vietnamese | 1920x1080 | `results-vi-landscape.mp4` |
| Vietnamese | 1080x1920 | `results-vi-vertical.mp4` |
| English | 1920x1080 | `results-en-landscape.mp4` |
| English | 1080x1920 | `results-en-vertical.mp4` |