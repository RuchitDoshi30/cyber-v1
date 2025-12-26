// AI Insights Page - Anomaly detection and event correlation

// AI Insights Page - Anomaly detection and event correlation

const InsightsPage = {
    anomalies: [],
    correlations: [],

    async render() {
        this.anomalies = await ApiService.getAnomalies();
        this.correlations = await ApiService.getCorrelations();

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

                    <!-- Correlated Events List -->
                    <div id="content-correlations" class="hidden">
                         ${this.correlations.map(correlation => Components.createCorrelationCard(correlation)).join('')}
                    </div>
                </div>
            </div>
        `;
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
    }
};

// Expose to window for inline onclick handlers
window.InsightsPage = InsightsPage;
