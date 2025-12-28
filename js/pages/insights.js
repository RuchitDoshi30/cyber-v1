// AI Insights Page - Anomaly detection and event correlation

// AI Insights Page - Anomaly detection and event correlation

const InsightsPage = {
    anomalies: [],
    correlations: [],

    async render() {
        this.anomalies = await ApiService.getAnomalies();
        this.correlations = await ApiService.getCorrelations();

        // Ensure anomalies have IDs for interaction
        this.anomalies.forEach((a, i) => { if (!a.id) a.id = `anom-${i}`; });

        // Calculate Average Confidence
        const totalConfidence = this.anomalies.reduce((acc, curr) => acc + curr.confidenceScore, 0);
        const avgConfidence = this.anomalies.length > 0 ? ((totalConfidence / this.anomalies.length) * 100).toFixed(0) : 0;

        return `
            <div class="max-w-7xl mx-auto space-y-8">
                <!-- Page Header -->
                <div class="pb-2">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Insights</h1>
                    <p class="text-gray-600 dark:text-gray-400">AI-powered anomaly detection and event correlation</p>
                </div>

                <!-- Summary Cards Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Anomalies Detected -->
                    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-sm">
                        <div class="absolute top-6 right-6 text-yellow-500">
                             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Anomalies Detected</h3>
                        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">${this.anomalies.length}</div>
                        <p class="text-xs text-gray-500">2 critical alerts</p>
                    </div>

                    <!-- Correlated Events -->
                    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-sm">
                        <div class="absolute top-6 right-6 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                        </div>
                        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Correlated Events</h3>
                        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">${this.correlations.length}</div>
                        <p class="text-xs text-gray-500">46 total events linked</p>
                    </div>

                    <!-- Average Confidence -->
                    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-sm">
                        <div class="absolute top-6 right-6 text-green-500">
                             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        </div>
                        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Average Confidence</h3>
                        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">${avgConfidence}%</div>
                        <p class="text-xs text-gray-500">High accuracy detection</p>
                    </div>
                </div>

                <!-- Anomaly Scores Chart -->
                ${Components.createChartContainer('chart-anomaly-scores', 'Anomaly Scores per Entity', 'Visualizing AI confidence per affected system', '350px', 'w-full')}

                <!-- Tabs & Content -->
                <div>
                     <!-- Tabs -->
                    <div class="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800">
                        <button id="tab-anomalies" onclick="InsightsPage.switchTab('anomalies')" 
                            class="px-4 py-2 text-sm font-bold rounded-t-lg border-t border-l border-r relative -mb-[1px] transition-colors
                            bg-white dark:bg-gray-800 text-blue-600 dark:text-white border-gray-200 dark:border-gray-700">
                            Detected Anomalies
                        </button>
                        <button id="tab-correlations" onclick="InsightsPage.switchTab('correlations')" 
                            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                            text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-transparent">
                            Correlated Events
                        </button>
                    </div>

                    <!-- Anomaly List -->
                    <div id="content-anomalies">
                         ${this.anomalies.map(anomaly => Components.createDetailedAnomalyCard(anomaly)).join('')}
                    </div>

                    <!-- Correlated Events List (Feature 3 - Enhanced Visualization) -->
                    <div id="content-correlations" class="hidden">
                         ${this.correlations.map(correlation => {
            // Feature 3: Timeline Preview & Case Details
            const timelineWidth = Math.min(correlation.eventCount * 20, 100);
            return `
                                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg mb-6 last:mb-0">
                                    <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                        <div>
                                            <div class="flex items-center gap-2 mb-1">
                                                <span class="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded uppercase">
                                                    Case: ${correlation.groupId}
                                                </span>
                                                <span class="text-xs text-gray-500">${correlation.timeRange}</span>
                                            </div>
                                            <h3 class="text-lg font-bold text-gray-900 dark:text-white">${correlation.title}</h3>
                                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${correlation.explanation}</p>
                                        </div>
                                        <div class="flex gap-2">
                                            <div class="text-center px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                                <span class="block text-xl font-bold text-gray-900 dark:text-white">${correlation.eventCount}</span>
                                                <span class="text-[10px] text-gray-500 uppercase tracking-wide">Events</span>
                                            </div>
                                            <div class="text-center px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                                <span class="block text-xl font-bold text-blue-600 dark:text-blue-400">${(correlation.confidence * 100).toFixed(0)}%</span>
                                                <span class="text-[10px] text-gray-500 uppercase tracking-wide">Confidence</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Feature 3: Small Timeline Preview -->
                                    <div class="mb-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <h4 class="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Event Sequence</h4>
                                        <div class="relative h-8 w-full bg-gray-50 dark:bg-gray-900/30 rounded-full flex items-center px-4 overflow-hidden">
                                            <div class="absolute left-0 w-full h-0.5 bg-gray-300 dark:bg-gray-600 z-0"></div>
                                            <!-- Simulated events dots -->
                                            <div class="relative z-10 w-2 h-2 rounded-full bg-blue-500 border border-white dark:border-gray-800" style="left: 10%"></div>
                                            <div class="relative z-10 w-2 h-2 rounded-full bg-blue-500 border border-white dark:border-gray-800" style="left: 30%"></div>
                                            <div class="relative z-10 w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 shadow-sm" style="left: 55%" title="Primary Anomaly"></div>
                                            <div class="relative z-10 w-2 h-2 rounded-full bg-blue-500 border border-white dark:border-gray-800" style="left: 80%"></div>
                                        </div>
                                        <div class="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                                            <span>Start</span>
                                            <span>+15m</span>
                                            <span>+30m</span>
                                            <span>End</span>
                                        </div>
                                    </div>

                                    <div class="flex flex-wrap gap-2 text-xs">
                                        <span class="text-gray-500">Sources:</span>
                                        ${correlation.sources.map(s => `<span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">${s}</span>`).join('')}
                                    </div>
                                </div>
                             `;
        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        // Theme Colors
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#9ca3af' : '#4b5563';
        const gridColor = isDark ? '#374151' : '#e5e7eb';

        const isMobile = window.innerWidth < 768;

        // Data Prep
        // Map Anomalies to { label: SystemName, value: Score, color: SeverityColor }
        const labels = [];
        const data = [];
        const bgColors = [];

        this.anomalies.forEach(a => {
            if (a.affectedSystems && a.affectedSystems.length) {
                a.affectedSystems.forEach(sys => {
                    labels.push(sys);
                    data.push(a.confidenceScore * 100); // 0-100 scale
                    bgColors.push(a.severity === 'Critical' ? '#ef4444' : a.severity === 'Warning' ? '#f59e0b' : '#3b82f6');
                });
            }
        });

        const ctx = document.getElementById('chart-anomaly-scores');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Confidence Score (%)',
                        data: data,
                        backgroundColor: bgColors,
                        borderRadius: 4,
                        barThickness: isMobile ? 20 : 40
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { backgroundColor: isDark ? '#1f2937' : '#ffffff', titleColor: isDark ? '#fff' : '#111827', bodyColor: isDark ? '#d1d5db' : '#4b5563', borderColor: gridColor, borderWidth: 1 }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: textColor,
                                maxRotation: isMobile ? 90 : 0, // Rotate on mobile if many labels, or auto
                                autoSkip: true
                            },
                            grid: { color: gridColor, display: false }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: { color: textColor },
                            grid: { color: gridColor },
                            title: { display: true, text: 'AI Confidence Score', color: textColor }
                        }
                    }
                }
            });
        }
    },

    switchTab(tabName) {
        const tabAnomalies = document.getElementById('tab-anomalies');
        const tabCorrelations = document.getElementById('tab-correlations');
        const contentAnomalies = document.getElementById('content-anomalies');
        const contentCorrelations = document.getElementById('content-correlations');

        // Styles
        const activeClasses = ['bg-white', 'dark:bg-gray-800', 'text-blue-600', 'dark:text-white', 'border-gray-200', 'dark:border-gray-700', 'border-t', 'border-l', 'border-r', 'font-bold'];
        const inactiveClasses = ['text-gray-500', 'hover:text-gray-700', 'dark:hover:text-gray-300', 'border-transparent', 'font-medium'];

        // Helper to set active/inactive
        const setActive = (el) => {
            el.classList.remove(...inactiveClasses);
            el.classList.add(...activeClasses);
        };
        const setInactive = (el) => {
            el.classList.remove(...activeClasses);
            el.classList.add(...inactiveClasses);
        };

        if (tabName === 'anomalies') {
            setActive(tabAnomalies);
            setInactive(tabCorrelations);
            contentAnomalies.classList.remove('hidden');
            contentCorrelations.classList.add('hidden');
        } else {
            setInactive(tabAnomalies);
            setActive(tabCorrelations);
            contentAnomalies.classList.add('hidden');
            contentCorrelations.classList.remove('hidden');
        }
    },

    toggleGraph(anomalyId) {
        const container = document.getElementById(`graph-container-${anomalyId}`);
        const arrow = document.getElementById(`arrow-${anomalyId}`);

        if (container && arrow) {
            const isHidden = container.classList.contains('hidden');

            if (isHidden) {
                container.classList.remove('hidden');
                arrow.classList.add('rotate-180');

                // Render Graph if first time
                const anomaly = this.anomalies.find(a => a.id === anomalyId);
                if (anomaly) {
                    Components.renderEnhancedForceGraph(`graph-container-${anomalyId}`, anomaly);
                }
            } else {
                container.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            }
        }
    }
};

// Expose to window for inline onclick handlers
window.InsightsPage = InsightsPage;
