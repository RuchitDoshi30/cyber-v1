// Upload Logs Page - Secure forensic ingestion
const UploadPage = {
    uploadStatus: null,

    // Dummy data for "Uploaded Files List"
    uploadedFiles: [
        { name: 'server_access_2023.log', source: 'Web Server', size: '2.4 MB', time: '2025-05-12 08:30:00', status: 'Ready', hash: 'e3b0c442...' },
        { name: 'firewall_events.csv', source: 'Firewall', size: '15.8 MB', time: '2025-05-11 14:15:22', status: 'Ready', hash: '8d969eef...' },
        { name: 'auth_audit.json', source: 'OS Auth', size: '850 KB', time: '2025-05-10 09:45:10', status: 'Archived', hash: '5f4dcc3b...' }
    ],

    async render() {
        return `
            <div class="max-w-7xl mx-auto space-y-6 md:space-y-8">
                <!-- 1. Page Header -->
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                    <div>
                        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Upload Logs</h1>
                        <p class="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">Secure ingestion of forensic log files for investigation</p>
                    </div>
                    <div class="self-start md:self-auto flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700">
                        <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Secure Gateway Active
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <!-- Left Column: Upload & Files (2/3) -->
                    <div class="lg:col-span-2 space-y-6 md:space-y-8">
                        
                        <!-- 2. Primary Upload Card -->
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden">
                            <div class="p-4 md:p-8">
                                <!-- Drag & Drop Zone -->
                                <div id="uploadArea" class="relative group cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 sm:p-6 md:p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                                    <input type="file" id="fileInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept=".log,.txt,.csv,.json" multiple>
                                    
                                    <div class="relative z-0 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                                        <div class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 text-2xl md:text-3xl shadow-sm">
                                            📤
                                        </div>
                                        <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">Drag & drop log files</h3>
                                        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">or click to browse</p>
                                        
                                        <!-- Fallback Action -->
                                        <span class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors">
                                            Select Files
                                        </span>
                                    </div>
                                </div>

                                <!-- Supported Formats -->
                                <div class="mt-6 flex items-center justify-center gap-2 flex-wrap text-sm">
                                    <span class="text-gray-400 text-xs md:text-sm">Supported formats:</span>
                                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded text-xs font-mono font-medium">.log</span>
                                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded text-xs font-mono font-medium">.txt</span>
                                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded text-xs font-mono font-medium">.csv</span>
                                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded text-xs font-mono font-medium">.json</span>
                                </div>
                            </div>

                            <!-- 3. Log Ingestion Status (Hidden by default, shown during upload) -->
                            <div id="uploadStatus" class="hidden border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 p-4 md:p-6">
                                <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span class="animate-spin">⚙️</span> Ingestion Pipeline
                                </h4>
                                <div id="statusContent"></div>
                            </div>
                        </div>

                        <!-- 4. Uploaded Files List (Read-Only) -->
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 overflow-hidden">
                            <div class="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-between items-center">
                                <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Evidence Locker</h3>
                                <span class="text-[10px] sm:text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Read-Only</span>
                            </div>
                            <div class="w-full overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                                <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-700/20">
                                        <tr>
                                            <th class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Name</th>
                                            <th class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                                            <th class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                                            <th class="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Uploaded</th>
                                            <th class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Integrity</th>
                                        </tr>
                                    </thead>
                                    <tbody id="filesTableBody" class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        ${this.renderFilesRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Integrity Board (1/3) -->
                    <div class="lg:col-span-1 space-y-6">
                        <!-- 5. Forensic Integrity Indicators -->
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 p-6">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                                    🛡️
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Forensic Integrity</h3>
                                    <p class="text-xs text-gray-500">Chain of Custody Monitor</p>
                                </div>
                            </div>
                            
                            <div class="space-y-4">
                                <div class="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/30">
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Evidence Status</span>
                                        <span class="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">SECURE</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs text-green-700 dark:text-green-400">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Write-protection enabled
                                    </div>
                                </div>

                                <div class="py-3 border-b border-gray-100 dark:border-gray-700">
                                    <span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Active Handling</span>
                                    <p class="text-sm font-mono text-gray-600 dark:text-gray-300">Investigator_01 (Session ID: #8821X)</p>
                                </div>

                                <div class="py-3 border-b border-gray-100 dark:border-gray-700">
                                    <span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Evidence Size</span>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white">19.2 MB</p>
                                </div>
                                
                                <div class="pt-2">
                                    <span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Latest Hash (SHA-256)</span>
                                    <div class="font-mono text-[10px] text-gray-500 bg-gray-50 dark:bg-gray-700/50 p-2 rounded break-all border border-gray-100 dark:border-gray-700">
                                        e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Helper Tip -->
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 class="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">💡 Pro Tip</h4>
                            <p class="text-xs text-blue-800 dark:text-blue-300">
                                Use the "Investigate Logs" page to index and search through these files after ingestion is complete.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderFilesRows() {
        return this.uploadedFiles.map(file => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                        <span class="text-lg text-gray-400">📄</span>
                        <div class="flex flex-col">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">${file.name}</span>
                            <span class="text-xs text-gray-500 md:hidden">${file.size}</span>
                        </div>
                    </div>
                </td>
                <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                        ${file.source}
                    </span>
                </td>
                <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">${file.size}</td>
                <td class="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${file.time}</td>
                <td class="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        ${file.status}
                    </span>
                </td>
            </tr>
        `).join('');
    },

    async afterRender() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        // Drag and drop handlers
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            uploadArea.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
        }

        function unhighlight(e) {
            uploadArea.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
        }

        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) this.handleFileUpload(files[0]);
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) this.handleFileUpload(files[0]);
        });
    },

    async handleFileUpload(file) {
        const statusDiv = document.getElementById('uploadStatus');
        const statusContent = document.getElementById('statusContent');

        statusDiv.classList.remove('hidden');

        // Step 1: Initial Render
        // We separate the pipeline from the details to allow independent updates
        statusContent.innerHTML = `
            <div id="pipeline-container">
                ${Components.createIngestionSteps(0)}
            </div>
            <div id="ingestion-details" class="mt-6 space-y-4 transition-all duration-300">
                <div class="flex items-center justify-between text-sm font-medium">
                    <span class="text-gray-700 dark:text-gray-300">Processing: <span class="text-blue-600 dark:text-blue-400">${file.name}</span></span>
                    <span class="text-blue-600 dark:text-blue-400" id="progressText">0%</span>
                </div>
                <!-- Progress Bar -->
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style="width: 0%" id="progressBar"></div>
                </div>
                <div class="text-xs text-gray-500 font-mono" id="processStage">Initializing ingestion protocol...</div>
            </div>
        `;

        // Simulate Pipeline
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const processStage = document.getElementById('processStage');
        let progress = 0;
        let currentStepIndex = 0;

        const stages = [
            { pct: 20, text: 'Parsing log structure & headers...' },
            { pct: 40, text: 'Verifying checksums (SHA-256)...' },
            { pct: 60, text: 'Indexing events into evidence store...' },
            { pct: 80, text: 'Finalizing chain of custody record...' }
        ];

        const interval = setInterval(() => {
            progress += 2;
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.innerText = `${progress}%`;

            // Update stages text
            const stage = stages.find(s => progress === s.pct);
            if (stage && processStage) processStage.textContent = stage.text;

            // Smooth Pipeline Updates
            // Map progress to steps: 0-30% (0), 30-60% (1), 60-90% (2), 100% (3)
            let newStepIndex = 0;
            if (progress >= 30) newStepIndex = 1;
            if (progress >= 60) newStepIndex = 2;

            if (newStepIndex !== currentStepIndex) {
                currentStepIndex = newStepIndex;
                this.updatePipelineVisuals(currentStepIndex);
            }

            if (progress >= 100) {
                clearInterval(interval);
                this.updatePipelineVisuals(3); // Ensure final step is reached
                this.finishUpload(file);
            }
        }, 50); // Slightly faster for responsiveness
    },

    updatePipelineVisuals(stepIndex) {
        const steps = [
            { icon: '📤', label: 'Uploaded' },
            { icon: '⚙️', label: 'Parsed' },
            { icon: '🔍', label: 'Indexed' },
            { icon: '✅', label: 'Ready' }
        ];

        // 1. Update Line Width
        const line = document.getElementById('ingestion-progress-line');
        if (line) {
            const pct = (stepIndex / (steps.length - 1)) * 100;
            line.style.width = `${pct}%`;
        }

        // 2. Update Circles & Labels
        steps.forEach((step, index) => {
            const circle = document.getElementById(`step-circle-${index}`);
            const label = document.getElementById(`step-label-${index}`);
            if (!circle || !label) return;

            const active = index <= stepIndex;

            if (active) {
                // Active: Blue filled
                circle.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-400', 'bg-white', 'dark:bg-gray-900');
                circle.classList.add('bg-blue-600', 'border-blue-600', 'text-white', 'shadow-sm');

                // Text Active
                label.classList.remove('text-gray-400', 'font-medium');
                label.classList.add('text-blue-600', 'dark:text-blue-400', 'font-bold');

                circle.innerHTML = step.icon;
            } else {
                // Inactive: Gray border
                circle.classList.remove('bg-blue-600', 'border-blue-600', 'text-white', 'shadow-sm');
                circle.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-400', 'bg-white', 'dark:bg-gray-900');

                // Text Inactive
                label.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold');
                label.classList.add('text-gray-400', 'font-medium');

                circle.innerHTML = index + 1;
            }
        });
    },

    finishUpload(file) {
        const detailsDiv = document.getElementById('ingestion-details');
        // Update details only
        if (detailsDiv) {
            detailsDiv.innerHTML = `
            <div class="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
                <div class="text-green-500 mt-0.5">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <h4 class="text-sm font-bold text-green-900 dark:text-green-300">Ingestion Complete</h4>
                    <p class="text-xs text-green-700 dark:text-green-400 mt-1">File has been securely indexed and execution rights revoked.</p>
                </div>
            </div>
        `;
        }

        // Add to list
        const newFile = {
            name: file.name,
            source: 'Manual Upload',
            size: (file.size / 1024).toFixed(1) + ' KB',
            time: new Date().toLocaleString(),
            status: 'Ready',
            hash: 'Pending...'
        };
        this.uploadedFiles.unshift(newFile);

        // Re-render table row
        document.getElementById('filesTableBody').innerHTML = this.renderFilesRows();
    }
};
