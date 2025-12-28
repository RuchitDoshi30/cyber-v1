// Reusable UI Components

const Components = {
    // Summary Card for Dashboard
    createSummaryCard(title, value, subtext, icon, trendColor = 'text-green-500') {
        const iconColorClass = title.includes('Anomalies') ? 'text-yellow-500' :
            title.includes('Correlated') ? 'text-blue-500' :
                title.includes('Verified') ? 'text-green-500' : 'text-blue-500';

        return `
            <div class="summary-card bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg relative overflow-hidden group hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">${title}</h3>
                    <div class="${iconColorClass} opacity-80">${icon}</div>
                </div>
                <div class="flex flex-col">
                    <span class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">${value}</span>
                    <span class="text-xs ${trendColor}">${subtext}</span>
                </div>
            </div>
        `;
    },

    // Chart Container
    createChartContainer(id, title, subtitle, height = '300px', cols = 'col-span-1') {
        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg ${cols}">
                <div class="mb-4">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">${title}</h3>
                    ${subtitle ? `<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">${subtitle}</p>` : ''}
                </div>
                <div class="relative w-full" style="height: ${height}">
                    <canvas id="${id}"></canvas>
                </div>
            </div>
        `;
    },

    // Severity Badge
    getSeverityBadgeClass(severity) {
        const severityMap = {
            'Info': 'severity-info',
            'Warning': 'severity-warning',
            'Critical': 'severity-critical'
        };
        return severityMap[severity] || 'severity-info';
    },

    createSeverityBadge(severity) {
        const icon = severity === 'Critical' ? '🔴' : severity === 'Warning' ? '🟡' : '🔵';
        return `<span class="severity-badge ${this.getSeverityBadgeClass(severity)}">${icon} ${severity}</span>`;
    },

    // Log Table Row (Dashboard specific if needed, but we keep generic or use distinct ones)
    createLogTableRow(log) {
        return `
            <tr class="table-row log-entry border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" data-log-id="${log.id}">
                <td class="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-200 font-mono">${log.timestamp}</div>
                </td>
                <td class="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                        ${log.source}
                    </span>
                </td>
                <td class="px-4 md:px-6 py-4 whitespace-nowrap">${this.createSeverityBadge(log.severity)}</td>
                <td class="px-4 md:px-6 py-4">
                    <div class="text-sm text-gray-900 dark:text-gray-300 truncate max-w-xs md:max-w-md lg:max-w-lg">${log.message}</div>
                </td>
            </tr>
        `;
    },

    // Investigate Table Row (With Attack Type and Action)
    createInvestigateTableRow(log) {
        return `
            <tr class="table-row border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onclick="investigatePage.showLogDetails('${log.id}')">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-blue-600 dark:text-blue-400 font-mono">${log.timestamp}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-gray-900 dark:text-gray-200">${log.source}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${this.createSeverityBadge(log.severity)}
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-700 dark:text-gray-300 truncate max-w-sm">${log.message}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">${log.attackType || '<span class="text-gray-400 dark:text-gray-600">-</span>'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                    <button class="text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                </td>
            </tr>
        `;
    },

    // Log Detail Modal
    createLogDetailModal(logDetail) {
        return `
            <div class="modal-backdrop bg-black/60 backdrop-blur-sm" id="logModal" onclick="if(event.target === this) closeModal()">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl mx-auto max-h-[90vh] overflow-hidden animate-fadeIn ring-1 ring-gray-900/5" onclick="event.stopPropagation()">
                    <!-- Modal Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-5 md:p-6 text-white shadow-md z-10 relative">
                        <div class="flex justify-between items-start gap-4">
                            <div class="flex-1 min-w-0">
                                <h2 class="text-xl md:text-2xl font-bold mb-1 tracking-tight">Log Entry Details</h2>
                                <p class="text-blue-100 text-xs md:text-sm font-mono truncate opacity-80">${logDetail.id}</p>
                            </div>
                            <button onclick="closeModal()" class="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200 text-2xl leading-none flex items-center justify-center flex-shrink-0">&times;</button>
                        </div>
                    </div>
                    
                    <!-- Modal Content -->
                    <div class="p-5 md:p-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar bg-white dark:bg-gray-800">
                        <!-- Badges -->
                        <div class="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                            <span class="badge-readonly dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">🔒 Read-only</span>
                            <span class="badge-readonly dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">✓ Integrity Verified</span>
                            ${this.createSeverityBadge(logDetail.severity)}
                        </div>
                        
                        <div class="space-y-5">
                            <!-- Timestamp -->
                            <div class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Timestamp</label>
                                <p class="text-gray-900 dark:text-white font-semibold text-base md:text-lg break-words font-mono">${logDetail.timestamp}</p>
                            </div>
                            
                            <!-- Source -->
                            <div class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Source</label>
                                <p class="text-gray-900 dark:text-white font-semibold break-words">${logDetail.source}</p>
                            </div>
                            
                            <!-- Message -->
                            <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-500">
                                <label class="block text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2">Log Message</label>
                                <p class="text-gray-900 dark:text-gray-200 leading-relaxed break-words">${logDetail.message}</p>
                            </div>
                            
                            ${logDetail.metadata ? `
                            <!-- Metadata -->
                            <div class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Metadata</label>
                                <div class="space-y-3">
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-600">
                                        <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">Host:</span>
                                        <span class="text-gray-900 dark:text-gray-200 font-mono text-sm font-semibold break-all">${logDetail.metadata.host}</span>
                                    </div>
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-600">
                                        <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">IP Address:</span>
                                        <span class="text-gray-900 dark:text-gray-200 font-mono text-sm font-semibold break-all">${logDetail.metadata.ipAddress}</span>
                                    </div>
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-600">
                                        <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">Process:</span>
                                        <span class="text-gray-900 dark:text-gray-200 font-mono text-sm font-semibold break-all">${logDetail.metadata.process}</span>
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Modal Footer -->
                    <div class="p-5 md:p-6 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700">
                        <button onclick="closeModal()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold shadow-md min-h-[44px]">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Anomaly Card
    createAnomalyCard(anomaly) {
        const severityClass = `severity-${anomaly.severity.toLowerCase()}`;
        const confidencePercent = (anomaly.confidenceScore * 100).toFixed(0);
        const confidenceColor = confidencePercent >= 80 ? 'text-red-600' : confidencePercent >= 60 ? 'text-orange-600' : 'text-blue-600';

        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 md:p-6 anomaly-card ${severityClass} hover:shadow-xl transition-all duration-300 border border-transparent dark:border-gray-700">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <h3 class="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-tight flex-1">${anomaly.description}</h3>
                    <span class="severity-badge ${this.getSeverityBadgeClass(anomaly.severity === 'High' ? 'Critical' : anomaly.severity === 'Medium' ? 'Warning' : 'Info')} whitespace-nowrap">
                        ${anomaly.severity === 'High' ? '🔴' : anomaly.severity === 'Medium' ? '🟡' : '🔵'} ${anomaly.severity}
                    </span>
                </div>
                <div class="space-y-3">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Confidence Score:</span>
                        <div class="flex items-center gap-2">
                            <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${confidencePercent}%"></div>
                            </div>
                            <span class="text-sm font-bold ${confidenceColor}">${confidencePercent}%</span>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Detected:</span>
                        <span class="text-sm text-gray-900 dark:text-gray-200 font-semibold break-all">${anomaly.detectedAt}</span>
                    </div>
                </div>
            </div>
        `;
    },

    // Correlation Group
    createCorrelationGroup(correlation, logs) {
        const relatedLogs = logs.filter(log => correlation.logIds.includes(log.id));
        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 md:p-6 correlation-group pl-6 md:pl-8 border border-transparent dark:border-gray-700">
                <h3 class="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">${correlation.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 italic text-sm md:text-base">${correlation.explanation}</p>
                <div class="space-y-3">
                    <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Related Events:</p>
                    ${relatedLogs.map(log => `
                        <div class="bg-gray-50 dark:bg-gray-700/30 p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                <span class="font-mono text-xs md:text-sm text-gray-600 dark:text-gray-400 break-all">${log.id}</span>
                                ${this.createSeverityBadge(log.severity)}
                            </div>
                            <p class="text-sm text-gray-900 dark:text-gray-200 break-words">${log.message}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-500 mt-2 break-words">${log.timestamp}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // Filter Chip
    createFilterChip(label, value, type) {
        return `
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 transition-colors">
                <span class="opacity-70 uppercase tracking-wider text-[10px]">${label}:</span>
                <span class="font-bold">${value}</span>
                <button onclick="removeFilter('${type}')" class="ml-1 hover:text-red-500 focus:outline-none transition-colors" title="Remove filter">
                    &times;
                </button>
            </span>
        `;
    },

    // Loading Spinner
    createLoadingSpinner() {
        return `
            <div class="flex items-center justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        `;
    },

    // Empty State
    createEmptyState(message, icon = '📂') {
        return `
            <div class="text-center py-12">
                <div class="text-6xl mb-4">${icon}</div>
                <p class="text-gray-500 text-lg">${message}</p>
            </div>
        `;
    },

    // Log Source Progress Bar Item
    createLogSourceItem(source, count, percentage, colorClass = 'bg-blue-600') {
        // Icon mapping
        const icons = {
            'Operating System': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
            'IoT Devices': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>',
            'Server Logs': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>',
            'Applications': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>'
        };

        return `
            <div class="mb-5 last:mb-0">
                <div class="flex justify-between items-end mb-2">
                    <div class="flex items-center gap-2 text-gray-500 dark:text-gray-300">
                        <span class="p-1.5 bg-gray-200 dark:bg-gray-700 rounded text-blue-600 dark:text-blue-400">
                           ${icons[source] || icons['Operating System']}
                        </span>
                        <div>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white tracking-wide">${source}</p>
                            <p class="text-xs text-gray-500">${count.toLocaleString()} logs</p>
                        </div>
                    </div>
                    <span class="text-sm font-bold text-gray-900 dark:text-white">${percentage}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                    <div class="${colorClass} h-1.5 rounded-full" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    },

    // Recent Anomaly List Item
    createAnomalyListItem(anomaly, log) {
        const severityColors = {
            'Critical': 'bg-red-500/20 text-red-500 border-red-500/20',
            'Warning': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20',
            'Info': 'bg-blue-500/20 text-blue-500 border-blue-500/20'
        };
        const badgeClass = severityColors[log.severity] || severityColors['Info'];

        return `
            <div class="py-4 border-b border-gray-200 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/20 px-2 -mx-2 rounded transition-colors group">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}">
                        ${log.severity}
                    </span>
                    <span class="text-xs text-gray-500 font-mono group-hover:text-gray-400 transition-colors">${(anomaly.confidenceScore * 100).toFixed(0)}% confidence</span>
                </div>
                <div class="mt-2">
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">${log.message}</h4>
                    <div class="flex justify-between items-center text-xs text-gray-500">
                        <span>${log.id}</span>
                        <span>${log.timestamp}</span>
                    </div>
                </div>
            </div>
        `;
    },

    // Timeline Item
    createTimelineItem(item) {
        const statusColors = {
            'success': 'bg-blue-500', // Using blue based on screenshot accent
            'verified': 'bg-green-500',
            'info': 'bg-gray-500'
        };
        const barColor = statusColors[item.status] || 'bg-gray-500';

        return `
            <div class="relative pl-6 pb-6 last:pb-0 border-l-2 border-gray-200 dark:border-gray-700/50 ml-2">
                <div class="absolute -left-[5px] top-0 w-2 h-8 ${barColor} rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-1">${item.title}</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${item.description}</p>
                    </div>
                    <span class="text-xs text-gray-500 whitespace-nowrap ml-4">${item.time}</span>
                </div>
            </div>
        `;
    },

    // Ingestion Steps Visual (Feature 1)
    createIngestionSteps(currentStep = 3) {
        const steps = [
            { icon: '📤', label: 'Uploaded' },
            { icon: '⚙️', label: 'Parsed' },
            { icon: '🔍', label: 'Indexed' },
            { icon: '✅', label: 'Ready' }
        ];

        // Calculate progress width for the blue line (0% to 100%)
        const progressPercent = (Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100;

        return `
            <div class="w-full py-4 overflow-hidden">
                <div class="flex items-center justify-between relative px-1">
                    <!-- Background Line -->
                    <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                    <!-- Active Progress Line -->
                    <div id="ingestion-progress-line" class="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 transition-all duration-700 ease-in-out -z-10" style="width: ${progressPercent}%"></div>
                    
                    ${steps.map((step, index) => {
            const active = index <= currentStep;
            // Unified transition classes for smooth state changes
            const baseCircle = "w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-500 ease-in-out z-10 bg-white dark:bg-gray-900";
            const activeState = "bg-blue-600 border-blue-600 text-white shadow-sm";
            const inactiveState = "border-gray-300 dark:border-gray-600 text-gray-400";

            return `
                            <div class="flex flex-col items-center gap-1 z-10">
                                <div id="step-circle-${index}" class="${baseCircle} ${active ? activeState : inactiveState}">
                                    ${active ? step.icon : index + 1}
                                </div>
                                <span id="step-label-${index}" class="text-[8px] md:text-[10px] font-semibold uppercase tracking-wider transition-colors duration-500 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}">
                                    ${step.label}
                                </span>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    },

    // Investigation Workflow Tracking (Feature 5)
    createInvestigationProgress(currentStage = 1) {
        const stages = ['Ingestion', 'Detection', 'Correlation', 'Reporting'];
        const progress = ((currentStage + 0.5) / stages.length) * 100;

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Investigation Status</h3>
                    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase rounded">In Progress</span>
                </div>
                <div class="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
                    <div class="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                </div>
                <div class="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                    ${stages.map((stage, idx) => `
                        <span class="${idx <= currentStage ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}">${stage}</span>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // Detailed Anomaly Card for AI Insights Page (Enhanced with XAI - Feature 4)
    createDetailedAnomalyCard(anomaly) {
        // Map severity to colors
        const severityColors = {
            'Critical': 'text-red-500 border-red-500/30 bg-red-500/10',
            'Warning': 'text-orange-500 border-orange-500/30 bg-orange-500/10',
            'Info': 'text-blue-500 border-blue-500/30 bg-blue-500/10',
            'High': 'text-red-500 border-red-500/30 bg-red-500/10',
            'Medium': 'text-orange-500 border-orange-500/30 bg-orange-500/10',
            'Low': 'text-blue-500 border-blue-500/30 bg-blue-500/10'
        };

        let severityLabel = anomaly.severity;
        if (severityLabel === 'High') severityLabel = 'Critical';
        if (severityLabel === 'Medium') severityLabel = 'Warning';
        if (severityLabel === 'Low') severityLabel = 'Info';

        const severityClass = severityColors[severityLabel] || severityColors['Info'];
        const confidencePercent = (anomaly.confidenceScore * 100).toFixed(0);
        const progressColor = 'bg-blue-500';

        const systemsHtml = anomaly.affectedSystems ?
            anomaly.affectedSystems.map(sys =>
                `<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-mono border border-gray-200 dark:border-gray-600">${sys}</span>`
            ).join('') : '';

        // Explainable AI Logic (Static Simulation)
        const xaiExplanation = anomaly.description.includes('login') ? 'Unusual frequency of failed attempts (Z-Score > 3.5) from a single external IP address.' :
            anomaly.description.includes('outbound') ? 'Data transfer volume exceeds daily baseline by 400% during non-business hours.' :
                'Process signature deviates from known-good allowlist for this host type.';

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 p-4 sm:p-6 shadow-lg mb-6 last:mb-0">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                        <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">${anomaly.title || anomaly.description}</h3>
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">${anomaly.description}</p>
                    </div>
                    <span class="self-start px-2 py-1 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wide border ${severityClass}">
                        ${severityLabel.toUpperCase()}
                    </span>
                </div>

                <!-- Confidence Score -->
                <div class="mb-6">
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">Confidence Score</span>
                        <span class="text-sm font-bold text-gray-600 dark:text-gray-400">${confidencePercent}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <div class="${progressColor} h-2 rounded-full" style="width: ${confidencePercent}%"></div>
                    </div>
                </div>

                <!-- XAI: Why Flagged? (Feature 4) -->
                <div class="mb-6 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded border border-yellow-100 dark:border-yellow-900/30">
                    <p class="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase mb-1">🔍 Why was this flagged?</p>
                    <p class="text-sm text-gray-700 dark:text-gray-300 italic">"${xaiExplanation}"</p>
                </div>

                <!-- Attack Correlation Graph (Expandable) -->
                <div class="mb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <button onclick="InsightsPage.toggleGraph('${anomaly.id}')" class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full text-left group">
                        <svg id="arrow-${anomaly.id}" class="w-4 h-4 transform transition-transform text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        View Attack Correlation Graph
                    </button>
                    <div id="graph-container-${anomaly.id}" class="hidden mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-64 md:h-80 relative overflow-hidden flex items-center justify-center">
                        <span class="text-xs text-gray-400 animate-pulse">Initializing visualization...</span>
                    </div>
                </div>

                <!-- Affected Systems -->
                <div class="mb-6">
                    <span class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Affected Systems</span>
                    <div class="flex flex-wrap gap-2">
                        ${systemsHtml || '<span class="text-sm text-gray-500">-</span>'}
                    </div>
                </div>

                <!-- Recommended Action -->
                <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50 mb-4">
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 rounded-full border border-blue-500 mt-2 flex-shrink-0"></div>
                        <div>
                            <span class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Recommended Action</span>
                            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">${anomaly.recommendedAction || 'Investigate manually.'}</p>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex justify-between items-center pt-2">
                    <span class="text-xs text-gray-500">${anomaly.relatedLogIds ? anomaly.relatedLogIds.length : 0} related log entries</span>
                    <button onclick="viewAnomalyLogs('${(anomaly.relatedLogIds || []).join(',')}', '${encodeURIComponent(anomaly.description)}', '${anomaly.severity}')" 
                        class="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
                        View logs 
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
            </div>
        `;
    },

    // Detailed Correlation Card for AI Insights Page
    createCorrelationCard(correlation) {
        const confidencePercent = (correlation.confidence * 100).toFixed(0);

        // Sources pills
        const sourcesHtml = correlation.sources ?
            correlation.sources.map(sys =>
                `<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-mono border border-gray-200 dark:border-gray-600">${sys}</span>`
            ).join('') : '';

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg mb-6 last:mb-0">
                <!-- Header -->
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white">${correlation.groupId}</h3>
                            <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium border border-gray-200 dark:border-gray-600">${correlation.eventCount} events</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${correlation.title}</p>
                    </div>
                    <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded text-xs font-bold border border-gray-200 dark:border-gray-600">
                        ${correlation.timeRange}
                    </span>
                </div>

                <!-- Correlation Confidence -->
                <div class="mb-6">
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">Correlation Confidence</span>
                        <span class="text-sm font-bold text-gray-600 dark:text-gray-400">${confidencePercent}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${confidencePercent}%"></div>
                    </div>
                </div>

                <!-- Correlated Sources -->
                <div class="mb-6">
                    <span class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Correlated Sources</span>
                    <div class="flex flex-wrap gap-2">
                        ${sourcesHtml}
                    </div>
                </div>

                <!-- AI Analysis -->
                <div class="bg-teal-50 dark:bg-teal-900/10 rounded-lg p-4 border border-teal-200 dark:border-teal-500/20 mb-4">
                    <div class="flex items-start gap-3">
                        <div class="mt-1 text-teal-600 dark:text-teal-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                        <div>
                            <span class="block text-sm font-bold text-teal-700 dark:text-teal-400 mb-1">AI Correlation Analysis</span>
                            <p class="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">${correlation.analysisText}</p>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="pt-2">
                    <button class="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
                        View detailed timeline 
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
            </div>
        `;
    },

    createGauge(percentage, label) {
        const circumference = 2 * Math.PI * 40; // r=40
        const offset = circumference - (percentage / 100) * circumference;

        return `
            <div class="flex flex-col items-center justify-center">
                <div class="relative w-32 h-32">
                    <svg class="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-200 dark:text-gray-700" />
                        <circle cx="64" cy="64" r="40" stroke="currentColor" stroke-width="8" fill="transparent" 
                                stroke-dasharray="${circumference}" 
                                stroke-dashoffset="${offset}" 
                                stroke-linecap="round"
                                class="text-green-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-2xl font-bold text-gray-900 dark:text-white">${percentage}%</span>
                        <span class="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Score</span>
                    </div>
                </div>
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">${label}</p>
            </div>
         `;
    },

    // Report Configuration Selection Card
    createSelectionCard(id, title, subtitle, checked) {
        return `
            <label class="relative flex items-start gap-3 sm:gap-4 p-3 sm:p-5 rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-all duration-200 group shadow-sm">
                <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} class="peer sr-only">
                <div class="w-5 h-5 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors shrink-0">
                    <svg class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                    <span class="block text-sm sm:text-base font-bold text-gray-900 dark:text-gray-200 mb-1 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">${title}</span>
                    <span class="block text-xs text-gray-500 dark:text-gray-400 leading-relaxed">${subtitle}</span>
                </div>
                <div class="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-blue-500/50 pointer-events-none"></div>
            </label>
        `;
    },

    // Export Format Option Card
    createExportCard(format, icon, description, onClick) {
        return `
            <button onclick="${onClick}" class="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-gray-600 transition-all duration-200 group w-full text-center shadow-sm hover:shadow-md">
                <div class="text-3xl mb-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors transform group-hover:scale-110 duration-200">${icon}</div>
                <span class="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-1">${format}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400">${description}</span>
            </button>
        `;
    },

    // Report Summary Item
    createSummaryItem(label, isChecked) {
        if (!isChecked) return '';
        return `
            <div class="flex items-center gap-3 mb-2 last:mb-0 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div class="w-4 h-4 rounded-sm border border-green-500/30 bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${label}</span>
            </div>
        `;
    },

    // Chain of Custody Panel
    createChainOfCustodyPanel(reportId) {
        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm dark:shadow-lg">
                <h3 class="text-base font-bold text-gray-900 dark:text-white mb-6">Chain of Custody</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Report ID</span>
                        <span class="text-sm font-mono text-gray-700 dark:text-gray-300">${reportId}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Generated By</span>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Investigator #1</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Timestamp</span>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${new Date().toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span class="text-sm text-gray-500">Hash Status</span>
                        <span class="text-sm font-bold text-green-600 dark:text-green-500 flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            Verified
                        </span>
                    </div>
                </div>
            </div>
        `;
    },

    // Attack Correlation Node Graph (New Function)
    renderAttackGraph(containerId, anomalyId) {
        const container = document.getElementById(containerId);
        // Prevent re-rendering if SVG exists, but allow overwriting "Initializing..." placeholder
        if (!container || container.querySelector('svg')) return;

        // Dummy Data Generation (Visual Only)
        // In a real app, this would come from the anomaly object
        const nodes = [
            { x: 300, y: 60, label: 'Ext IP', sub: '198.51.100.24', type: 'ip' },
            { x: 500, y: 160, label: 'Server', sub: 'DB-Prod-01', type: 'server' },
            { x: 300, y: 260, label: 'Admin', sub: 'sys_admin', type: 'user' },
            { x: 100, y: 160, label: 'Firewall', sub: 'Port 443', type: 'log' }
        ];

        // Center Node
        const center = { x: 300, y: 160, label: 'Anomaly', type: 'center' };

        const createNode = (n) => {
            const isCenter = n.type === 'center';
            const r = isCenter ? 25 : 18;
            const bgClass = isCenter ? 'fill-red-100 dark:fill-red-900/40' : 'fill-white dark:fill-gray-800';
            const strokeClass = isCenter ? 'stroke-red-500' : 'stroke-blue-500 dark:stroke-blue-400';
            const textClass = isCenter ? 'fill-red-600 dark:fill-red-400 font-bold' : 'fill-gray-600 dark:fill-gray-300';

            let icon = '⚠️';
            if (n.type === 'ip') icon = '🌐';
            if (n.type === 'server') icon = '🖥️';
            if (n.type === 'user') icon = '👤';
            if (n.type === 'log') icon = '📝';

            return `
                <g class="node transition-all duration-300 hover:opacity-80 cursor-pointer" onclick="event.stopPropagation()">
                    <circle cx="${n.x}" cy="${n.y}" r="${r}" class="${bgClass} ${strokeClass}" stroke-width="2"></circle>
                    <text x="${n.x}" y="${n.y}" dy="5" text-anchor="middle" class="text-xs pointer-events-none ${textClass}" style="font-size: ${isCenter ? '14px' : '10px'}">${icon}</text>
                    <text x="${n.x}" y="${n.y + r + 14}" text-anchor="middle" class="text-[10px] uppercase font-bold fill-gray-800 dark:fill-gray-200 tracking-wider">${n.label}</text>
                    <text x="${n.x}" y="${n.y + r + 24}" text-anchor="middle" class="text-[9px] fill-gray-500 dark:fill-gray-400 font-mono">${n.sub || ''}</text>
                </g>
             `;
        };

        const edges = nodes.map(n => `
            <line x1="${center.x}" y1="${center.y}" x2="${n.x}" y2="${n.y}" class="stroke-gray-300 dark:stroke-gray-600" stroke-width="1" stroke-dasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
        `).join('');

        const svg = `
            <svg viewBox="0 0 600 320" class="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                ${edges}
                ${createNode(center)}
                ${nodes.map(n => createNode(n)).join('')}
            </svg>
        `;

        container.innerHTML = svg;
    },

    renderForceGraph(containerId, anomalyId) {
        const container = document.getElementById(containerId);
        if (!container || container.querySelector('svg')) return;

        container.innerHTML = '';

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 320;
        const centerNode = { id: 'center', x: width / 2, y: height / 2, label: 'Anomaly', type: 'center', fixed: true };

        const nodes = [centerNode];
        // Dynamic Spoke Generation
        const spokeTypes = [
            { label: 'Attacker IP', sub: '198.51.100.24', type: 'ip' },
            { label: 'DB-Prod-01', sub: 'Target Server', type: 'server' },
            { label: 'admin_sys', sub: 'Compromised User', type: 'user' },
            { label: 'Firewall', sub: 'Log Source', type: 'log' },
            { label: 'Port 443', sub: 'Vector', type: 'log' }
        ];

        const links = [];
        spokeTypes.forEach((nt, i) => {
            const angle = (i / spokeTypes.length) * 2 * Math.PI;
            const dist = 100;
            nodes.push({
                id: `n${i}`,
                x: width / 2 + Math.cos(angle) * dist,
                y: height / 2 + Math.sin(angle) * dist,
                vx: 0, vy: 0,
                ...nt
            });
            links.push({ source: centerNode, target: nodes[nodes.length - 1] });
        });

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.classList.add("w-full", "h-full", "select-none", "cursor-move");
        container.appendChild(svg);

        const defs = document.createElementNS(svgNS, "defs");
        defs.innerHTML = `
            <filter id="glow-force" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        `;
        svg.appendChild(defs);

        const linkElements = links.map(l => {
            const line = document.createElementNS(svgNS, "line");
            line.classList.add("stroke-gray-300", "dark:stroke-gray-600");
            line.setAttribute("stroke-width", "1.5");
            line.setAttribute("stroke-dasharray", "4 4");
            svg.appendChild(line);
            return { el: line, link: l };
        });

        const nodeElements = nodes.map(n => {
            const g = document.createElementNS(svgNS, "g");
            g.classList.add("cursor-grab", "transition-opacity", "duration-300", "hover:opacity-80");

            const isCenter = n.type === 'center';
            const r = isCenter ? 28 : 20;

            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("r", r);
            if (isCenter) {
                circle.setAttribute("class", "fill-red-100 dark:fill-red-900/40 stroke-red-500 stroke-2");
                circle.setAttribute("filter", "url(#glow-force)");
            } else {
                circle.setAttribute("class", "fill-white dark:fill-gray-800 stroke-blue-500 dark:stroke-blue-400 stroke-2");
            }

            const fs = isCenter ? 14 : 10;
            const textIcon = document.createElementNS(svgNS, "text");
            textIcon.setAttribute("dy", "5");
            textIcon.setAttribute("text-anchor", "middle");
            textIcon.setAttribute("style", `font-size: ${fs}px`);
            textIcon.setAttribute("class", "pointer-events-none fill-gray-900 dark:fill-white");
            textIcon.textContent = isCenter ? '⚠️' : n.type === 'ip' ? '🌐' : n.type === 'server' ? '🖥️' : n.type === 'user' ? '👤' : '📄';

            const textLabel = document.createElementNS(svgNS, "text");
            textLabel.setAttribute("dy", r + 15);
            textLabel.setAttribute("text-anchor", "middle");
            textLabel.setAttribute("class", "text-[10px] font-bold fill-gray-800 dark:fill-gray-200 uppercase tracking-wider pointer-events-none");
            textLabel.textContent = n.label;

            g.appendChild(circle);
            g.appendChild(textIcon);
            g.appendChild(textLabel);
            svg.appendChild(g);

            const startDrag = (e) => {
                e.preventDefault();
                e.stopPropagation();
                let draggedNode = n;

                const moveHandler = (ev) => {
                    const pt = svg.createSVGPoint();
                    pt.x = ev.clientX || ev.touches?.[0].clientX;
                    pt.y = ev.clientY || ev.touches?.[0].clientY;
                    const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
                    draggedNode.x = loc.x;
                    draggedNode.y = loc.y;
                    draggedNode.vx = 0; draggedNode.vy = 0;
                };

                const endHandler = () => {
                    window.removeEventListener('mousemove', moveHandler);
                    window.removeEventListener('mouseup', endHandler);
                    window.removeEventListener('touchmove', moveHandler);
                    window.removeEventListener('touchend', endHandler);
                    draggedNode = null;
                };

                window.addEventListener('mousemove', moveHandler);
                window.addEventListener('mouseup', endHandler);
                window.addEventListener('touchmove', moveHandler, { passive: false });
                window.addEventListener('touchend', endHandler);
            };

            g.addEventListener('mousedown', startDrag);
            g.addEventListener('touchstart', startDrag, { passive: false });

            return { el: g, node: n };
        });

        // Verlet Integration Loop
        const animate = () => {
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                if (a.fixed) continue;

                let fx = 0, fy = 0;

                // Repulsion
                for (let j = 0; j < nodes.length; j++) {
                    if (i === j) continue;
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 > 0) {
                        const force = 3000 / (d2 + 100);
                        const dist = Math.sqrt(d2);
                        fx += (dx / dist) * force;
                        fy += (dy / dist) * force;
                    }
                }

                // Spring
                links.forEach(l => {
                    const other = l.source === a ? l.target : l.target === a ? l.source : null;
                    if (other) {
                        const dx = a.x - other.x;
                        const dy = a.y - other.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const targetDist = 140;
                        const force = (dist - targetDist) * 0.02;
                        fx -= (dx / dist) * force;
                        fy -= (dy / dist) * force;
                    }
                });

                // Center Gravity
                const dxC = a.x - width / 2;
                const dyC = a.y - height / 2;
                fx -= dxC * 0.002;
                fy -= dyC * 0.002;

                a.vx = (a.vx + fx) * 0.92;
                a.vy = (a.vy + fy) * 0.92;
                a.x += a.vx;
                a.y += a.vy;

                a.x = Math.max(30, Math.min(width - 30, a.x));
                a.y = Math.max(30, Math.min(height - 30, a.y));
            }

            nodeElements.forEach(item => {
                item.el.setAttribute("transform", `translate(${item.node.x}, ${item.node.y})`);
            });
            linkElements.forEach(item => {
                item.el.setAttribute("x1", item.link.source.x);
                item.el.setAttribute("y1", item.link.source.y);
                item.el.setAttribute("x2", item.link.target.x);
                item.el.setAttribute("y2", item.link.target.y);
            });

            requestAnimationFrame(animate);
        };

        animate();
    },

    renderEnhancedForceGraph(containerId, anomalyId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (container.querySelector('svg')) return;

        container.innerHTML = '';

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 320;

        // Data Setup
        const centerNode = { id: 'center', x: width / 2, y: height / 2, label: 'ANOMALY', type: 'center', fx: width / 2, fy: height / 2 };

        const nodes = [centerNode];
        const spokeTypes = [
            { label: 'Attacker IP', sub: '198.51.100.24', type: 'ip' },
            { label: 'DB-Prod-01', sub: 'Target Server', type: 'server' },
            { label: 'admin_sys', sub: 'Compromised User', type: 'user' },
            { label: 'Firewall', sub: 'Log Source', type: 'log' },
            { label: 'Port 443', sub: 'Vector', type: 'log' },
            { label: 'Auth Service', sub: 'Affected App', type: 'app' }
        ];

        const links = [];
        spokeTypes.forEach((nt, i) => {
            const angle = (i / spokeTypes.length) * 2 * Math.PI;
            const dist = Math.min(width, height) * 0.35; // Dynamic placement
            nodes.push({
                id: `n${i}`,
                x: width / 2 + Math.cos(angle) * dist,
                y: height / 2 + Math.sin(angle) * dist,
                vx: 0, vy: 0,
                ...nt
            });
            links.push({ source: centerNode, target: nodes[nodes.length - 1] });
        });

        // SVG Setup
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.classList.add("w-full", "h-full", "select-none", "cursor-grab", "active:cursor-grabbing");
        container.appendChild(svg);

        // Definitions
        const defs = document.createElementNS(svgNS, "defs");
        defs.innerHTML = `
            <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        `;
        svg.appendChild(defs);

        // Render Groups
        const linkGroup = document.createElementNS(svgNS, "g");
        const nodeGroup = document.createElementNS(svgNS, "g");
        const particleGroup = document.createElementNS(svgNS, "g");
        svg.appendChild(linkGroup);
        svg.appendChild(particleGroup);
        svg.appendChild(nodeGroup);

        // Link Elements
        const linkElements = links.map(l => {
            const line = document.createElementNS(svgNS, "line");
            line.classList.add("stroke-blue-300", "dark:stroke-blue-800", "opacity-40");
            line.setAttribute("stroke-width", "1");
            linkGroup.appendChild(line);
            return { el: line, link: l };
        });

        // Particles
        const particles = [];
        links.forEach((l, idx) => {
            for (let i = 0; i < 2; i++) {
                const p = document.createElementNS(svgNS, "circle");
                p.setAttribute("r", "2");
                p.classList.add("fill-blue-400", "dark:fill-cyan-300");
                p.setAttribute("filter", "url(#glow-strong)");
                particleGroup.appendChild(p);
                particles.push({
                    el: p,
                    link: l,
                    t: i * 0.5,
                    speed: 0.003 + Math.random() * 0.002
                });
            }
        });

        // Node Elements
        const nodeElements = nodes.map(n => {
            const g = document.createElementNS(svgNS, "g");
            g.classList.add("transition-opacity", "duration-200");

            const isCenter = n.type === 'center';

            // HUD Ring for Center
            if (isCenter) {
                const ring = document.createElementNS(svgNS, "circle");
                ring.setAttribute("r", "40");
                ring.setAttribute("fill", "none");
                ring.setAttribute("stroke", "currentColor");
                ring.setAttribute("stroke-width", "1");
                ring.setAttribute("stroke-dasharray", "20 10");
                ring.classList.add("text-red-500", "opacity-30", "dark:text-red-400");

                const anim = document.createElementNS(svgNS, "animateTransform");
                anim.setAttribute("attributeName", "transform");
                anim.setAttribute("type", "rotate");
                anim.setAttribute("from", "0 0 0");
                anim.setAttribute("to", "360 0 0");
                anim.setAttribute("dur", "20s");
                anim.setAttribute("repeatCount", "indefinite");
                ring.appendChild(anim);
                g.appendChild(ring);
            }

            // Shape
            const r = isCenter ? 24 : 16;
            let shape;
            if (n.type === 'server') {
                shape = document.createElementNS(svgNS, "polygon");
                const hexPoints = [];
                for (let k = 0; k < 6; k++) {
                    const ang = k * Math.PI / 3;
                    hexPoints.push(`${Math.cos(ang) * r},${Math.sin(ang) * r}`);
                }
                shape.setAttribute("points", hexPoints.join(' '));
            } else if (n.type === 'app') {
                shape = document.createElementNS(svgNS, "rect");
                shape.setAttribute("x", -r);
                shape.setAttribute("y", -r);
                shape.setAttribute("width", r * 2);
                shape.setAttribute("height", r * 2);
                shape.setAttribute("rx", 3);
            } else {
                shape = document.createElementNS(svgNS, "circle");
                shape.setAttribute("r", r);
            }

            if (isCenter) {
                shape.setAttribute("class", "fill-red-600 dark:fill-red-900 stroke-red-400 stroke-2");
                shape.setAttribute("filter", "url(#glow-strong)");
            } else if (n.type === 'server') {
                shape.setAttribute("class", "fill-gray-100 dark:fill-gray-800 stroke-purple-500 stroke-2");
            } else if (n.type === 'ip') {
                shape.setAttribute("class", "fill-gray-100 dark:fill-gray-800 stroke-cyan-500 stroke-2");
            } else if (n.type === 'app') {
                shape.setAttribute("class", "fill-gray-100 dark:fill-gray-800 stroke-green-500 stroke-2");
            } else {
                shape.setAttribute("class", "fill-gray-100 dark:fill-gray-800 stroke-blue-500 stroke-2");
            }
            g.appendChild(shape);

            // Icon & Label
            const fs = isCenter ? 14 : 10;
            const textIcon = document.createElementNS(svgNS, "text");
            textIcon.setAttribute("dy", "4");
            textIcon.setAttribute("text-anchor", "middle");
            textIcon.setAttribute("style", `font-size: ${fs}px`);
            textIcon.classList.add("pointer-events-none", isCenter ? "fill-white" : "fill-gray-800", "dark:fill-gray-200");
            textIcon.textContent = isCenter ? '⚠️' : n.type === 'ip' ? '🌐' : n.type === 'server' ? '💾' : n.type === 'user' ? '👤' : n.type === 'app' ? '📱' : '📄';
            g.appendChild(textIcon);

            if (!isCenter) {
                const textLabel = document.createElementNS(svgNS, "text");
                textLabel.setAttribute("dy", r + 14);
                textLabel.setAttribute("text-anchor", "middle");
                textLabel.classList.add("text-[9px]", "font-bold", "fill-gray-600", "dark:fill-gray-400", "uppercase", "tracking-wider", "pointer-events-none");
                textLabel.textContent = n.label;
                g.appendChild(textLabel);
            }

            nodeGroup.appendChild(g);

            // Mouse Events
            g.addEventListener('mouseenter', () => {
                nodeElements.forEach(other => {
                    const isConnected = links.some(l => (l.source === n && l.target === other.node) || (l.target === n && l.source === other.node)) || other.node === n;
                    other.el.style.opacity = isConnected ? '1' : '0.1';
                });
                linkElements.forEach(line => {
                    const isConnected = line.link.source === n || line.link.target === n;
                    line.el.style.opacity = isConnected ? '0.8' : '0.05';
                    line.el.setAttribute("stroke-width", isConnected ? "2" : "1");
                });
                particles.forEach(p => {
                    const isConnected = p.link.source === n || p.link.target === n;
                    p.el.style.opacity = isConnected ? '1' : '0';
                });
            });

            g.addEventListener('mouseleave', () => {
                nodeElements.forEach(other => other.el.style.opacity = '1');
                linkElements.forEach(line => {
                    line.el.style.opacity = '0.4';
                    line.el.setAttribute("stroke-width", "1");
                });
                particles.forEach(p => p.el.style.opacity = '1');
            });

            // Drag Implementation
            const startDrag = (e) => {
                e.preventDefault();
                e.stopPropagation();
                let draggedNode = n;
                alphaTarget = 0.3; // Re-heat simulation
                restart(); // Wake up loop if stopped

                const moveHandler = (ev) => {
                    const pt = svg.createSVGPoint();
                    pt.x = ev.clientX || ev.touches?.[0].clientX;
                    pt.y = ev.clientY || ev.touches?.[0].clientY;
                    const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
                    draggedNode.fx = loc.x;
                    draggedNode.fy = loc.y;
                };

                const endHandler = () => {
                    window.removeEventListener('mousemove', moveHandler);
                    window.removeEventListener('mouseup', endHandler);
                    window.removeEventListener('touchmove', moveHandler);
                    window.removeEventListener('touchend', endHandler);
                    alphaTarget = 0; // Cool down
                    // Node remains pinned at fx, fy
                    draggedNode = null;
                };

                window.addEventListener('mousemove', moveHandler);
                window.addEventListener('mouseup', endHandler);
                window.addEventListener('touchmove', moveHandler, { passive: false });
                window.addEventListener('touchend', endHandler);
            };

            g.addEventListener('mousedown', startDrag);
            g.addEventListener('touchstart', startDrag, { passive: false });

            return { el: g, node: n };
        });

        // Simulation State
        let alpha = 1;
        let alphaTarget = 0;
        let alphaDecay = 0.02; // Fast settling
        const velocityDecay = 0.6; // High friction for stability

        const tick = () => {
            alpha += (alphaTarget - alpha) * alphaDecay;

            if (alpha < 0.005) return false; // Stop if cooled down

            // Forces
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                if (a.fx != null) {
                    a.x = a.fx;
                    a.y = a.fy;
                    a.vx = 0;
                    a.vy = 0;
                    continue;
                }

                let fx = 0, fy = 0;

                // 1. Center Gravity (Gentle)
                const dxC = a.x - width / 2;
                const dyC = a.y - height / 2;
                fx -= dxC * 0.01 * alpha;
                fy -= dyC * 0.01 * alpha;

                // 2. Repulsion (Stronger)
                for (let j = 0; j < nodes.length; j++) {
                    if (i === j) continue;
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    let distSq = dx * dx + dy * dy;
                    if (distSq === 0) { distSq = 1; fx += Math.random(); fy += Math.random(); }
                    const dist = Math.sqrt(distSq);
                    const force = (2000 / distSq) * alpha; // Repulsion Strength
                    fx += (dx / dist) * force;
                    fy += (dy / dist) * force;
                }

                // 3. Links (Spring)
                links.forEach(l => {
                    const target = l.source === a ? l.target : l.target === a ? l.source : null;
                    if (target) {
                        const dx = a.x - target.x;
                        const dy = a.y - target.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const desired = Math.min(width, height) * 0.4; // Dynamic spring length
                        const strain = (dist - desired) * 0.05 * alpha;
                        fx -= (dx / dist) * strain;
                        fy -= (dy / dist) * strain;
                    }
                });

                // Apply Velocity
                a.vx = (a.vx + fx) * velocityDecay;
                a.vy = (a.vy + fy) * velocityDecay;
                a.x += a.vx;
                a.y += a.vy;

                // Bounds
                a.x = Math.max(20, Math.min(width - 20, a.x));
                a.y = Math.max(20, Math.min(height - 20, a.y));
            }
            return true;
        };

        const render = () => {
            nodeElements.forEach(item => {
                item.el.setAttribute("transform", `translate(${item.node.x}, ${item.node.y})`);
            });
            linkElements.forEach(item => {
                item.el.setAttribute("x1", item.link.source.x);
                item.el.setAttribute("y1", item.link.source.y);
                item.el.setAttribute("x2", item.link.target.x);
                item.el.setAttribute("y2", item.link.target.y);
            });
            // Particles
            particles.forEach(p => {
                p.t += p.speed;
                if (p.t > 1) p.t = 0;
                const sx = p.link.source.x, sy = p.link.source.y;
                const tx = p.link.target.x, ty = p.link.target.y;
                p.el.setAttribute("cx", sx + (tx - sx) * p.t);
                p.el.setAttribute("cy", sy + (ty - sy) * p.t);
            });
        };

        // PRE-WARM Simulation (100 ticks)
        for (let k = 0; k < 120; k++) {
            tick();
        }
        render(); // Initial static render

        // Animation Loop
        let running = false;
        const restart = () => {
            if (!running) {
                running = true;
                requestAnimationFrame(loop);
            }
        };

        const loop = () => {
            const active = tick();
            render();
            if (active || alphaTarget > 0) {
                requestAnimationFrame(loop);
            } else {
                requestAnimationFrame(loop);
            }
        };
        restart();
    }
};



