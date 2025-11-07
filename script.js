// Business 360 Interactive Functionality

class Business360App {
    constructor() {
        this.chart = null;
        this.currentPeriod = 30;
        this.notifications = ['low-balance'];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeChart();
        this.setupAnimations();
        this.updateNotifications();
        
        // Simulate loading delay for smooth animations
        setTimeout(() => {
            this.animateOnLoad();
        }, 100);
    }

    setupEventListeners() {
        // Navigation
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const closeSidebar = document.getElementById('closeSidebar');

        hamburgerBtn?.addEventListener('click', () => this.toggleSidebar());
        sidebarOverlay?.addEventListener('click', () => this.closeSidebar());
        closeSidebar?.addEventListener('click', () => this.closeSidebar());

        // Time period selector
        const timePills = document.querySelectorAll('.time-pill');
        timePills.forEach(pill => {
            pill.addEventListener('click', (e) => this.changeTimePeriod(e.target.dataset.period));
        });

        // Insight cards
        const insightCards = document.querySelectorAll('.insight-card');
        insightCards.forEach(card => {
            card.addEventListener('click', () => this.toggleInsightCard(card));
        });

        // Feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('click', () => this.handleFeatureClick(card));
        });

        // CTA buttons
        const connectBanksBtn = document.getElementById('connectBanksBtn');
        connectBanksBtn?.addEventListener('click', () => this.showConnectBanksModal());

        const dismissCta = document.getElementById('dismissCta');
        dismissCta?.addEventListener('click', () => this.dismissUpgradeCta());

        // Modal functionality
        this.setupModalEvents();

        // Info icon tooltip
        const infoIcon = document.getElementById('infoIcon');
        if (infoIcon) {
            infoIcon.addEventListener('mouseenter', (e) => this.showTooltip(e, 'Connect more banks for complete cash visibility'));
            infoIcon.addEventListener('mouseleave', () => this.hideTooltip());
            infoIcon.addEventListener('click', (e) => this.showTooltip(e, 'Connect more banks for complete cash visibility'));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Touch events for mobile
        this.setupTouchEvents();
    }

    setupModalEvents() {
        const modalOverlay = document.getElementById('modalOverlay');
        const closeModalBtns = document.querySelectorAll('.close-modal');

        modalOverlay?.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Bank option clicks
        const bankOptions = document.querySelectorAll('.bank-option');
        bankOptions.forEach(option => {
            option.addEventListener('click', () => this.selectBank(option.textContent));
        });
    }

    setupTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;

        // Swipe to dismiss CTA
        const upgradeCta = document.getElementById('upgradeCta');
        if (upgradeCta) {
            upgradeCta.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });

            upgradeCta.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;

                // Swipe right to dismiss
                if (deltaX > 100 && Math.abs(deltaY) < 50) {
                    this.dismissUpgradeCta();
                }
            });
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburgerBtn');
        
        sidebar?.classList.toggle('open');
        hamburger?.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = sidebar?.classList.contains('open') ? 'hidden' : '';
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburgerBtn');
        
        sidebar?.classList.remove('open');
        hamburger?.classList.remove('active');
        document.body.style.overflow = '';
    }

    initializeChart() {
        const ctx = document.getElementById('cashFlowChart')?.getContext('2d');
        if (!ctx) return;

        const data = this.generateChartData(this.currentPeriod);
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Cash Flow',
                    data: data.values,
                    borderColor: '#21808D',
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return null;
                        
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, 'rgba(33, 128, 141, 0.05)');
                        gradient.addColorStop(0.5, 'rgba(33, 128, 141, 0.15)');
                        gradient.addColorStop(1, 'rgba(33, 128, 141, 0.3)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#21808D',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#21808D',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `$${context.parsed.y.toLocaleString()}`;
                            },
                            afterLabel: function(context) {
                                const currentValue = context.parsed.y;
                                const previousIndex = Math.max(0, context.dataIndex - 1);
                                const previousValue = context.dataset.data[previousIndex];
                                const change = currentValue - previousValue;
                                const symbol = change >= 0 ? '↑' : '↓';
                                return `${symbol} $${Math.abs(change).toLocaleString()} from previous day`;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    x: {
                        grid: {
                            color: '#E5E5E5',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#626464',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: '#E5E5E5',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#626464',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    generateChartData(period) {
        const now = new Date();
        const labels = [];
        const values = [];
        
        // Generate realistic cash flow data
        let baseValue = 42350;
        const volatility = 5000;
        
        for (let i = period - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            if (period <= 7) {
                labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            } else if (period <= 30) {
                labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            } else {
                labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
            }
            
            // Simulate cash flow fluctuations
            const randomChange = (Math.random() - 0.5) * volatility * 0.4;
            const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1;
            baseValue += randomChange * weekendFactor;
            
            // Add some trend patterns
            if (i < period * 0.3) {
                baseValue += 1000; // Recent upward trend
            }
            
            values.push(Math.round(baseValue));
        }
        
        return { labels, values };
    }

    changeTimePeriod(period) {
        this.currentPeriod = parseInt(period);
        
        // Update active pill
        document.querySelectorAll('.time-pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.period === period);
        });
        
        // Update chart
        const data = this.generateChartData(this.currentPeriod);
        this.chart.data.labels = data.labels;
        this.chart.data.datasets[0].data = data.values;
        this.chart.update('active');
        
        // Update current balance
        const currentBalance = document.querySelector('.current-balance');
        if (currentBalance && data.values.length > 0) {
            const latestValue = data.values[data.values.length - 1];
            currentBalance.textContent = `$${latestValue.toLocaleString()}`;
            this.animateNumber(currentBalance, latestValue);
        }
    }

    toggleInsightCard(card) {
        const isExpanded = card.classList.contains('expanded');
        
        // Close all other cards
        document.querySelectorAll('.insight-card').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Toggle current card
        card.classList.toggle('expanded', !isExpanded);
        
        // Animate expansion
        const details = card.querySelector('.insight-details');
        if (details) {
            if (!isExpanded) {
                details.style.maxHeight = details.scrollHeight + 'px';
            } else {
                details.style.maxHeight = '0px';
            }
        }
        
        // Update accessibility
        const expandBtn = card.querySelector('.expand-btn');
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', !isExpanded);
        }
    }

    handleFeatureClick(card) {
        const isPremium = card.classList.contains('premium');
        const featureName = card.dataset.feature;
        
        if (isPremium) {
            this.showUpgradeModal(featureName);
        } else {
            // Handle free feature clicks
            this.showFeatureDetail(featureName);
        }
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    showUpgradeModal(featureName = '') {
        const modalOverlay = document.getElementById('modalOverlay');
        const upgradeModal = document.getElementById('upgradeModal');
        
        if (modalOverlay && upgradeModal) {
            modalOverlay.classList.add('active');
            upgradeModal.style.display = 'block';
            
            // Update modal content based on feature
            const modalContent = upgradeModal.querySelector('.modal-content p');
            if (modalContent && featureName) {
                const featureMessages = {
                    'real-time-balance': 'Get real-time balance visibility across all your business accounts.',
                    'ai-forecasting': 'Unlock AI-powered cash flow forecasting with 95% accuracy.',
                    'fraud-protection': 'Enable advanced fraud detection across all connected accounts.',
                    'invoice-automation': 'Automate your invoicing and receivables management.',
                    'expense-analytics': 'Get detailed expense analytics and tax-ready reports.'
                };
                modalContent.textContent = featureMessages[featureName] || modalContent.textContent;
            }
        }
    }

    showConnectBanksModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        const connectBanksModal = document.getElementById('connectBanksModal');
        
        if (modalOverlay && connectBanksModal) {
            modalOverlay.classList.add('active');
            connectBanksModal.style.display = 'block';
        }
    }

    closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        const modals = document.querySelectorAll('.modal');
        
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    }

    selectBank(bankName) {
        // Simulate bank connection process
        this.showLoadingState(`Connecting to ${bankName}...`);
        
        setTimeout(() => {
            this.hideLoadingState();
            this.showSuccessMessage(`Successfully connected to ${bankName}!`);
            this.closeModal();
            
            // Simulate UI updates after bank connection
            setTimeout(() => {
                this.simulateMultiBankView();
            }, 1000);
        }, 2000);
    }

    showLoadingState(message) {
        // Create or update loading overlay
        let loadingOverlay = document.getElementById('loadingOverlay');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'loadingOverlay';
            loadingOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                z-index: 3000;
                font-size: 1rem;
                color: var(--text-primary);
            `;
            document.body.appendChild(loadingOverlay);
        }
        
        loadingOverlay.innerHTML = `
            <div style="width: 40px; height: 40px; border: 3px solid #E5E5E5; border-top: 3px solid #21808D; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 16px;"></div>
            <div>${message}</div>
        `;
        loadingOverlay.style.display = 'flex';
    }

    hideLoadingState() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    showSuccessMessage(message) {
        // Create success toast
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #22C55E;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 3000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    simulateMultiBankView() {
        // Update account filter badge
        const filterBadge = document.querySelector('.filter-badge span');
        if (filterBadge) {
            filterBadge.textContent = 'All Connected Banks';
            filterBadge.parentElement.classList.add('multi-bank');
        }
        
        // Update current balance with multi-bank total
        const currentBalance = document.querySelector('.current-balance');
        if (currentBalance) {
            this.animateNumber(currentBalance, 87650);
        }
        
        // Hide upgrade CTA
        this.dismissUpgradeCta();
        
        // Add premium indicators to feature cards
        document.querySelectorAll('.feature-card.premium').forEach(card => {
            card.classList.remove('premium');
            card.classList.add('unlocked');
            const badge = card.querySelector('.feature-badge');
            if (badge) {
                badge.textContent = 'Unlocked';
                badge.classList.remove('premium');
                badge.classList.add('unlocked');
            }
        });
    }

    dismissUpgradeCta() {
        const upgradeCta = document.getElementById('upgradeCta');
        if (upgradeCta) {
            upgradeCta.style.transform = 'translateX(100%)';
            upgradeCta.style.opacity = '0';
            setTimeout(() => {
                upgradeCta.style.display = 'none';
            }, 300);
        }
    }

    showFeatureDetail(featureName) {
        // For free features, show a simple info message
        this.showSuccessMessage('This feature is available with your current plan!');
    }

    showTooltip(event, message) {
        const tooltip = document.getElementById('tooltip');
        if (!tooltip) return;
        
        tooltip.querySelector('.tooltip-content').textContent = message;
        tooltip.classList.add('active');
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.bottom + 8 + 'px';
        tooltip.style.transform = 'translateX(-50%)';
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.classList.remove('active');
        }
    }

    updateNotifications() {
        const notificationBadge = document.getElementById('notificationBadge');
        if (notificationBadge && this.notifications.length > 0) {
            notificationBadge.classList.add('active');
        }
    }

    animateNumber(element, targetValue) {
        const startValue = parseInt(element.textContent.replace(/[$,]/g, '')) || 0;
        const difference = targetValue - startValue;
        const duration = 1000;
        const steps = 60;
        const stepValue = difference / steps;
        const stepDuration = duration / steps;
        
        let currentValue = startValue;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            currentValue += stepValue;
            
            if (step >= steps) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            element.textContent = `$${Math.round(currentValue).toLocaleString()}`;
        }, stepDuration);
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe animated elements
        document.querySelectorAll('[class*="fadeIn"], [class*="slideIn"]').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    animateOnLoad() {
        // Stagger animations for insight cards
        const insightCards = document.querySelectorAll('.insight-card');
        insightCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
        
        // Animate feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, 600 + index * 50);
        });
    }

    handleKeyboardNavigation(event) {
        // ESC key closes modals and sidebar
        if (event.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            const modalOverlay = document.getElementById('modalOverlay');
            
            if (modalOverlay?.classList.contains('active')) {
                this.closeModal();
            } else if (sidebar?.classList.contains('open')) {
                this.closeSidebar();
            }
        }
        
        // Tab navigation enhancement
        if (event.key === 'Tab') {
            // Add visible focus indicators for keyboard navigation
            document.body.classList.add('keyboard-navigation');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Business360App();
});

// Handle clicks to remove keyboard navigation class
document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Smooth scroll behavior
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Redraw chart on orientation change
        const app = window.business360App;
        if (app && app.chart) {
            app.chart.resize();
        }
    }, 300);
});

// Add CSS for unlocked features and multi-bank state
const additionalStyles = `
.feature-badge.unlocked {
    background: #22C55E !important;
    color: white !important;
}

.filter-badge.multi-bank {
    background: linear-gradient(135deg, #21808D, #1E3A8A) !important;
    color: white !important;
}

.filter-badge.multi-bank .info-icon {
    color: rgba(255, 255, 255, 0.8) !important;
}

.keyboard-navigation *:focus-visible {
    outline: 2px solid #21808D !important;
    outline-offset: 2px !important;
}

@keyframes slideOutRight {
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);