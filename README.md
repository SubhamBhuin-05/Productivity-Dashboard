# Productivity Dashboard

A lightweight web app that brings together a set of productivity tools in one place. Click any card to open a full‑screen workspace for that feature.

## ✅ What’s Working

### 🧭 Navigation & UI
- **Main Dashboard Grid**: Click any of the 5 cards (To‑Do, Daily Planner, Motivation, Pomodoro, Quick Notes) to open that feature’s workspace.
- **Back Buttons**: Each feature has a back button (⟵) to close the full‑screen view and return to the dashboard.
- **Theme Switcher**: The header “Change Theme” button toggles between two distinct color palettes by updating CSS custom properties.

### ✅ To‑Do List (Task Tracker)
- Add tasks with:
  - Title
  - Details (optional)
  - “Important” flag (adds an **imp** badge)
- Persist tasks in **localStorage** so they remain across page reloads.
- Render tasks with a “Mark as completed” button that removes the task.

### ✅ Daily Planner
- Builds a day schedule from **6:00–23:00**, with one input per hour.
- Save planner entries to **localStorage** automatically as you type.

### ✅ Motivational Quote
- Loads a random quote from the **ZenQuotes API** (via a CORS proxy):
  - Quote text
  - Author

### ✅ Pomodoro Timer
- Full Pomodoro workflow with:
  - Start / Pause / Reset controls
  - Work session (25 min) → Break session (5 min) cycle
  - Session label + styling changes for work vs break
  - Timer updates every second

### ✅ Quick Notes
- Create quick notes with a title + content.
- Notes persist in **localStorage**.
- Notes render as cards with a delete button.

### ✅ Weather + Clock (Header)
- Displays in the header:
  - Current local time (HH:MM:SS AM/PM) updated every second
  - Today’s date (Day, Month, Year)
  - Current weather for **Kolkata** (hardcoded), fetched from **WeatherAPI**:
    - Temperature
    - Condition
    - Pressure
    - Humidity
    - Wind speed

## 📂 Project Files
- `index.html` – UI layout and feature containers.
- `style.css` – styling for dashboard, cards, feature pages, and theme colors.
- `script.js` – all interactive logic (navigation, localStorage, API calls, timer, theme).

---

💡 Want enhancements? Ask for things like an editable city input for weather, note categories, notifications for Pomodoro, or a real “Daily Goals” tracker.