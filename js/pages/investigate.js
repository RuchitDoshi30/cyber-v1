// Investigate Logs Page - Primary investigation workspace

const InvestigatePage = {
    logs: [],
    currentPage: 1,
    logsPerPage: 10,
    activeContext: null, // { ids: string[], description: string, severity: string }

    setContext(context) {
        this.activeContext = context;
        this.currentPage = 1;
    },

    clearContext() {
        this.activeContext = null;
        this.currentPage = 1;
        this.render().then(html => {
            document.getElementById('page-content').innerHTML = html;
            this.afterRender();
        });
    },

    async render() {
        let allLogs = await ApiService.getLogs();

        // Apply Context Filter
        if (this.activeContext && this.activeContext.ids) {
            this.logs = allLogs.filter(log => this.activeContext.ids.includes(log.id));
        } else {
            this.logs = allLogs;
        }

        // Context Banner
        const contextBanner = this.activeContext ? `
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
                <div class="flex items-start gap-3">
                    <div class="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-blue-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide">Anomaly Drill-Down</h3>
                        <p class="text-sm text-blue-800 dark:text-blue-200">
                            Showing evidence for: <span class="font-semibold italic">"${this.activeContext.description}"</span>
                        </p>
                    </div>
                </div>
                <button onclick="investigatePage.clearContext()" class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm whitespace-nowrap">
                    Clear Filter
                </button>
            </div>
        ` : '';

        return `
            <div class="max-w-7xl mx-auto space-y-6">
                <!-- Context Banner -->
                ${contextBanner}

                <!-- Page Header -->
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Investigate Logs</h1>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">
                            ${this.logs.length} ${this.activeContext ? 'filtered' : ''} logs available for investigation
                        </p>
                    </div>
                    <div>
                        <button class="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Export Current View
                        </button>
                    </div>
                </div>

                <!-- Logs Table Container -->
                <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-800">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Log Entries</h2>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Click on any row for detailed information</p>
                    </div>
                    ${this.logs.length > 0 ? this.renderLogsTable() : Components.createEmptyState('No logs available', '📋')}
                </div>
                
                ${this.logs.length > 0 ? this.renderPagination() : ''}
            </div>
        `;
    },

    renderLogsTable() {
        const startIndex = (this.currentPage - 1) * this.logsPerPage;
        const endIndex = startIndex + this.logsPerPage;
        const paginatedLogs = this.logs.slice(startIndex, endIndex);

        return `
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead class="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Severity</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Message</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attack Type</th>
                            <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-800" id="logsTableBody">
                        ${paginatedLogs.map(log => Components.createInvestigateTableRow(log)).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderPagination() {
        const totalPages = Math.ceil(this.logs.length / this.logsPerPage);

        if (totalPages <= 1) return '';

        return `
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 px-2">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span class="font-medium text-gray-900 dark:text-white">${(this.currentPage - 1) * this.logsPerPage + 1}</span> to <span class="font-medium text-gray-900 dark:text-white">${Math.min(this.currentPage * this.logsPerPage, this.logs.length)}</span> of <span class="font-medium text-gray-900 dark:text-white">${this.logs.length}</span> entries
                </div>
                <div class="flex items-center gap-2">
                    <button 
                        onclick="investigatePage.changePage(${this.currentPage - 1})" 
                        ${this.currentPage === 1 ? 'disabled' : ''}
                        class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium shadow-sm"
                    >
                        Previous
                    </button>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm shadow-md">
                        ${this.currentPage}
                    </button>
                    <button 
                        onclick="investigatePage.changePage(${this.currentPage + 1})" 
                        ${this.currentPage === totalPages ? 'disabled' : ''}
                        class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium shadow-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        `;
    },

    async afterRender() {
        // Add click handlers to table rows
        const rows = document.querySelectorAll('.table-row');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                const logId = row.dataset.logId;
                this.showLogDetails(logId);
            });
        });
    },

    async showLogDetails(logId) {
        const logDetail = await ApiService.getLogDetails(logId);
        if (logDetail) {
            const modalHtml = Components.createLogDetailModal(logDetail);
            document.getElementById('modal-container').innerHTML = modalHtml;
        }
    },

    async changePage(newPage) {
        const totalPages = Math.ceil(this.logs.length / this.logsPerPage);
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            await App.loadPage('investigate');
        }
    }
};

// Make it globally accessible for pagination buttons
window.investigatePage = InvestigatePage;
