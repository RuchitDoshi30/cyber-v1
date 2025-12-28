// Main App Controller - Navigation and routing

const App = {
    currentPage: 'dashboard',

    pages: {
        dashboard: DashboardPage,
        upload: UploadPage,
        investigate: InvestigatePage,
        search: SearchPage,
        insights: InsightsPage,
        reports: ReportsPage,
        query: QueryPage
    },

    init() {
        this.setupNavigation();

        // Restore previous session state or default to dashboard
        const savedPage = localStorage.getItem('cyber_active_page');
        const startPage = this.pages[savedPage] ? savedPage : 'dashboard';

        this.loadPage(startPage);
    },

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page);
            });
        });
    },

    async loadPage(pageName) {
        if (!this.pages[pageName]) {
            console.error('Page not found:', pageName);
            return;
        }

        // Update current page
        this.currentPage = pageName;

        // Persist navigation state (State Persistence Feature)
        localStorage.setItem('cyber_active_page', pageName);

        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');

                // Close mobile menu if open
                if (window.innerWidth < 1024 && typeof window.closeMobileMenu === 'function') {
                    window.closeMobileMenu();
                }

                // Update Page Title and Breadcrumb in Header
                const title = link.querySelector('.font-medium').textContent;
                const pageTitleEl = document.getElementById('page-title');
                const breadcrumbEl = document.getElementById('page-breadcrumbs');

                if (pageTitleEl) pageTitleEl.textContent = title;
                if (breadcrumbEl) breadcrumbEl.textContent = `/ ${title}`;
            }
        });

        // Show loading state
        const contentDiv = document.getElementById('page-content');
        contentDiv.innerHTML = Components.createLoadingSpinner();

        // Load page content
        try {
            const page = this.pages[pageName];
            const html = await page.render();
            contentDiv.innerHTML = html;

            // Call afterRender if exists
            if (page.afterRender) {
                await page.afterRender();
            }

            // Scroll main container to top (not contentDiv)
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                mainContainer.scrollTop = 0;
            }
        } catch (error) {
            console.error('Error loading page:', error);
            contentDiv.innerHTML = `
                <div class="text-center py-12">
                    <div class="text-6xl mb-4">⚠️</div>
                    <p class="text-gray-500 text-lg">Failed to load page. Please try again.</p>
                </div>
            `;
        }
    }
};

// Global function to close modal
window.closeModal = function () {
    document.getElementById('modal-container').innerHTML = '';
};

// Global function for Anomaly Drill-Down
window.viewAnomalyLogs = function (logIdsStr, description, severity) {
    // Parse IDs
    const ids = logIdsStr ? logIdsStr.split(',').filter(id => id.trim() !== '') : [];

    // Set Context in Investigate Page
    if (window.investigatePage) {
        window.investigatePage.setContext({
            ids: ids,
            description: decodeURIComponent(description),
            severity: severity
        });

        // Navigate
        App.loadPage('investigate');
    } else {
        console.error('InvestigatePage module not loaded');
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
