# Frontend Requirements Specification

This document defines the **functional and UI requirements** for the Cyber Forensics Investigation Dashboard frontend.

All frontend implementation must strictly follow this specification.

---

## 🎯 Core Objective

To provide a **clear, investigator-friendly interface** for viewing, filtering, analyzing, and reporting cyber logs using a simulated forensic workflow.

---

## 📄 Mandatory Pages & Features

### 1. Dashboard
Purpose: High-level overview of the investigation system.

Must include:
- Summary cards:
  - Total logs ingested
  - Log sources count
  - Anomalies detected
  - Correlated events
- Static or dummy charts:
  - Logs by source
  - Events over time
- Recent activity list (optional)

---

### 2. Upload Logs
Purpose: Simulate log ingestion.

Must include:
- File upload interface
- Drag-and-drop support
- File picker button
- Supported formats label:
  - `.log`, `.txt`, `.csv`, `.json`
- Upload progress indicator
- Upload status display:
  - Processing
  - Success
  - Failed

Notes:
- No real parsing required
- Upload actions may be simulated

---

### 3. Investigate Logs
Purpose: Primary investigation workspace.

Must include:
- Table view of logs with columns:
  - Timestamp
  - Source
  - Severity
  - Message
- Pagination or lazy loading (simulated allowed)
- Row click interaction:
  - Opens log detail view (modal or side panel)

Log detail view must show:
- Full message
- Metadata (source, severity, timestamp)
- Read-only indicator

---

### 4. Search & Filter
Purpose: Narrow down logs during investigation.

Must include:
- Keyword search bar
- Filters:
  - Date range
  - Log source
  - Severity level
- Apply and Reset buttons
- Active filter indicators (chips or tags)

Filtering may be client-side using dummy data.

---

### 5. AI Insights
Purpose: Visual explanation of anomalies and correlations.

Must include:
- Detected anomalies list
- Correlated events grouped together
- Explanation text (static allowed)
- Confidence score or severity label

Notes:
- No real AI logic required
- Focus on explainability via UI

---

### 6. Reports & Export
Purpose: Generate investigation reports.

Must include:
- Report options:
  - Include logs
  - Include anomalies
  - Include timeline
- Export buttons:
  - PDF
  - CSV
  - JSON

Notes:
- Downloads may be static files
- Buttons may trigger placeholder actions

---

## 🎨 UI & UX Rules

- Logs must be read-only
- Severity must be color-coded:
  - Info → Blue
  - Warning → Orange
  - Critical → Red
- Clear spacing and hierarchy
- Consistent layout across pages
- No cluttered screens
- Investigation flow must feel logical

---

## 🔒 Forensics Awareness (UI-Level)

The UI must visually communicate:
- Data integrity awareness
- Non-editable logs
- Tamper-resistant concept (labels only)

Examples:
- “Read-only log” badge
- “Integrity verified” label

---

## ⚠️ Explicit Constraints

- No backend dependency
- No authentication requirement
- No real-time updates
- No actual AI/ML models
- Dummy data is acceptable everywhere

---

## ✅ Acceptance Criteria

The frontend is considered complete if:
- All mandatory pages exist
- All required UI elements are present
- The investigation workflow is clearly demonstrated
- Dummy data is consistently used
- The UI is easy to understand and explain

---

