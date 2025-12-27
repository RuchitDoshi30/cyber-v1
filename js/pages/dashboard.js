// Dashboard Page - Overview of system activity

const DashboardPage = {
    charts: {}, // Store chart instances to destroy them if needed

    async render() {
        // Ensure data is available
        const metrics = await ApiService.getDashboardMetrics();
        const timeline = MOCK_DATA.timeline;
        const recentAnomalies = MOCK_DATA.anomalies.slice(0, 4);

        return `
            <div class="max-w-7xl mx-auto space-y-6">
                <!-- Header -->
                <div class="page-header mb-8 border-none">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm">Real-time forensics investigation overview</p>
                </div>
                
                <!-- Row 1: Investigation Status & Summary Cards -->
                <div class="mb-6">
                    ${Components.createInvestigationProgress(1)} <!-- Feature 5: Workflow Tracking -->
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${Components.createSummaryCard('Total Logs Ingested', metrics.totalLogs.toLocaleString(), '+12.5% from last hour', '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s8-1.79 8-4"></path></svg>', 'text-gray-400')}
                    ${Components.createSummaryCard('Anomalies Detected', metrics.anomaliesDetected, '+8 new from last hour', '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>', 'text-yellow-500')}
                    ${Components.createSummaryCard('Correlated Events', metrics.correlatedEvents, '23 cases from last hour', '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>', 'text-gray-400')}
                    ${Components.createSummaryCard('Verified Logs', metrics.verifiedLogsPercentage + '%', 'Chain verified from last hour', '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>', 'text-gray-400')}
                </div>

                <!-- Row 2: Events Timeline (Line Chart) -->
                <div class="relative">
                    ${Components.createChartContainer('chart-timeline', 'Events over Time', '⚠️ Suspected Incident Window Detected: 14:00 - 16:00 (Spike Analysis)', '300px', 'w-full')}
                    <!-- Feature 2: Highlighting Annotation (Simulated via simple badge over chart or description) -->
                </div>

                <!-- Row 3: Sources & Types -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${Components.createChartContainer('chart-sources', 'Events per Log Source', 'System production volume', '300px')}
                    ${Components.createChartContainer('chart-types', 'Event Type Distribution', 'High-level system health', '300px')}
                </div>

                 <!-- Row 4: Top Entities -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${Components.createChartContainer('chart-top-ips', 'Top IP Addresses', 'Most active suspicious IPs', '300px')}
                    ${Components.createChartContainer('chart-top-users', 'Top User Accounts', 'Potentially compromised users', '300px')}
                </div>
                
                <!-- Row 5: Split View (Recent Anomalies + Timeline) -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Recent Anomalies -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Recent Anomalies</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Latest detected security events</p>
                        </div>
                         <div class="space-y-1">
                            ${recentAnomalies.map(anomaly => {
            const relLogId = anomaly.relatedLogIds[0];
            const log = MOCK_DATA.logs.find(l => l.id === relLogId) || { message: anomaly.description, severity: anomaly.severity, id: relLogId, timestamp: 'N/A' };
            return Components.createAnomalyListItem(anomaly, log);
        }).join('')}
                        </div>
                    </div>

                    <!-- Investigation Timeline -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Investigation Timeline</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Recent activity and access logs</p>
                        </div>
                        <div class="mt-4">
                            ${timeline.map(item => Components.createTimelineItem(item)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        // Theme Colors
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#9ca3af' : '#4b5563'; // gray-400 : gray-600
        const gridColor = isDark ? '#374151' : '#e5e7eb'; // gray-700 : gray-200

        const isMobile = window.innerWidth < 768;

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: isMobile ? 'bottom' : 'top',
                    labels: { color: textColor, padding: 20, boxWidth: 12 }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    titleColor: isDark ? '#fff' : '#111827',
                    bodyColor: isDark ? '#d1d5db' : '#4b5563',
                    borderColor: gridColor,
                    borderWidth: 1,
                    padding: 10
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        maxRotation: isMobile ? 0 : 45,
                        autoSkip: true,
                        maxTicksLimit: isMobile ? 6 : 12
                    },
                    grid: { color: gridColor }
                },
                y: { ticks: { color: textColor }, grid: { color: gridColor } }
            },
            layout: { padding: isMobile ? { left: 0, right: 0 } : { left: 0, right: 0 } }
        };

        const noAxisOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: isMobile ? 'bottom' : 'top',
                    labels: { color: textColor, padding: 20, boxWidth: 12 }
                }
            }
        };

        // 1. Events Timeline (Data Aggregation)
        // Group logs by hour (mock logic)
        const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        const dataPoints = hours.map(() => Math.floor(Math.random() * 50) + 10); // Mock distribution
        // Insert a spike
        dataPoints[6] = 120; // Spike at 14:00

        new Chart(document.getElementById('chart-timeline'), {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Total Events',
                    data: dataPoints,
                    borderColor: '#3b82f6', // Blue-500
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: commonOptions
        });

        // 2. Log Sources (Horizontal Bar)
        const sources = MOCK_DATA.metrics.logSources;
        new Chart(document.getElementById('chart-sources'), {
            type: 'bar',
            data: {
                labels: Object.keys(sources),
                datasets: [{
                    label: 'Event Count',
                    data: Object.values(sources),
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
                    borderRadius: 4
                }]
            },
            options: { ...commonOptions, indexAxis: 'y' }
        });

        // 3. Event Types (Donut)
        // Derived from severity for simplicity
        const severities = MOCK_DATA.logs.reduce((acc, log) => {
            acc[log.severity] = (acc[log.severity] || 0) + 1;
            return acc;
        }, {});

        new Chart(document.getElementById('chart-types'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(severities),
                datasets: [{
                    data: Object.values(severities),
                    backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6'], // Warning, Critical, Info colors
                    borderWidth: 0
                }]
            },
            options: noAxisOptions
        });

        // 4. Top IPs (Bar)
        // Aggregate from LogDetails
        const ipCounts = {};
        Object.values(MOCK_DATA.logDetails).forEach(detail => {
            const ip = detail.metadata.ipAddress;
            ipCounts[ip] = (ipCounts[ip] || 0) + 1;
        });
        // Add some mock IPs to fill chart
        ipCounts['192.168.1.45'] = 12;
        ipCounts['10.0.0.88'] = 8;
        ipCounts['172.16.0.5'] = 5;

        new Chart(document.getElementById('chart-top-ips'), {
            type: 'bar',
            data: {
                labels: Object.keys(ipCounts),
                datasets: [{
                    label: 'Events',
                    data: Object.values(ipCounts),
                    backgroundColor: '#ef4444', // Red for suspicious
                    borderRadius: 4
                }]
            },
            options: commonOptions
        });

        // 5. Top Users (Bar)
        // Mock data since 'user' isn't explicitly in MOCK_DATA.logs consistently
        new Chart(document.getElementById('chart-top-users'), {
            type: 'bar',
            data: {
                labels: ['admin', 'service_acct', 'jane_doe', 'root', 'web_user'],
                datasets: [{
                    label: 'Activity Count',
                    data: [45, 32, 28, 15, 12],
                    backgroundColor: '#8b5cf6', // Purple
                    borderRadius: 4
                }]
            },
            options: commonOptions
        });
    }
};
