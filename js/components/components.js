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

    // Detailed Anomaly Card for AI Insights Page
    createDetailedAnomalyCard(anomaly) {
        // Map severity to colors
        const severityColors = {
            'Critical': 'text-red-500 border-red-500/30 bg-red-500/10',
            'Warning': 'text-orange-500 border-orange-500/30 bg-orange-500/10',
            'Info': 'text-blue-500 border-blue-500/30 bg-blue-500/10',
            'High': 'text-red-500 border-red-500/30 bg-red-500/10', // Fallback
            'Medium': 'text-orange-500 border-orange-500/30 bg-orange-500/10', // Fallback
            'Low': 'text-blue-500 border-blue-500/30 bg-blue-500/10' // Fallback
        };

        // Normalize severity label
        let severityLabel = anomaly.severity;
        if (severityLabel === 'High') severityLabel = 'Critical';
        if (severityLabel === 'Medium') severityLabel = 'Warning';
        if (severityLabel === 'Low') severityLabel = 'Info';

        const severityClass = severityColors[severityLabel] || severityColors['Info'];
        const confidencePercent = (anomaly.confidenceScore * 100).toFixed(0);

        // Progress bar color
        const progressColor = 'bg-blue-500'; // Screenshot mostly shows blue

        // Systems pills
        const systemsHtml = anomaly.affectedSystems ?
            anomaly.affectedSystems.map(sys =>
                `<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-mono border border-gray-200 dark:border-gray-600">${sys}</span>`
            ).join('') : '';

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg mb-6 last:mb-0">
                <!-- Header -->
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">${anomaly.title || anomaly.description}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${anomaly.description}</p>
                    </div>
                    <span class="px-3 py-1 rounded text-xs font-bold uppercase tracking-wide border ${severityClass}">
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
                    <button class="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
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
            <label class="relative flex items-start gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-all duration-200 group shadow-sm">
                <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} class="peer sr-only">
                <div class="w-5 h-5 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors">
                    <svg class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                    <span class="block text-base font-bold text-gray-900 dark:text-gray-200 mb-1 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">${title}</span>
                    <span class="block text-xs text-gray-500 dark:text-gray-400 leading-relaxed">${subtitle}</span>
                </div>
                <div class="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-blue-500/50 pointer-events-none"></div>
            </label>
        `;
    },

    // Export Format Option Card
    createExportCard(format, icon, description, onClick) {
        return `
            <button onclick="${onClick}" class="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-gray-600 transition-all duration-200 group w-full text-center shadow-sm hover:shadow-md">
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
    }
};
