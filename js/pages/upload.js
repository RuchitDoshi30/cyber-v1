// Upload Logs Page - Simulate log ingestion

const UploadPage = {
    uploadStatus: null,

    async render() {
        return `
            <div class="max-w-7xl mx-auto">
                <div class="page-header mb-6 md:mb-8 border-gray-200 dark:border-gray-700">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Upload Logs</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">Import log files for forensic analysis</p>
                </div>
                
                <div class="max-w-3xl mx-auto">
                    <!-- Upload Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 md:p-8 card-elevated border border-transparent dark:border-gray-700">
                        <!-- Upload Area -->
                        <div id="uploadArea" class="upload-area text-center py-12 md:py-16 px-4 md:px-6 mb-6 border-4 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400">
                            <div class="text-5xl md:text-7xl mb-4 animate-bounce">📤</div>
                            <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Drop log files here</h3>
                            <p class="text-gray-500 dark:text-gray-400 mb-5 text-base md:text-lg">or</p>
                            <label for="fileInput" class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base">
                                📁 Select Files
                            </label>
                            <input type="file" id="fileInput" class="hidden" accept=".log,.txt,.csv,.json" multiple>
                            <div class="mt-6 flex items-center justify-center gap-2 flex-wrap">
                                <p class="text-sm text-gray-500 dark:text-gray-400">Supported formats:</p>
                                <span class="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-mono text-gray-700 dark:text-gray-300">.log</span>
                                <span class="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-mono text-gray-700 dark:text-gray-300">.txt</span>
                                <span class="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-mono text-gray-700 dark:text-gray-300">.csv</span>
                                <span class="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-mono text-gray-700 dark:text-gray-300">.json</span>
                            </div>
                        </div>
                        
                        <!-- Upload Status -->
                        <div id="uploadStatus" class="hidden">
                            <div class="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
                                <h3 class="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                                    <span>📊</span> Upload Status
                                </h3>
                                <div id="statusContent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        // Drag and drop handlers
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });

        // File input handler
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });
    },

    async handleFileUpload(file) {
        const statusDiv = document.getElementById('uploadStatus');
        const statusContent = document.getElementById('statusContent');

        statusDiv.classList.remove('hidden');

        // Show processing status
        statusContent.innerHTML = `
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-3 mb-3">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 dark:border-blue-400"></div>
                    <span class="font-medium text-blue-900 dark:text-blue-300">Processing</span>
                </div>
                <p class="text-sm text-blue-700 dark:text-blue-400 mb-3">Uploading: ${file.name}</p>
                <div class="progress-bar bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div class="progress-fill bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%" id="progressBar"></div>
                </div>
            </div>
        `;

        // Simulate progress
        const progressBar = document.getElementById('progressBar');
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            if (progress >= 90) {
                clearInterval(progressInterval);
            }
        }, 150);

        try {
            // Simulate upload
            const result = await ApiService.uploadLogs(file);
            clearInterval(progressInterval);

            // Show success status
            statusContent.innerHTML = `
                <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-2xl">✅</span>
                        <span class="font-medium text-green-900 dark:text-green-300">Success</span>
                    </div>
                    <p class="text-sm text-green-700 dark:text-green-400">${result.message}</p>
                    <p class="text-sm text-green-600 dark:text-green-500 mt-2">Logs processed: ${result.logsProcessed}</p>
                </div>
            `;
        } catch (error) {
            clearInterval(progressInterval);

            // Show error status
            statusContent.innerHTML = `
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-2xl">❌</span>
                        <span class="font-medium text-red-900 dark:text-red-300">Failed</span>
                    </div>
                    <p class="text-sm text-red-700 dark:text-red-400">Upload failed. Please try again.</p>
                </div>
            `;
        }
    }
};
