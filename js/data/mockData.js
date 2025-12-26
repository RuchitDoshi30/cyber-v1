// Mock data for Cyber Forensics Investigation Dashboard
// All data is static/dummy as per project requirements

const MOCK_DATA = {
    // Dashboard metrics
    metrics: {
        totalLogs: 1250,
        logSources: {
            OS: 500,
            App: 350,
            Server: 250,
            IoT: 150
        },
        anomaliesDetected: 247,
        correlatedEvents: 89,
        verifiedLogsPercentage: 98.7
    },

    // Sample logs
    logs: [
        {
            id: "LOG001",
            timestamp: "2024-01-15 14:32:18",
            source: "Server",
            severity: "Critical",
            message: "Multiple failed login attempts detected",
            attackType: "Brute Force"
        },
        {
            id: "LOG002",
            timestamp: "2024-01-15 14:28:45",
            source: "IoT",
            severity: "Warning",
            message: "Unusual data transfer pattern",
            attackType: "Data Exfiltration"
        },
        {
            id: "LOG003",
            timestamp: "2024-01-15 14:15:22",
            source: "Server",
            severity: "Critical",
            message: "Unauthorized access attempt",
            attackType: "Unauthorized Access"
        },
        {
            id: "LOG004",
            timestamp: "2024-01-15 14:05:11",
            source: "App",
            severity: "Info",
            message: "Rate limit exceeded",
            attackType: "Rate Limiting Abuse"
        },
        {
            id: "LOG005",
            timestamp: "2025-01-15 11:45:19",
            source: "IoT",
            severity: "Warning",
            message: "Sensor device reporting abnormal temperature readings"
        },
        {
            id: "LOG006",
            timestamp: "2025-01-15 12:03:45",
            source: "Server",
            severity: "Critical",
            message: "Unauthorized file access attempt detected"
        },
        {
            id: "LOG007",
            timestamp: "2025-01-15 13:22:11",
            source: "OS",
            severity: "Info",
            message: "System update completed successfully"
        },
        {
            id: "LOG008",
            timestamp: "2025-01-15 14:15:30",
            source: "App",
            severity: "Warning",
            message: "API rate limit exceeded for client 10.0.0.25"
        },
        {
            id: "LOG009",
            timestamp: "2025-01-15 15:33:12",
            source: "Server",
            severity: "Info",
            message: "Database backup completed"
        },
        {
            id: "LOG010",
            timestamp: "2025-01-15 16:44:55",
            source: "IoT",
            severity: "Critical",
            message: "IoT device lost connection - potential security breach"
        },
        {
            id: "LOG011",
            timestamp: "2025-01-15 17:12:08",
            source: "OS",
            severity: "Warning",
            message: "High CPU usage detected on server-prod-01"
        },
        {
            id: "LOG012",
            timestamp: "2025-01-15 18:05:22",
            source: "App",
            severity: "Info",
            message: "User logout event recorded"
        }
    ],

    // Log details with metadata
    logDetails: {
        "LOG001": {
            id: "LOG001",
            timestamp: "2025-01-15 10:22:11",
            source: "OS",
            severity: "Critical",
            message: "Multiple failed login attempts detected from IP 192.168.1.100",
            metadata: {
                host: "server-01",
                ipAddress: "192.168.1.100",
                process: "ssh"
            }
        },
        "LOG002": {
            id: "LOG002",
            timestamp: "2025-01-15 10:22:45",
            source: "OS",
            severity: "Critical",
            message: "Successful login after multiple failures from IP 192.168.1.100",
            metadata: {
                host: "server-01",
                ipAddress: "192.168.1.100",
                process: "ssh"
            }
        },
        "LOG003": {
            id: "LOG003",
            timestamp: "2025-01-15 10:25:33",
            source: "Server",
            severity: "Warning",
            message: "Unusual database query pattern detected",
            metadata: {
                host: "db-server-02",
                ipAddress: "10.0.0.50",
                process: "mysqld"
            }
        },
        "LOG006": {
            id: "LOG006",
            timestamp: "2025-01-15 12:03:45",
            source: "Server",
            severity: "Critical",
            message: "Unauthorized file access attempt detected",
            metadata: {
                host: "file-server-01",
                ipAddress: "10.0.0.75",
                process: "apache"
            }
        },
        "LOG010": {
            id: "LOG010",
            timestamp: "2025-01-15 16:44:55",
            source: "IoT",
            severity: "Critical",
            message: "IoT device lost connection - potential security breach",
            metadata: {
                host: "iot-gateway-03",
                ipAddress: "172.16.0.10",
                process: "iot-agent"
            }
        }
    },

    // Detected anomalies
    anomalies: [
        {
            anomalyId: "ANOM001",
            title: "Authentication Anomaly",
            description: "Multiple failed login attempts detected from single IP address",
            severity: "Critical",
            confidenceScore: 0.94,
            relatedLogIds: ["LOG001", "LOG002"],
            affectedSystems: ["Server-Auth-01", "Server-Auth-02"],
            recommendedAction: "Implement IP-based rate limiting and investigate source IP 192.168.1.45"
        },
        {
            anomalyId: "ANOM002",
            title: "Data Exfiltration Pattern",
            description: "Unusual outbound data transfer pattern detected on IoT device",
            severity: "Warning",
            confidenceScore: 0.78,
            relatedLogIds: ["LOG003"],
            affectedSystems: ["IoT-Cam-45", "IoT-Sensor-12"],
            recommendedAction: "Review network traffic logs and isolate affected devices"
        },
        {
            anomalyId: "ANOM003",
            title: "Privilege Escalation Attempt",
            description: "Unauthorized attempt to access admin-level database queries",
            severity: "Critical",
            confidenceScore: 0.91,
            relatedLogIds: ["LOG006"],
            affectedSystems: ["DB-Main-02"],
            recommendedAction: "Review user permissions and audit database access logs"
        },
        {
            anomalyId: "ANOM004",
            title: "Suspicious Process Execution",
            description: "Unusual process started during non-business hours",
            severity: "Warning",
            confidenceScore: 0.68,
            relatedLogIds: ["LOG010"],
            affectedSystems: ["Server-App-05"],
            recommendedAction: "Verify process legitimacy and check for malware signatures"
        }
    ],

    // Correlated events
    correlations: [
        {
            groupId: "CASE001",
            title: "Suspicious Login Session",
            explanation: "Multiple failed login attempts followed by a successful login from the same IP address within 1 minute, indicating potential brute force attack",
            analysisText: "Multiple failed login attempts followed by a successful login from the same IP address within 1 minute, indicating potential brute force attack",
            logIds: ["LOG001", "LOG002"],
            confidence: 0.88,
            eventCount: 2,
            timeRange: "Last 15 mins",
            sources: ["Server", "Auth System"]
        },
        {
            groupId: "CASE002",
            title: "Data Exfiltration Attempt",
            explanation: "Unusual database queries followed by unauthorized file access suggests coordinated data theft attempt",
            analysisText: "Unusual database queries followed by unauthorized file access suggests coordinated data theft attempt",
            logIds: ["LOG003", "LOG006"],
            confidence: 0.92,
            eventCount: 2,
            timeRange: "Last 1 hour",
            sources: ["Database", "File Server"]
        },
        {
            groupId: "CASE003",
            title: "IoT Security Breach",
            explanation: "IoT device disconnection during active session may indicate device compromise or network intrusion",
            analysisText: "IoT device disconnection during active session may indicate device compromise or network intrusion",
            logIds: ["LOG010"],
            confidence: 0.75,
            eventCount: 1,
            timeRange: "Last 30 mins",
            sources: ["IoT Gateway"]
        },
        {
            groupId: "CASE004",
            title: "API Abuse Pattern",
            explanation: "Repeated rate limit violations from same client suggests automated attack or misconfigured application",
            analysisText: "Repeated rate limit violations from same client suggests automated attack or misconfigured application",
            logIds: ["LOG008"],
            confidence: 0.65,
            eventCount: 5,
            timeRange: "Last 4 hours",
            sources: ["API Gateway", "Application"]
        }
    ],

    // Investigation Timeline
    timeline: [
        {
            title: "Logs uploaded successfully",
            description: "Server-Auth-01.log (2.4 MB) - 15,432 entries",
            time: "5 minutes ago",
            status: "success"
        },
        {
            title: "AI correlation completed",
            description: "Found 23 correlated events across 3 log sources",
            time: "12 minutes ago",
            status: "info"
        },
        {
            title: "Chain of custody verified",
            description: "Hash verified for all uploaded logs",
            time: "18 minutes ago",
            status: "verified"
        }
    ]
};
