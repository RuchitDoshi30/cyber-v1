# API Contract (Mocked / Simulated)

This document defines the **expected API interfaces** for the Cyber Forensics Investigation Dashboard.

These APIs are **mocked or simulated**.
No real backend implementation is required.

Frontend components must assume responses follow this structure.

---

## General Rules

- All APIs are READ-ONLY
- No mutation of logs allowed
- Responses may be mocked using static JSON
- API calls may be replaced with local data services

---

## 1. Fetch Dashboard Metrics

### Endpoint
GET /api/dashboard/metrics

### Response
```json
{
  "totalLogs": 1250,
  "logSources": {
    "OS": 500,
    "App": 350,
    "Server": 250,
    "IoT": 150
  },
  "anomaliesDetected": 12,
  "correlatedEvents": 4
}

Used By
Dashboard summary cards

Dashboard charts

2. Fetch Logs
Endpoint
GET /api/logs

Query Parameters 
source

severity

startDate

endDate

keyword

Response
[
  {
    "id": "LOG001",
    "timestamp": "2025-01-01 10:22:11",
    "source": "OS",
    "severity": "Critical",
    "message": "Multiple failed login attempts detected"
  }
]
Used By
Investigate Logs page

Search & Filter page

3. Fetch Log Details
Endpoint
GET /api/logs/{logId}

Response
{
  "id": "LOG001",
  "timestamp": "2025-01-01 10:22:11",
  "source": "OS",
  "severity": "Critical",
  "message": "Multiple failed login attempts detected",
  "metadata": {
    "host": "server-01",
    "ipAddress": "192.168.1.10",
    "process": "ssh"
  }
}
Used By
Log detail modal / panel

4. Fetch Anomalies
Endpoint
GET /api/anomalies

Response
[
  {
    "anomalyId": "ANOM001",
    "description": "Unusual login activity detected",
    "severity": "High",
    "confidenceScore": 0.92,
    "relatedLogIds": ["LOG001", "LOG002"]
  }
]
Used By
AI Insights page

5. Fetch Correlated Events
Endpoint
GET /api/correlations

Response
[
  {
    "groupId": "CASE001",
    "title": "Suspicious Login Session",
    "explanation": "Multiple failed logins followed by a successful login",
    "logIds": ["LOG001", "LOG002", "LOG003"]
  }
]
Used By
AI Insights page

6. Upload Logs (Simulated)
Endpoint
POST /api/logs/upload

Request
Multipart file upload

Response
{
  "status": "Processing"
}
Notes
Upload progress may be simulated

Parsing is NOT required

7. Generate Report (Simulated)
Endpoint
POST /api/reports/generate

Request
{
  "includeLogs": true,
  "includeAnomalies": true,
  "includeTimeline": false,
  "exportFormat": "PDF"
}
Response
{
  "downloadUrl": "/static/report.pdf"
}
Notes
File may be static

Button click simulation is acceptable

🚫 Forbidden API Behavior
No DELETE endpoints

No UPDATE endpoints

No authentication headers required

No real-time streaming

✅ Contract Consistency Rule
If an API:

Is not defined here

Or returns fields not defined here

→ It must NOT be used.

