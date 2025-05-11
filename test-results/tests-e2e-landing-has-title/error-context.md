# Test info

- Name: has title
- Location: C:\Users\ryant\OneDrive\Desktop\projects\i-just-need-to-lock-in\tests\e2e\landing.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected pattern: /Lock in/
Received string:  "LOCK IN"
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html lang="en" class="__className_3a0388">…</html>
      - unexpected value "LOCK IN"

    at C:\Users\ryant\OneDrive\Desktop\projects\i-just-need-to-lock-in\tests\e2e\landing.spec.ts:7:22
```

# Page snapshot

```yaml
- button "Open Next.js Dev Tools":
  - img
- alert
- heading "LOCK IN" [level=1]
- heading "(for real this time)" [level=1]
- heading "Take back control of your time. Track your day, share your journey, visualize your growth." [level=2]
- link "I'M READY TO LOCK IN":
  - /url: /sign-up
- heading "Every second counts" [level=1]
- heading "Do you ever find yourself wondering, where did all that time go? Managing time with imalockin boosts productivity and motivation, yielding significant benefits." [level=2]
- img
- paragraph: Better focus
- img
- paragraph: Stay organized
- img
- paragraph: Visualize progress
- img
- paragraph: Stay motivated with friends
- heading "Your Day At A Glance" [level=1]
- img:
  - img
  - img
  - img
  - text: 🌍projects 📙homework 🌿self care
- img: 12AM 5AM 10AM 3PM 8PM 0m 30m 60m
- paragraph: 7 hrs 20 m
- heading "See where all that time went 👁️" [level=1]
- text: Time flies by. Never let another hour slip away by tracking your day.
- heading "Feel connected 💖" [level=1]
- text: Productivity doesn't have to be sad or lonely. Win, grow, and stay productive with the people you love.
- heading "Friends" [level=1]
- img
- paragraph: Giang Tran
- paragraph: 🔒 polisci essay
- paragraph: Miu Noguchi
- paragraph: 🔒 physics study :(
- paragraph: Joseph Huynh
- paragraph: 🔒 meal prep
- paragraph: KentyBear
- paragraph: Unlocked
- paragraph: Ryan
- paragraph: Unlocked
- heading "Today's Top Locked Inners 😎" [level=1]
- paragraph: joda
- text: 🥈
- paragraph: 5h 30m
- paragraph: icu
- text: 🥇
- paragraph: 12h 55m
- paragraph: kaytlin
- text: 🥉
- paragraph: 5h 29m
- paragraph: 4. josephh
- paragraph: 1h 45m
- paragraph: 5. Lauren
- paragraph: 55m
- heading "Compete with friends 🏆" [level=1]
- text: "Locking in is more fun with a little friendly competition. Stay productive and earn the coveted #1 locked inner spot on the leaderboards!"
- heading "Stay organized 📂" [level=1]
- text: Overwhelmed? Too much to do? We've all been there. Decluster your mind and feel clarity by organizing your tasks.
- heading "To Dos" [level=1]
- img
- img
- paragraph: 📙 Homework
- paragraph: history reading
- img
- paragraph: cecs 323 diagram
- img
- paragraph: 💻 Career
- paragraph: daily leetcode
- paragraph: apply to 3 jobs
- img
- paragraph: 🌿 Self Care
- paragraph: stretches
- paragraph: breathing exercises
- img
- paragraph: 🌍 Projects (2)
- paragraph: 1000+
- paragraph: hours spent locking in
- paragraph: 3000+
- paragraph: work sessions
- paragraph: 700+
- paragraph: tasks completed
- paragraph: Ready to take control of your day? Just click here, and we'll handle the rest.
- link "I'M READY TO LOCK IN":
  - /url: /sign-up
- link "Privacy Policy":
  - /url: /privacy
- link "Terms Of Service":
  - /url: /tos
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('has title', async ({ page }) => {
  4 |   await page.goto('http://localhost:3000');
  5 |
  6 |   // Expect a title "to contain" a substring.
> 7 |   await expect(page).toHaveTitle(/Lock in/);
    |                      ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
  8 | });
  9 |
```