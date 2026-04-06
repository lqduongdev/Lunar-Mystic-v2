# Settings Page Storyboard

## Video: Settings & Preferences (Cài đặt & Tùy chọn)

**Duration:** 30-45 seconds
**Languages:** Vietnamese, English
**Resolution:** 1920x1080 (landscape), 1080x1920 (vertical)

---

## Shot List

### Shot 1: Page Load (3s)
- **Action:** Navigate to `/settings`
- **Visual:** Settings page appears
- **Highlight:** All settings visible
- **Text Overlay:** "Customize your experience"

### Shot 2: Language Switcher (8s)
- **Action:** Click language dropdown
- **Visual:** Dropdown opens, options visible
- **Highlight:** VI/EN options
- **Action:** Select English
- **Visual:** UI text changes to English
- **Text Overlay:** "Switch language"

### Shot 3: Switch Back to Vietnamese (5s)
- **Action:** Select Vietnamese
- **Visual:** UI text changes back
- **Highlight:** Instant language switch

### Shot 4: Theme Selection - Light (5s)
- **Action:** Click Light theme radio
- **Visual:** App transitions to light theme
- **Highlight:** Background/text color change
- **Text Overlay:** "Light theme"

### Shot 5: Theme Selection - Dark (5s)
- **Action:** Click Dark theme radio
- **Visual:** App transitions to dark theme
- **Highlight:** Dark background appears
- **Text Overlay:** "Dark theme"

### Shot 6: Theme Selection - System (3s)
- **Action:** Click System theme radio
- **Visual:** Theme matches system preference
- **Text Overlay:** "System theme"

### Shot 7: Notifications Toggle (6s)
- **Action:** Click notification toggle
- **Visual:** Toggle switches on/off
- **Highlight:** Toggle animation
- **Text Overlay:** "Enable notifications"

### Shot 8: Help Link (3s)
- **Action:** Hover over Help link
- **Visual:** Link highlight
- **Text Overlay:** "Get help"

### Shot 9: Privacy Link (3s)
- **Action:** Hover over Privacy link
- **Visual:** Link highlight
- **Text Overlay:** "Privacy policy"

### Shot 10: Version Info (3s)
- **Action:** Scroll to bottom
- **Visual:** Version number visible
- **Highlight:** "v1.0.0" text
- **Text Overlay:** "App version"

### Shot 11: Back Navigation (3s)
- **Action:** Click back button
- **Visual:** Navigate back to home
- **Text Overlay:** "Save and return"

---

## Technical Notes

### Selectors
```css
select                                /* Language dropdown */
input[type="radio"][value="light"]   /* Light theme */
input[type="radio"][value="dark"]     /* Dark theme */
input[type="radio"][value="system"]   /* System theme */
.toggle, [data-testid="notification-toggle"]  /* Notifications */
a:has-text("Trợ giúp"), a:has-text("Help")     /* Help link */
a:has-text("Quyền riêng tư"), a:has-text("Privacy") /* Privacy link */
[data-testid="version"], .version-info          /* Version info */
```

### Theme Transitions
- Light → Dark: ~300ms CSS transition
- Dark → Light: ~300ms CSS transition
- Wait for transition to complete before next action

### Language Switching
- Language change is instant
- All UI text updates immediately
- No page reload required

---

## Recording Script

```typescript
async function recordSettings(page, language) {
  await authenticateUser(page, language);
  await startRecording('settings', language);

  // Shot 1: Page load
  await page.goto('/settings');
  await wait(1000);
  await addOverlay('Customize your experience');

  // Shot 2: Language switcher
  await page.click('select');
  await wait(300);
  await addOverlay('Switch language');
  await page.selectOption('select', 'en');
  await wait(800);

  // Shot 3: Switch back
  await page.selectOption('select', 'vi');
  await wait(500);

  // Shot 4: Light theme
  await page.click('input[type="radio"][value="light"], label:has-text("Sáng")');
  await addOverlay('Light theme');
  await wait(1000);

  // Shot 5: Dark theme
  await page.click('input[type="radio"][value="dark"], label:has-text("Tối")');
  await addOverlay('Dark theme');
  await wait(1000);

  // Shot 6: System theme
  await page.click('input[type="radio"][value="system"], label:has-text("Hệ thống")');
  await wait(500);

  // Shot 7: Notifications toggle
  await page.click('.toggle, [data-testid="notification-toggle"]');
  await addOverlay('Enable notifications');
  await wait(1000);
  await page.click('.toggle, [data-testid="notification-toggle"]');
  await wait(500);

  // Shot 8: Help link
  await hoverWithDelay(page, 'a:has-text("Trợ giúp"), a:has-text("Help")', 300);
  await addOverlay('Get help');
  await wait(1500);

  // Shot 9: Privacy link
  await hoverWithDelay(page, 'a:has-text("Quyền riêng tư"), a:has-text("Privacy")', 300);
  await addOverlay('Privacy policy');
  await wait(1500);

  // Shot 10: Version info
  await scrollToBottom(page);
  await addOverlay('App version');
  await wait(2000);

  // Shot 11: Back navigation
  await page.goBack();
  await addOverlay('Save and return');
  await wait(2000);

  await stopRecording();
}
```

---

## Output Files

| Language | Resolution | Filename |
|----------|------------|----------|
| Vietnamese | 1920x1080 | `settings-vi-landscape.mp4` |
| Vietnamese | 1080x1920 | `settings-vi-vertical.mp4` |
| English | 1920x1080 | `settings-en-landscape.mp4` |
| English | 1080x1920 | `settings-en-vertical.mp4` |