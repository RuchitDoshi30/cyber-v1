// Search & Filter Page - Advanced log filtering

const SearchPage = {
    filters: {
        keyword: '',
        source: 'all',
        severity: 'all',
        startDate: '',
        endDate: ''
    },
    filteredLogs: [],

    async render() {
        return `
            <div class="max-w-7xl mx-auto space-y-8">
                <!-- Page Header -->
                <div class="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search & Filter</h1>
                    <p class="text-gray-500 dark:text-gray-400">Advanced log search and filtering</p>
                </div>
                
                <!-- Search Logs Card -->
                <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                    <div class="mb-6">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Search Logs</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Use keywords and filters to find specific log entries</p>
                    </div>

                    <!-- Search Row -->
                    <div class="flex gap-4 mb-6">
                        <div class="relative flex-1">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input 
                                type="text" 
                                id="keywordInput" 
                                placeholder="Search by keyword, IP address, user, etc..." 
                                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                            >
                        </div>
                        <button onclick="searchPage.applyFilters()" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors shadow-md">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            Search
                        </button>
                    </div>

                    <!-- Filter Row -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <!-- Log Source -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Log Source</label>
                            <select id="sourceFilter" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">All sources</option>
                                <option value="OS">OS</option>
                                <option value="App">App</option>
                                <option value="Server">Server</option>
                                <option value="IoT">IoT</option>
                            </select>
                        </div>
                        
                        <!-- Severity -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Severity</label>
                            <select id="severityFilter" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">All severities</option>
                                <option value="Info">Info</option>
                                <option value="Warning">Warning</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                        
                        <!-- Date From -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Date From</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                                <input type="date" id="startDateFilter" class="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 icon-invert-dark">
                            </div>
                        </div>
                        
                        <!-- Date To -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Date To</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                                <input type="date" id="endDateFilter" class="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 icon-invert-dark">
                            </div>
                        </div>
                    </div>

                    <!-- Active Filters Row -->
                    <div class="flex items-center gap-4">
                         <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                            Active filters:
                        </div>
                        <div id="activeFilters" class="flex flex-wrap gap-2"></div>
                        <button onclick="searchPage.resetFilters()" class="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-white transition-colors ml-auto hover:underline">Clear all</button>
                    </div>
                </div>

                <!-- Search Results Card -->
                <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-800">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Search Results</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1" id="resultCountSubtitle">0 log entries found</p>
                    </div>
                    <div id="searchResults" class="min-h-[200px]">
                         <!-- Results Table will be injected here -->
                         ${Components.createEmptyState('Apply filters to search logs', '🔍')}
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        // Initialize with all logs
        this.displayResults();
    },

    async applyFilters() {
        this.filters.keyword = document.getElementById('keywordInput').value.trim();
        this.filters.source = document.getElementById('sourceFilter').value;
        this.filters.severity = document.getElementById('severityFilter').value;
        this.filters.startDate = document.getElementById('startDateFilter').value;
        this.filters.endDate = document.getElementById('endDateFilter').value;

        this.filteredLogs = await ApiService.getLogs(this.filters);
        this.displayActiveFilters();
        this.displayResults();
    },

    resetFilters() {
        this.filters = {
            keyword: '',
            source: 'all',
            severity: 'all',
            startDate: '',
            endDate: ''
        };

        if (document.getElementById('keywordInput')) {
            document.getElementById('keywordInput').value = '';
            document.getElementById('sourceFilter').value = 'all';
            document.getElementById('severityFilter').value = 'all';
            document.getElementById('startDateFilter').value = '';
            document.getElementById('endDateFilter').value = '';
        }

        this.filteredLogs = [];
        this.displayActiveFilters();
        // Reset to initial state (show all logs or empty?) 
        // Logic: Reset usually clears filters, so we should fetch all logs again or just clear. 
        // Let's fetch all logs to be user friendly.
        this.applyFilters();
    },

    displayActiveFilters() {
        const container = document.getElementById('activeFilters');
        if (!container) return;

        const activeFilters = [];

        if (this.filters.keyword) {
            activeFilters.push(Components.createFilterChip('Keyword', this.filters.keyword, 'keyword'));
        }
        if (this.filters.source !== 'all') {
            activeFilters.push(Components.createFilterChip('Source', this.filters.source, 'source'));
        }
        if (this.filters.severity !== 'all') {
            activeFilters.push(Components.createFilterChip('Severity', this.filters.severity, 'severity'));
        }
        if (this.filters.startDate) {
            activeFilters.push(Components.createFilterChip('From', this.filters.startDate, 'startDate'));
        }
        if (this.filters.endDate) {
            activeFilters.push(Components.createFilterChip('To', this.filters.endDate, 'endDate'));
        }

        container.innerHTML = activeFilters.join('');
    },

    displayResults() {
        const resultsDiv = document.getElementById('searchResults');
        const countSubtitle = document.getElementById('resultCountSubtitle');

        if (countSubtitle) {
            countSubtitle.textContent = `${this.filteredLogs.length} log entries found`;
        }

        if (this.filteredLogs.length === 0) {
            if (resultsDiv) resultsDiv.innerHTML = Components.createEmptyState('No logs match your filters', '📭');
            return;
        }

        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead class="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Severity</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Message</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                            ${this.filteredLogs.map(log => this.createSearchTableRow(log)).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    },

    // Specific table row for search results (can reuse generic if identical)
    createSearchTableRow(log) {
        return `
            <tr class="table-row border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onclick="investigatePage.showLogDetails('${log.id}')">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-white font-mono">${log.timestamp}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-700 dark:text-gray-300">${log.source}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${Components.createSeverityBadge(log.severity)}
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xl">${log.message}</div>
                </td>
            </tr>
        `;
    }
};

// Global function for filter chip removal
window.removeFilter = function (type) {
    if (type === 'keyword') document.getElementById('keywordInput').value = '';
    else if (type === 'source') document.getElementById('sourceFilter').value = 'all';
    else if (type === 'severity') document.getElementById('severityFilter').value = 'all';
    else if (type.includes('Date')) document.getElementById(type + 'Filter').value = '';
    // Note: ID mapping needs to be exact. type matches filter keys.
    // 'startDate' -> id 'startDateFilter'

    // Better: Update model then UI
    if (type === 'startDate' || type === 'endDate') {
        document.getElementById(type + 'Filter').value = '';
    }

    searchPage.applyFilters();
};

window.searchPage = SearchPage;
