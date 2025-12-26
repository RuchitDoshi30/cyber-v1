// NL Query Page - Natural Language Interaction
const QueryPage = {
    messages: [],

    // Example queries from screenshot
    examples: [
        "Show me all critical errors in the last 24 hours",
        "Find failed login attempts from IP 192.168.1.45",
        "What anomalies were detected today?",
        "List all logs from Server-Auth-01",
        "Show correlated events related to data exfiltration"
    ],

    async render() {
        return `
            <div class="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
                <!-- Header -->
                <div class="mb-6 flex-shrink-0">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Natural Language Query</h1>
                    <p class="text-gray-600 dark:text-gray-400">Ask questions about your logs in plain English</p>
                </div>

                <!-- Main Content Grid -->
                <div class="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                    
                    <!-- Chat Panel (Left/Center - 3 Cols) -->
                    <div class="lg:col-span-3 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden relative">
                        
                        <!-- AI Identity Header -->
                        <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-800/50">
                            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-900 dark:text-white">AI Assistant</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Ask me anything about your log data</p>
                            </div>
                        </div>

                        <!-- Chat Area -->
                        <div id="chat-messages" class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                            ${this.messages.length === 0 ? this.renderEmptyState() : ''}
                        </div>

                        <!-- Input Area -->
                        <div class="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <div class="relative">
                                <textarea 
                                    id="query-input"
                                    class="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none custom-scrollbar transition-colors"
                                    placeholder="Type your question here..."
                                    rows="1"
                                    style="min-height: 48px; max-height: 120px;"
                                ></textarea>
                                <button 
                                    onclick="QueryPage.handleSubmit()"
                                    class="absolute right-3 bottom-3 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 z-10"
                                    title="Send Message"
                                >
                                    <svg class="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </button>
                            </div>
                            <div class="mt-2 text-center">
                                <p class="text-[10px] text-gray-400 dark:text-gray-500">AI can make mistakes. Verify important information.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar (Right - 1 Col) -->
                    <div class="lg:col-span-1 space-y-6 overflow-y-auto custom-scrollbar">
                        <!-- Example Queries Card -->
                        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/50 p-5 shadow-sm">
                            <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Example Queries</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Click to try these examples</p>
                            
                            <div class="space-y-2">
                                ${this.examples.map(ex => `
                                    <button 
                                        onclick="QueryPage.useExample('${ex.replace(/'/g, "\\'")}')"
                                        class="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-gray-700 border border-transparent hover:border-blue-200 dark:hover:border-gray-600 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 leading-relaxed group"
                                    >
                                        <span class="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${ex}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Capabilities Card -->
                         <div class="bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 p-5 shadow-sm">
                            <h3 class="text-sm font-bold text-blue-900 dark:text-blue-100 mb-3">Capabilities</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-200">
                                    <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                    Search across all log sources
                                </li>
                                <li class="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-200">
                                    <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                    Analyze security anomalies
                                </li>
                                <li class="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-200">
                                    <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                    Explain correlated events
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        `;
    },

    renderEmptyState() {
        return `
            <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
                <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <svg class="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Start a conversation</h2>
                <p class="text-gray-500 dark:text-gray-400 max-w-sm">
                    Try asking a question about your logs or use one of the examples on the right.
                </p>
            </div>
        `;
    },

    renderMessage(msg) {
        const isUser = msg.role === 'user';
        return `
            <div class="flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up">
                <div class="${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'} 
                            px-5 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm ${isUser ? 'rounded-br-sm' : 'rounded-bl-sm'}">
                    <p class="text-sm leading-relaxed whitespace-pre-wrap">${msg.text}</p>
                    ${!isUser ? `
                        <div class="mt-2 flex items-center gap-2">
                             <span class="text-[10px] opacity-50 uppercase tracking-wide font-bold">AI Assistant</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    async afterRender() {
        const input = document.getElementById('query-input');
        if (input) {
            // Auto expand text area
            input.addEventListener('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });

            // Handle Enter key
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSubmit();
                }
            });
        }

        // Restore messages if any
        if (this.messages.length > 0) {
            const container = document.getElementById('chat-messages');
            container.innerHTML = this.messages.map(m => this.renderMessage(m)).join('');
            this.scrollToBottom();
        }
    },

    async handleSubmit() {
        const input = document.getElementById('query-input');
        const text = input.value.trim();

        if (!text) return;

        // Add User Message
        this.addMessage('user', text);
        input.value = '';
        input.style.height = 'auto'; // Reset height

        // Simulate thinking + Response
        const container = document.getElementById('chat-messages');
        const loadingId = 'loading-' + Date.now();

        // Add Loading Bubble
        const loadingHtml = `
            <div id="${loadingId}" class="flex justify-start animate-fade-in-up">
                <div class="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="flex gap-1.5">
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', loadingHtml);
        this.scrollToBottom();

        // Simulate Delay
        await new Promise(r => setTimeout(r, 1200));

        // Remove Loading
        document.getElementById(loadingId)?.remove();

        // Add Bot Response
        this.addMessage('assistant', this.generateResponse(text));
    },

    addMessage(role, text) {
        this.messages.push({ role, text, timestamp: new Date() });

        // If this was the first message, clear empty state
        if (this.messages.length === 1) {
            const container = document.getElementById('chat-messages');
            container.innerHTML = ''; // Remove empty state
        }

        const container = document.getElementById('chat-messages');
        if (container) {
            container.insertAdjacentHTML('beforeend', this.renderMessage({ role, text }));
            this.scrollToBottom();
        }
    },

    scrollToBottom() {
        const container = document.getElementById('chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    },

    useExample(text) {
        const input = document.getElementById('query-input');
        if (input) {
            input.value = text;
            input.focus();
            // Optional: Auto submit
            // this.handleSubmit(); 
            // Better to let user review first as per common UX, but requirements say "Optionally auto-submits".
            // I'll auto-expand height
            input.style.height = 'auto';
            input.style.height = (input.scrollHeight) + 'px';
        }
    },

    generateResponse(query) {
        // Simple heuristic response generation (Frontend Simulation)
        const q = query.toLowerCase();

        if (q.includes('critical') || q.includes('error')) {
            return "Based on the analysis of the last 24 hours, I found **2 Critical Errors**:\n\n1. `Multiple failed login attempts detected` (Server-01, 10:22 AM)\n2. `Unauthorized file access` (File-Server-01, 12:03 PM)\n\nWould you like to see the full log details for these events?";
        }

        if (q.includes('192.168.1.45') || q.includes('ip')) {
            return "Searching logs for IP **192.168.1.45**...\n\nI found 12 events associated with this IP address in the `Server-Auth` logs. The activity pattern indicates a potential Brute Force attack starting at 14:32:18.\n\nRecommended Action: Block this IP address in the firewall configuration.";
        }

        if (q.includes('anomaly') || q.includes('anomalies')) {
            return "I have detected **4 High-Confidence Anomalies** today:\n\n- **Authentication Anomaly** (94% confidence)\n- **Data Exfiltration Pattern** (78% confidence)\n- **Privilege Escalation** (91% confidence)\n\nThese anomalies have been flagged for manual review.";
        }

        if (q.includes('server-auth-01')) {
            return "Listing logs for source **Server-Auth-01** (Last 10 entries):\n\n- `[INFO] Service started` (08:00 AM)\n- `[WARN] Connection timeout` (08:45 AM)\n- `[CRITICAL] Auth failure user=root` (09:15 AM)\n\nThere are 450 total logs for this source.";
        }

        return "I've analyzed the logs based on your query. I found several entries that match your criteria. The dashboard has been updated to highlight these events. Is there anything specific you would like to drill down into?";
    }
};

window.QueryPage = QueryPage;
