# Page Definitions & Behavior

This document defines the purpose, layout, and behavior of each page in the Cyber Forensics Investigation Dashboard.

Each page must be implemented as a **separate route and component**.

---

## 1. Dashboard Page

### Purpose
Provide a high-level overview of system activity and investigation status.

### Layout
- Top summary cards
- Charts section
- Recent activity section

### Must Include
- Summary cards:
  - Total Logs
  - Log Sources
  - Anomalies Detected
  - Correlated Events
- Charts (static/dummy data allowed):
  - Logs by Source (bar or pie)
  - Events Over Time (line chart)
- Optional recent activity list

### Notes
- No interaction required beyond navigation
- Charts may use hardcoded data

---

## 2. Upload Logs Page

### Purpose
Simulate log ingestion into the system.

### Layout
- Upload panel centered or card-based
- Status section below upload area

### Must Include
- Drag-and-drop upload area
- File picker button
- Supported formats text:
  `.log, .txt, .csv, .json`
- Upload progress bar
- Upload status indicator:
  - Processing
  - Success
  - Failed

### Notes
- No real file parsing required
- Status updates may be simulated with timers

---

## 3. Investigate Logs Page

### Purpose
Primary workspace for log investigation.

### Layout
- Table occupying most of the screen
- Optional filter bar on top

### Must Include
- Logs table with columns:
  - Timestamp
  - Source
  - Severity
  - Message (truncated)
- Pagination or infinite scroll
- Clickable rows

### On Row Click
Open a modal or side panel showing:
- Full log message
- Timestamp
- Source
- Severity
- Read-only indicator

### Notes
- Table data may come from static JSON
- No editing allowed

---

## 4. Search & Filter Page

### Purpose
Allow investigators to narrow down logs efficiently.

### Layout
- Search bar at top
- Filter panel (side or inline)
- Results table below

### Must Include
- Keyword search input
- Filters:
  - Date range picker
  - Log source dropdown
  - Severity dropdown
- Apply Filters button
- Reset Filters button
- Active filter indicators (chips/tags)

### Notes
- Filtering may be fully client-side
- Visual feedback for applied filters is mandatory

---

## 5. AI Insights Page

### Purpose
Visually explain detected anomalies and correlated events.

### Layout
- Anomalies section
- Correlation section

### Must Include
- List of detected anomalies:
  - Event description
  - Severity or confidence score
- Correlated events groups:
  - Group title (e.g., Session ID / Case ID)
  - Related logs listed together
- Explanation text for each group

### Notes
- All data may be static
- Focus on clarity and explainability, not accuracy

---

## 6. Reports & Export Page

### Purpose
Generate and export investigation reports.

### Layout
- Report options form
- Export action buttons

### Must Include
- Checkboxes:
  - Include logs
  - Include anomalies
  - Include timeline
- Export buttons:
  - Download PDF
  - Download CSV
  - Download JSON

### Notes
- Downloads may trigger static files
- Button clicks may show success toast or message

---

## Navigation Rules

- All pages must be accessible via sidebar or navbar
- Active page must be visually highlighted
- Navigation must feel linear and investigative

---

## Page Design Rules

- Each page has a single clear purpose
- No page should mix unrelated features
- UI must remain clean and readable
- Consistent spacing, colors, and typography

---

