# Reusable UI Components Specification

This document defines all reusable frontend components for the Cyber Forensics Investigation Dashboard.

Each component must have a **single responsibility** and be reusable across pages.

---

## 🧱 Core Layout Components

### 1. AppLayout
Purpose:
- Main layout wrapper for all pages

Responsibilities:
- Render sidebar / navbar
- Render page content
- Maintain consistent spacing

Must NOT:
- Contain page-specific logic

---

### 2. Sidebar / Navbar
Purpose:
- Application navigation

Must Include:
- Dashboard
- Upload Logs
- Investigate Logs
- Search & Filter
- AI Insights
- Reports

Rules:
- Active route must be highlighted
- Icons optional but recommended

---

## 📊 Dashboard Components

### 3. SummaryCard
Purpose:
- Display key metrics

Props:
- title
- value
- icon (optional)
- color (optional)

Usage:
- Dashboard page only

---

### 4. ChartWidget
Purpose:
- Display charts (bar, pie, line)

Props:
- chartType
- data
- title

Notes:
- Data may be static
- Visualization only

---

## 📁 Log Ingestion Components

### 5. FileUploader
Purpose:
- Handle log file upload UI

Must Include:
- Drag-and-drop area
- File select button

Must NOT:
- Parse files
- Validate content

---

### 6. UploadStatusCard
Purpose:
- Show upload progress and status

States:
- Processing
- Success
- Failed

---

## 🔍 Investigation Components

### 7. LogsTable
Purpose:
- Display logs in tabular format

Columns:
- Timestamp
- Source
- Severity
- Message

Rules:
- Read-only
- Supports pagination
- Row click enabled

---

### 8. LogDetailModal
Purpose:
- Show detailed log information

Must Include:
- Full message
- Timestamp
- Source
- Severity
- Read-only badge

Trigger:
- Opened from LogsTable row click

---

## 🔎 Search & Filter Components

### 9. SearchBar
Purpose:
- Keyword-based search input

Props:
- placeholder
- onSearch

---

### 10. FilterPanel
Purpose:
- Apply investigation filters

Must Include:
- Date range selector
- Source dropdown
- Severity dropdown
- Apply / Reset buttons

---

### 11. ActiveFilterChips
Purpose:
- Display applied filters visually

Rules:
- Each filter removable
- Clear-all option available

---

## 🤖 AI Insights Components

### 12. AnomalyCard
Purpose:
- Display a detected anomaly

Must Include:
- Description
- Severity / confidence score

---

### 13. CorrelationGroup
Purpose:
- Display grouped correlated events

Must Include:
- Group title (Case ID / Session ID)
- Related log list
- Explanation text

---

## 📄 Reports & Export Components

### 14. ReportOptionsForm
Purpose:
- Select report contents

Options:
- Include logs
- Include anomalies
- Include timeline

---

### 15. ExportButton
Purpose:
- Trigger report export

Props:
- format (PDF / CSV / JSON)

Rules:
- May trigger static download
- Show success feedback

---

## 🚫 Component Rules (Very Important)

- Components must not fetch data directly
- No business logic inside components
- No backend calls
- No mutation of log data
- All data passed via props

---

## ✅ Component Completion Criteria

A component is complete if:
- Its responsibility is clear
- It is reusable
- It does not overlap with page logic
- It follows read-only forensic principles

---

