// Reports & Export Page - Generate investigation reports

const ReportsPage = {
    // Current selections state
    selections: {
        logs: true,
        anomalies: true,
        correlations: true,
        timeline: true,
        stats: true,
        ai: false
    },

    // Mock Report ID
    reportId: 'RPT-1766777110552',

    async render() {
        return `
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="mb-8 pl-1">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reports & Export</h1>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Generate and export comprehensive investigation reports</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Left Column: Configuration & Export -->
                    <div class="lg:col-span-2 space-y-6">
                        
                        <!-- Report Configuration Section -->
                        <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 shadow-sm"> 
                            <div class="mb-6">
                                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Report Configuration</h2>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Select sections to include in your report</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${Components.createSelectionCard('check-logs', 'Log Entries', 'Complete log data with timestamps and metadata', this.selections.logs)}
                                ${Components.createSelectionCard('check-anomalies', 'Detected Anomalies', 'AI-detected security anomalies and threats', this.selections.anomalies)}
                                ${Components.createSelectionCard('check-correlations', 'Correlated Events', 'Linked events and case analysis', this.selections.correlations)}
                                ${Components.createSelectionCard('check-timeline', 'Investigation Timeline', 'Chronological activity log with chain of custody', this.selections.timeline)}
                                ${Components.createSelectionCard('check-stats', 'Statistics & Charts', 'Visual summaries and data distribution', this.selections.stats)}
                                ${Components.createSelectionCard('check-ai', 'AI Recommendations', 'Suggested actions and remediation steps', this.selections.ai)}
                            </div>
                        </div>

                        <!-- Export Format Section -->
                        <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div class="mb-6">
                                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Export Format</h2>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Choose your preferred export format</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                ${Components.createExportCard('PDF Report',
            '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>',
            'Formatted document', "ReportsPage.handleExport('PDF')")}
                                
                                ${Components.createExportCard('CSV Export',
                '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
                'Spreadsheet data', "ReportsPage.handleExport('CSV')")}

                                ${Components.createExportCard('JSON Export',
                    '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>',
                    'Raw data format', "ReportsPage.handleExport('JSON')")}
                            </div>
                        </div>

                    </div>

                    <!-- Right Column: Summary & Chain of Custody -->
                    <div class="space-y-6">
                        
                        <!-- Report Summary Card -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg">
                            <div class="mb-4">
                                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Report Summary</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">What will be included</p>
                            </div>
                            <div id="summary-list" class="space-y-1">
                                <!-- Populated by updateSummary() -->
                            </div>
                        </div>

                        <!-- Chain of Custody Panel -->
                        ${Components.createChainOfCustodyPanel(this.reportId)}
                        
                        <!-- Integrity Note -->
                        <div class="bg-blue-900/10 rounded-lg p-4 border border-blue-500/20">
                            <p class="text-xs text-gray-400 leading-relaxed">
                                All exported reports include cryptographic hashes to ensure data integrity and maintain chain of custody for legal proceedings.
                            </p>
                        </div>

                        <div class="flex justify-end">
                             <!-- Branding removed -->
                        </div>

                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        this.updateSummary();
        this.addCheckboxListeners();
    },

    addCheckboxListeners() {
        const mapping = {
            'check-logs': 'logs',
            'check-anomalies': 'anomalies',
            'check-correlations': 'correlations',
            'check-timeline': 'timeline',
            'check-stats': 'stats',
            'check-ai': 'ai'
        };

        Object.keys(mapping).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', (e) => {
                    this.selections[mapping[id]] = e.target.checked;
                    this.updateSummary();
                });
            }
        });
    },

    updateSummary() {
        const container = document.getElementById('summary-list');
        if (!container) return;

        const items = [
            { label: 'Logs', checked: this.selections.logs },
            { label: 'Anomalies', checked: this.selections.anomalies },
            { label: 'Correlations', checked: this.selections.correlations },
            { label: 'Timeline', checked: this.selections.timeline },
            { label: 'Statistics', checked: this.selections.stats },
            { label: 'AI Recommendations', checked: this.selections.ai }
        ];

        container.innerHTML = items.map(item => Components.createSummaryItem(item.label, item.checked)).join('');
    },

    async handleExport(format) {
        // Create modal content for progress
        const modalContent = `
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" id="export-modal">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-100 dark:border-gray-700 transform transition-all scale-100">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 animate-pulse" id="export-icon">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2" id="export-title">Generating ${format} Report</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6" id="export-status">Initializing report engine...</p>
                        
                        <!-- Progress Bar -->
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6 overflow-hidden">
                            <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" style="width: 0%" id="export-progress"></div>
                        </div>

                        <!-- Actions (Hidden initially) -->
                        <div id="export-actions" class="hidden space-y-3">
                            <button id="download-btn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Download ${format} Report
                            </button>
                            <button onclick="document.getElementById('export-modal').remove()" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append modal to body
        document.body.insertAdjacentHTML('beforeend', modalContent);

        const progressBar = document.getElementById('export-progress');
        const statusText = document.getElementById('export-status');
        const titleText = document.getElementById('export-title');
        const iconDiv = document.getElementById('export-icon');
        const actionsDiv = document.getElementById('export-actions');
        const downloadBtn = document.getElementById('download-btn');

        // Step 1: Initialization
        await new Promise(r => setTimeout(r, 800));
        progressBar.style.width = '25%';
        statusText.textContent = 'Compiling selected data sections...';

        // Step 2: Formatting
        await new Promise(r => setTimeout(r, 1000));
        progressBar.style.width = '60%';
        statusText.textContent = `Formatting as ${format}...`;

        // Step 3: Hashing
        await new Promise(r => setTimeout(r, 800));
        progressBar.style.width = '85%';
        statusText.textContent = 'Generating cryptographic hashes...';

        // Step 4: Finalizing
        await new Promise(r => setTimeout(r, 600));
        progressBar.style.width = '100%';

        // Complete state
        iconDiv.classList.remove('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-500', 'animate-pulse');
        iconDiv.classList.add('bg-green-100', 'dark:bg-green-900/20', 'text-green-500');
        iconDiv.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';

        titleText.textContent = 'Report Ready';
        statusText.textContent = 'Your report has been successfully generated.';

        // Show download button
        actionsDiv.classList.remove('hidden');
        actionsDiv.classList.add('animate-fade-in-up');

        // Attach download handler to manually trigger download and close modal
        downloadBtn.onclick = () => {
            this.downloadReport(null, format);
            document.getElementById('export-modal').remove();
        };
    },

    downloadReport(url, format) {
        // Simulate file download
        const blob = new Blob([this.generateDummyReportContent(format)], {
            type: this.getMimeType(format)
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `forensics-report-${this.reportId}.${format.toLowerCase()}`;
        link.click();
    },

    generateDummyReportContent(format) {
        if (format === 'JSON') {
            return JSON.stringify({
                report: "Cyber Forensics Investigation Report",
                generatedAt: new Date().toISOString(),
                includeLogs: this.selections.logs,
                includeAnomalies: this.selections.anomalies,
                includeTimeline: this.selections.timeline,
                summary: "This is a dummy report generated by the Cyber Forensics Investigation Dashboard"
            }, null, 2);
        } else if (format === 'CSV') {
            return "ID,Timestamp,Source,Severity,Message\nLOG001,2025-01-15 10:22:11,OS,Critical,Sample log entry";
        } else {
            return "CYBER FORENSICS INVESTIGATION REPORT\n\nGenerated: " + new Date().toLocaleString() +
                "\n\nThis is a dummy PDF report content.\n\nReport Configuration:\n" +
                "- Include Logs: " + this.selections.logs + "\n" +
                "- Include Anomalies: " + this.selections.anomalies + "\n" +
                "- Include Timeline: " + this.selections.timeline;
        }
    },

    getMimeType(format) {
        const mimeTypes = {
            'PDF': 'application/pdf',
            'CSV': 'text/csv',
            'JSON': 'application/json'
        };
        return mimeTypes[format] || 'text/plain';
    }
};

window.ReportsPage = ReportsPage;
