# Project Scope Definition

This document defines the **exact scope boundaries** of the Cyber Forensics Investigation Dashboard.

Anything not explicitly listed as “In Scope” must be treated as **out of scope**, even if technically feasible.

---

## ✅ In Scope (What MUST Be Implemented)

### 1. Frontend Application
- Single Page Application (SPA)
- Web-based user interface
- Desktop-first design (mobile responsiveness optional)

### 2. Investigation Workflow UI
- Dashboard overview
- Log upload interface
- Log investigation & viewing
- Search and filtering tools
- Anomaly and correlation visualization
- Report generation UI

### 3. Data Handling
- Static JSON or mocked data
- Hardcoded or simulated API responses
- No real-time data processing required

### 4. Visualization
- Tables for logs
- Charts for summaries
- Lists and grouped views for correlated events
- Timeline-style representations (static allowed)

### 5. Explainable AI (UI-Level Only)
- Textual explanations
- Confidence scores
- Highlighted correlations
- No real inference engine required

---

## ❌ Out of Scope (Explicitly Excluded)

### Backend & Infrastructure
- Databases
- REST or GraphQL APIs
- Authentication systems
- Cloud deployment
- File storage services

### Artificial Intelligence
- Machine learning models
- Anomaly detection algorithms
- Natural language processing engines
- Model training or evaluation

### Security Implementation
- Real encryption
- Hash generation
- Chain-of-custody enforcement
- Access control mechanisms

### Production Concerns
- Scalability
- Performance optimization
- Security hardening
- Error recovery systems

---

## ⚠️ Constraints

- The system may use **dummy or simulated data**
- Buttons may trigger placeholder actions
- Exports may be static files
- Backend responses may be mocked

These constraints are intentional and acceptable.

---

## 🎓 Academic Alignment

This scope aligns with:
- Cyber forensics investigation concepts
- Log analysis workflows
- Explainable AI presentation
- Reporting and documentation practices

The project prioritizes **conceptual correctness and usability** over technical depth.

---

## 🧭 Scope Enforcement Rule

If a feature:
- Is not visible in the UI
- Is not required to demonstrate investigation workflow
- Does not help explain forensic reasoning

→ It should NOT be implemented.

---

