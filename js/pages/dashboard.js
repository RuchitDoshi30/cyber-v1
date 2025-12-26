// Dashboard Page - Overview of system activity

const DashboardPage = {
    async render() {
        // Ensure data is available (in a real app this would come from the API service, here we use mockData directly via service if needed,
        // but let's assume ApiService returns what we need or we can structure it here)
        const metrics = await ApiService.getDashboardMetrics();
        // We'll treat mockData as our source of truth for the extended data not in generic metrics
        // In a real implementation ApiService would have methods for these
        const timeline = MOCK_DATA.timeline;
        const recentAnomalies = MOCK_DATA.anomalies.slice(0, 4);
        const logs = MOCK_DATA.logs;

        // Calculate source percentages for the bar charts
        const totalSourceLogs = Object.values(metrics.logSources).reduce((a, b) => a + b, 0);
        const sourceStats = [
            { name: 'Operating System', count: metrics.logSources['OS'], percent: Math.round((metrics.logSources['OS'] / totalSourceLogs) * 100) },
            { name: 'IoT Devices', count: metrics.logSources['IoT'], percent: Math.round((metrics.logSources['IoT'] / totalSourceLogs) * 100) },
            { name: 'Server Logs', count: metrics.logSources['Server'], percent: Math.round((metrics.logSources['Server'] / totalSourceLogs) * 100) },
            { name: 'Applications', count: metrics.logSources['App'], percent: Math.round((metrics.logSources['App'] / totalSourceLogs) * 100) }
        ];

        return `
            <div class="max-w-7xl mx-auto space-y-6">
                <!-- Header -->
                <div class="page-header mb-8 border-none">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm">Real-time forensics investigation overview</p>
                </div>
                
                <!-- Row 1: Summary Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${Components.createSummaryCard(
            'Total Logs Ingested',
            metrics.totalLogs.toLocaleString(),
            '+12.5% from last hour',
            '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s8-1.79 8-4"></path></svg>',
            'text-gray-400'
        )}
                    ${Components.createSummaryCard(
            'Anomalies Detected',
            metrics.anomaliesDetected,
            '+8 new from last hour',
            '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
            'text-yellow-500'
        )}
                    ${Components.createSummaryCard(
            'Correlated Events',
            metrics.correlatedEvents,
            '23 cases from last hour',
            '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>',
            'text-gray-400'
        )}
                    ${Components.createSummaryCard(
            'Verified Logs',
            metrics.verifiedLogsPercentage + '%',
            'Chain verified from last hour',
            '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
            'text-gray-400'
        )}
                </div>
                
                <!-- Row 2: Split View (Sources + Anomalies) -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Left Panel: Log Sources -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
                        <div class="flex justify-between items-start mb-6">
                            <div>
                                <h2 class="text-lg font-bold text-gray-900 dark:text-white">Log Sources</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Distribution by source type</p>
                            </div>
                            <!-- Log Summary Dial Integration -->
                             <div class="hidden sm:block">
                                ${Components.createGauge(92, 'Overall Health')}
                             </div>
                        </div>
                        
                        <div class="space-y-1">
                            ${sourceStats.map(stat => Components.createLogSourceItem(stat.name, stat.count, stat.percent)).join('')}
                        </div>
                    </div>
                    
                    <!-- Right Panel: Recent Anomalies -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Recent Anomalies</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Latest detected security events</p>
                        </div>
                        
                         <div class="space-y-1">
                            ${recentAnomalies.map(anomaly => {
            // Find the log for this anomaly to get the message/severity
            // In a real app the anomaly object would likely contain this or join it
            const relLogId = anomaly.relatedLogIds[0];
            const log = logs.find(l => l.id === relLogId) || { message: anomaly.description, severity: anomaly.severity, id: relLogId, timestamp: 'N/A' };
            return Components.createAnomalyListItem(anomaly, log);
        }).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Row 3: Investigation Timeline -->
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
        `;
    },

    // Charts are removed in favor of CSS progress bars and timeline for this version
    async afterRender() {
        // No post-render actions needed for now
    }
};
