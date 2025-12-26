# UI & UX Rules for Cyber Forensics Dashboard

This document defines mandatory UI and UX rules that must be followed across the entire application.

These rules ensure clarity, consistency, and forensic correctness.

---

## 🎨 Visual Design Rules

### Color Usage
- Neutral background (light or dark)
- Severity color coding is mandatory:
  - Info → Blue
  - Warning → Orange
  - Critical → Red
- Do NOT overuse colors
- Charts and highlights must not overpower content

---

### Typography
- Use a clean, readable font
- Consistent font sizes across pages
- Clear visual hierarchy:
  - Page title
  - Section title
  - Content text

---

### Spacing & Layout
- Adequate spacing between sections
- Avoid cluttered screens
- One primary focus per page
- Consistent margins and padding

---

## 🧭 Navigation Rules

- Sidebar or navbar must be present on all pages
- Active page must be clearly highlighted
- Navigation labels must be clear and descriptive
- No hidden or confusing navigation paths

---

## 🔍 Data Presentation Rules

### Logs
- Logs are strictly read-only
- No edit, delete, or modify actions
- Log data must be presented clearly
- Long messages must be truncated with full view available on click

---

### Tables
- Column headers must be clearly labeled
- Severity must be visually distinguishable
- Pagination or scrolling must be implemented
- Empty states must be handled gracefully

---

## 🔒 Forensics Awareness Indicators (UI-Level)

The UI must visually communicate forensic principles:

- “Read-only data” badge on logs
- “Integrity verified” or “Tamper-resistant” label
- Timestamps displayed clearly
- No UI affordance for data modification

These are **visual indicators only**, not technical enforcement.

---

## 🤖 AI & Insights UI Rules

- AI insights must be explainable
- Each anomaly must include:
  - Description
  - Severity or confidence
- Correlated events must be grouped visually
- Explanation text must be easy to understand

Avoid:
- Overly technical AI terminology
- Black-box style outputs

---

## 📄 Reports & Export UI Rules

- Report options must be checkbox-based
- Export buttons must be clearly labeled
- Provide visual feedback on export action
- Do not auto-download without user action

---

## ⚠️ What NOT to Do

- Do not mix multiple workflows on one page
- Do not add backend status indicators
- Do not expose raw JSON on UI
- Do not allow user to modify forensic data
- Do not clutter pages with unnecessary controls

---

## ✅ UI Completion Criteria

The UI is considered correct if:
- All pages follow consistent design rules
- Investigation flow is clear
- Forensic principles are visually respected
- UI is easy to explain during evaluation

---

