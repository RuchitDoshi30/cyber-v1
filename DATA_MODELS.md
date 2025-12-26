# Frontend Data Models

This document defines the **data structures (models)** used throughout the Cyber Forensics Investigation Dashboard frontend.

All pages and components must strictly follow these models.

---

## 1. Log Model

Represents a single forensic log entry.

```json
{
  "id": "string",
  "timestamp": "string",
  "source": "OS | App | Server | IoT",
  "severity": "Info | Warning | Critical",
  "message": "string",
  "attackType": "string (optional)"
}

2. Log Detail Model
Extended view of a log entry (used in modal or side panel).

{
  "id": "string",
  "timestamp": "string",
  "source": "string",
  "severity": "string",
  "message": "string",
  "metadata": {
    "host": "string",
    "ipAddress": "string",
    "process": "string"
  }
}

Notes
Metadata fields are optional

Metadata may be static or dummy

3. Anomaly Model
Represents a detected suspicious event.

{
  "anomalyId": "string",
  "description": "string",
  "severity": "Low | Medium | High",
  "confidenceScore": "number",
  "relatedLogIds": ["string"]
}
Notes
Confidence score is visual only

No calculation required

4. Correlation Group Model
Represents a group of related events.

{
  "groupId": "string",
  "title": "string",
  "explanation": "string",
  "logIds": ["string"]
}
Notes
Used in AI Insights page

Explanation text is static or dummy

5. Dashboard Metrics Model
Used for summary cards and charts.

{
  "totalLogs": "number",
  "logSources": {
    "OS": "number",
    "App": "number",
    "Server": "number",
    "IoT": "number"
  },
  "anomaliesDetected": "number",
  "correlatedEvents": "number",
  "verifiedLogsPercentage": "number"
}
6. Attack Type Model (String Enum)
Used in Log Model extended view.

- Brute Force
- Unauthorized Access
- Data Exfiltration
- Malware Activity
- Rate Limiting Abuse

7. Report Configuration Model
Represents report generation options.

{
  "includeLogs": "boolean",
  "includeAnomalies": "boolean",
  "includeTimeline": "boolean",
  "exportFormat": "PDF | CSV | JSON"
}
7. Activity Timeline Model (Optional)
Used for forensic timeline visualization.

{
  "eventId": "string",
  "timestamp": "string",
  "eventType": "string",
  "description": "string",
  "severity": "string"
}
🔒 Forensics Data Rules
No data mutation allowed

Logs cannot be edited or deleted

All actions are view-only

Data integrity is implied via UI labels

✅ Model Consistency Rule
If a field is not defined in this document:

It must NOT be introduced

It must NOT be inferred

It must NOT be used in components

This rule is mandatory.

