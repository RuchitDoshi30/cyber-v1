// API Service - Mocked API calls using static data
// All APIs are read-only as per project requirements

const ApiService = {
    // Simulate API delay
    delay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // GET /api/dashboard/metrics
    async getDashboardMetrics() {
        await this.delay();
        return MOCK_DATA.metrics;
    },

    // GET /api/logs
    async getLogs(filters = {}) {
        await this.delay();
        let logs = [...MOCK_DATA.logs];

        // Apply client-side filtering
        if (filters.source && filters.source !== 'all') {
            logs = logs.filter(log => log.source === filters.source);
        }

        if (filters.severity && filters.severity !== 'all') {
            logs = logs.filter(log => log.severity === filters.severity);
        }

        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            logs = logs.filter(log => 
                log.message.toLowerCase().includes(keyword) ||
                log.id.toLowerCase().includes(keyword)
            );
        }

        if (filters.startDate || filters.endDate) {
            // Simple date filtering (dummy implementation)
            // In real scenario, this would parse and compare dates
        }

        return logs;
    },

    // GET /api/logs/{logId}
    async getLogDetails(logId) {
        await this.delay();
        // Return detailed log if available, otherwise return basic log with minimal metadata
        if (MOCK_DATA.logDetails[logId]) {
            return MOCK_DATA.logDetails[logId];
        }
        
        const basicLog = MOCK_DATA.logs.find(log => log.id === logId);
        if (basicLog) {
            return {
                ...basicLog,
                metadata: {
                    host: "N/A",
                    ipAddress: "N/A",
                    process: "N/A"
                }
            };
        }
        
        return null;
    },

    // GET /api/anomalies
    async getAnomalies() {
        await this.delay();
        return MOCK_DATA.anomalies;
    },

    // GET /api/correlations
    async getCorrelations() {
        await this.delay();
        return MOCK_DATA.correlations;
    },

    // POST /api/logs/upload (Simulated)
    async uploadLogs(file) {
        await this.delay(1500);
        // Simulate upload process
        return {
            status: "Success",
            message: `File "${file.name}" uploaded successfully`,
            logsProcessed: Math.floor(Math.random() * 100) + 50
        };
    },

    // POST /api/reports/generate (Simulated)
    async generateReport(options) {
        await this.delay(1000);
        return {
            downloadUrl: `/static/forensics-report.${options.exportFormat.toLowerCase()}`,
            format: options.exportFormat
        };
    }
};
