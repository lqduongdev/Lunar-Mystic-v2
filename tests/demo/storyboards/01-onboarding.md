# Onboarding Flow Storyboard

## Video: Onboarding Flow (Quy trình Onboarding)

**Duration:** 45-60 seconds
**Languages:** Vietnamese, English
**Resolution:** 1920x1080 (landscape), 1080x1920 (vertical)

---

## Shot List

### Shot 1: Splash/Entry (2s)
- **Action:** Navigate to `/onboarding`
- **Visual:** Page loads, form appears
- **Highlight:** App logo/title
- **Audio:** None (text overlay: "Welcome to Lunar Mystic")

### Shot 2: Name Input (5s)
- **Action:** Click name input field
- **Visual:** Cursor focuses on input, text appears
- **Input:** "Nguyễn Văn An" (VI) / "John Smith" (EN)
- **Typing Speed:** 50ms per character (natural feel)
- **Highlight:** Input field with yellow cursor circle
- **Text Overlay:** "Enter your name"

### Shot 3: Birth Date Selection (8s)
- **Action:** Click date picker
- **Visual:** Date picker opens, navigate to June 1990
- **Input:** 1990-06-15
- **Highlight:** Calendar navigation
- **Text Overlay:** "Select your birth date"

### Shot 4: Birth Time Input (5s)
- **Action:** Click time input
- **Visual:** Time picker or direct input
- **Input:** "14:30" (2:30 PM)
- **Highlight:** Time selection
- **Text Overlay:** "Enter birth time"

### Shot 5: Gender Selection (4s)
- **Action:** Click gender toggle
- **Visual:** Male/Female toggle animates
- **Selection:** Male
- **Highlight:** Selected state
- **Text Overlay:** "Select your gender"

### Shot 6: Form Validation (3s)
- **Action:** Brief pause to show completed form
- **Visual:** All fields filled, submit button active
- **Highlight:** Complete form state

### Shot 7: Submit (5s)
- **Action:** Click submit button
- **Visual:** Button press animation, loading state
- **Transition:** Page redirects to /home
- **Text Overlay:** "Analyzing your destiny..."

### Shot 8: Success/Redirect (3s)
- **Action:** Landing on home page
- **Visual:** Home page appears with user info
- **Highlight:** Welcome message
- **Text Overlay:** "Your personalized reading is ready"

---

## Technical Notes

### Cursor Movement
- Use `page.mouse.move()` with smooth interpolation
- Add 300ms delay before each click
- Highlight cursor with semi-transparent circle

### Animation Timing
- Wait for page load: 1000ms
- Wait for animations: 500ms after each interaction
- Pause on key elements: 800ms

### Text Overlays
- Font: System UI, 24px, white with shadow
- Position: Top-center of screen
- Duration: 2-3 seconds per overlay

### Language Variants
- Vietnamese (VI): Use `DEMO_USER_VI`, show Vietnamese UI
- English (EN): Use `DEMO_USER_EN`, show English UI
- Record separately for clean audio track

---

## Recording Script

```typescript
// Pseudocode for recording
async function recordOnboarding(page, language) {
  const user = language === 'vi' ? DEMO_USER_VI : DEMO_USER_EN;

  // Start recording
  await startRecording('onboarding', language);

  // Shot 1: Navigate to page
  await page.goto('/onboarding');
  await wait(1000);

  // Shot 2: Name input
  await highlightCursor(page);
  await page.click('input[name="name"]');
  await typeWithDelay(page, user.name, 50);
  await wait(500);

  // Shot 3: Birth date
  await page.click('input[name="birthDate"]');
  await selectDate(page, user.birthDate);
  await wait(500);

  // Shot 4: Birth time
  await page.click('input[name="birthTime"]');
  await typeWithDelay(page, user.birthTime, 50);
  await wait(500);

  // Shot 5: Gender
  const genderSelector = user.gender === 'male'
    ? 'button[data-gender="male"]'
    : 'button[data-gender="female"]';
  await page.click(genderSelector);
  await wait(300);

  // Shot 6: Pause for validation
  await wait(1000);

  // Shot 7: Submit
  await page.click('button[type="submit"]');
  await page.waitForURL('/home', { timeout: 10000 });

  // Shot 8: Success
  await wait(2000);

  // Stop recording
  await stopRecording();
}
```

---

## Output Files

| Language | Resolution | Filename |
|----------|------------|----------|
| Vietnamese | 1920x1080 | `onboarding-vi-landscape.mp4` |
| Vietnamese | 1080x1920 | `onboarding-vi-vertical.mp4` |
| English | 1920x1080 | `onboarding-en-landscape.mp4` |
| English | 1080x1920 | `onboarding-en-vertical.mp4` |