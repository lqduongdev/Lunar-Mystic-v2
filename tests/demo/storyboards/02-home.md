# Home Page Storyboard

## Video: Home Navigation (Điều hướng trang chủ)

**Duration:** 30-45 seconds
**Languages:** Vietnamese, English
**Resolution:** 1920x1080 (landscape), 1080x1920 (vertical)

---

## Shot List

### Shot 1: Page Load (3s)
- **Action:** Navigate to `/home` (authenticated)
- **Visual:** Home page animates in
- **Highlight:** Three analysis cards visible
- **Text Overlay:** "Choose your reading type"

### Shot 2: Whole Life Card (8s)
- **Action:** Hover over "Whole Life" card
- **Visual:** Card highlight animation
- **Highlight:** Card border/glow effect
- **Text Overlay:** "Whole Life Reading - Your complete destiny"
- **Click:** Navigate to result page
- **Transition:** Wait for result to load

### Shot 3: Return to Home (3s)
- **Action:** Navigate back to home
- **Visual:** Return animation
- **Highlight:** Back navigation

### Shot 4: Daily Forecast Card (8s)
- **Action:** Hover over "Daily Forecast" card
- **Visual:** Card highlight animation
- **Text Overlay:** "Daily Forecast - Today's insights"
- **Click:** Navigate to result page

### Shot 5: Return to Home (3s)
- **Action:** Navigate back to home
- **Visual:** Return animation

### Shot 6: Specific Analysis Card (8s)
- **Action:** Hover over "Specific Analysis" card
- **Visual:** Card highlight animation
- **Text Overlay:** "Specific Analysis - Focus on one area"
- **Click:** Navigate to aspects page

### Shot 7: Settings Access (4s)
- **Action:** Show settings icon location
- **Visual:** Hover over settings button
- **Text Overlay:** "Access settings anytime"
- **Click:** Navigate to settings (optional)

---

## Technical Notes

### Pre-Recording Setup
- Complete onboarding with demo user first
- Ensure user is authenticated in localStorage

### Cursor Movement
- Smooth hover animations between cards
- 500ms pause on each card before click
- Highlight active card with border animation

### Card Selectors
```css
[data-testid="lifetime-card"]  /* Whole Life */
[data-testid="daily-card"]      /* Daily Forecast */
[data-testid="specific-card"]   /* Specific Analysis */
```

---

## Recording Script

```typescript
async function recordHome(page, language) {
  // Pre-req: User must be authenticated
  await authenticateUser(page, language);

  await startRecording('home', language);

  // Shot 1: Page load
  await page.goto('/home');
  await wait(1000);
  await addOverlay('Choose your reading type');

  // Shot 2: Whole Life Card
  await hoverWithDelay(page, '[data-testid="lifetime-card"]', 500);
  await addOverlay('Whole Life Reading - Your complete destiny');
  await wait(1500);
  await page.click('[data-testid="lifetime-card"]');
  await wait(2000);

  // Shot 3: Return
  await page.goBack();
  await wait(1000);

  // Shot 4: Daily Forecast
  await hoverWithDelay(page, '[data-testid="daily-card"]', 500);
  await addOverlay("Daily Forecast - Today's insights");
  await wait(1500);
  await page.click('[data-testid="daily-card"]');
  await wait(2000);

  // Shot 5: Return
  await page.goBack();
  await wait(1000);

  // Shot 6: Specific Analysis
  await hoverWithDelay(page, '[data-testid="specific-card"]', 500);
  await addOverlay('Specific Analysis - Focus on one area');
  await wait(1500);
  await page.click('[data-testid="specific-card"]');
  await wait(2000);

  // Shot 7: Settings (optional)
  await page.goto('/home');
  await hoverWithDelay(page, 'a[href="/settings"]', 300);
  await addOverlay('Access settings anytime');
  await wait(2000);

  await stopRecording();
}
```

---

## Output Files

| Language | Resolution | Filename |
|----------|------------|----------|
| Vietnamese | 1920x1080 | `home-vi-landscape.mp4` |
| Vietnamese | 1080x1920 | `home-vi-vertical.mp4` |
| English | 1920x1080 | `home-en-landscape.mp4` |
| English | 1080x1920 | `home-en-vertical.mp4` |