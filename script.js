// Business 360 Interactive Functionality

class Business360App {
    constructor() {
        this.chart = null;
        this.aiChart = null;
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

        // AI Chat functionality
        const aiPromptBtn = document.getElementById('aiPromptBtn');
        aiPromptBtn?.addEventListener('click', () => this.showAiChatModal());

        const sendChatBtn = document.getElementById('sendChatBtn');
        sendChatBtn?.addEventListener('click', () => this.sendChatMessage());

        const chatInput = document.getElementById('chatInput');
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });

        // Example questions click handlers
        document.addEventListener('click', (e) => {
            if (e.target.matches('.example-questions li')) {
                const question = e.target.textContent;
                this.sendChatMessage(question);
            }
        });

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

        const closeAiModal = document.getElementById('closeAiModal');
        closeAiModal?.addEventListener('click', () => this.closeAiModal());

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

        const data = this.generatePulseLabsData(this.currentPeriod);
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Total Income',
                        data: data.income,
                        backgroundColor: '#22C55E', // Green for income
                        borderRadius: 4,
                        order: 2
                    },
                    {
                        label: 'Total Expenses',
                        data: data.expenses,
                        backgroundColor: '#EF4444', // Red for expenses
                        borderRadius: 4,
                        order: 2
                    },
                    {
                        label: 'Cash on Hand',
                        data: data.cashOnHand,
                        type: 'line',
                        borderColor: '#3B82F6', // Blue for cash line
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#3B82F6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        order: 1,
                        yAxisID: 'y1'
                    },
                    {
                        label: 'PNC Bank Projections',
                        data: data.projections,
                        type: 'line',
                        borderColor: '#6B7280', // Gray for projections
                        backgroundColor: 'transparent',
                        borderDash: [8, 4],
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#6B7280',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        order: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#21808D',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.parsed.y.toLocaleString();
                                return label;
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
                                size: 11
                            }
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: {
                            color: '#E5E5E5',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#626464',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return '$' + (value/1000).toFixed(0) + 'K';
                            }
                        },
                        max: Math.max(...data.income, ...data.expenses) * 1.1
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            color: '#626464',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return '$' + (value/1000).toFixed(0) + 'K';
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

    generatePulseLabsData(period) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
        const labels = [];
        const income = [];
        const expenses = [];
        const cashOnHand = [];
        const projections = [];
        
        // Data based on the Pulse Labs screenshot
        const monthlyData = [
            { income: 70000, expenses: 65000, cash: 85000 },
            { income: 75000, expenses: 61000, cash: 88000 },
            { income: 74000, expenses: 65500, cash: 103000 },
            { income: 69000, expenses: 80000, cash: 114000 },
            { income: 79000, expenses: 65000, cash: 102000 },
            { income: 71000, expenses: 59500, cash: 115000 },
            { income: 79000, expenses: 67000, cash: 124000 },
            { income: 70000, expenses: 95000, cash: 137000 },
            { income: 69500, expenses: 121000, cash: 112000 },
            { income: 40000, expenses: 25000, cash: 61000 },
            { income: 0, expenses: 0, cash: 74000 } // Projected
        ];
        
        let currentCash = 84849; // Starting cash
        
        for (let i = 0; i < Math.min(11, monthlyData.length); i++) {
            labels.push(months[i]);
            income.push(monthlyData[i].income);
            expenses.push(monthlyData[i].expenses);
            
            // Calculate cash on hand progression
            currentCash += (monthlyData[i].income - monthlyData[i].expenses);
            cashOnHand.push(currentCash);
            
            // Add projections for future months (last 2-3 months)
            if (i >= 8) {
                projections.push(currentCash + (Math.random() - 0.5) * 10000);
            } else {
                projections.push(null);
            }
        }
        
        return {
            labels,
            income,
            expenses,
            cashOnHand,
            projections
        };
    }

    changeTimePeriod(period) {
        this.currentPeriod = parseInt(period);
        
        // Update active pill
        document.querySelectorAll('.time-pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.period === period);
        });
        
        // Update chart with new Pulse Labs data
        const data = this.generatePulseLabsData(this.currentPeriod);
        this.chart.data.labels = data.labels;
        this.chart.data.datasets[0].data = data.income;
        this.chart.data.datasets[1].data = data.expenses;
        this.chart.data.datasets[2].data = data.cashOnHand;
        this.chart.data.datasets[3].data = data.projections;
        this.chart.update('active');
        
        // Update summary values
        this.updateSummaryValues(data);
    }

    updateSummaryValues(data) {
        // Update chart summary section
        const summaryValues = document.querySelectorAll('.summary-value');
        if (summaryValues.length >= 4) {
            const totalIncome = data.income.reduce((sum, val) => sum + val, 0);
            const totalExpenses = data.expenses.reduce((sum, val) => sum + val, 0);
            const beginningCash = 84849;
            const endingCash = data.cashOnHand[data.cashOnHand.length - 1];
            
            summaryValues[0].textContent = beginningCash.toLocaleString();
            summaryValues[1].textContent = totalIncome.toLocaleString();
            summaryValues[2].textContent = totalExpenses.toLocaleString();
            summaryValues[3].textContent = endingCash.toLocaleString();
        }
        
        // Update monthly averages
        const avgItems = document.querySelectorAll('.avg-item');
        if (avgItems.length >= 4) {
            const avgIncome = data.income.reduce((sum, val) => sum + val, 0) / data.income.length;
            const avgExpenses = data.expenses.reduce((sum, val) => sum + val, 0) / data.expenses.length;
            const avgCashStart = 104084;
            const avgCashEnd = 103068;
            
            avgItems[0].textContent = avgCashStart.toLocaleString();
            avgItems[1].textContent = Math.round(avgIncome).toLocaleString();
            avgItems[2].textContent = Math.round(avgExpenses).toLocaleString();
            avgItems[3].textContent = avgCashEnd.toLocaleString();
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
        const isLocked = card.classList.contains('locked');
        const featureName = card.dataset.feature;
        
        if (isLocked) {
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
            
            // Show gradient animation
            const gradientOverlay = document.getElementById('gradientOverlay');
            if (gradientOverlay) {
                gradientOverlay.classList.add('show');

                setTimeout(() => {
                    gradientOverlay.classList.add('fade-out');

                    setTimeout(() => {
                        this.simulateMultiBankView();
                        gradientOverlay.classList.remove('show');
                        gradientOverlay.classList.remove('fade-out');
                    }, 1000); // Fade out duration
                }, 3000); // Time for the gradient to show
            } else {
                // Fallback if gradient overlay is not found
                this.simulateMultiBankView();
            }
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
        
        // Add unlocked indicators to feature cards
        document.querySelectorAll('.feature-card.locked').forEach(card => {
            card.classList.remove('locked');
            card.classList.add('unlocked');
            const badge = card.querySelector('.feature-badge');
            if (badge) {
                badge.textContent = 'Unlocked';
                badge.classList.remove('locked');
                badge.classList.add('unlocked');
            }
        });

        // Show hyper-personalized insights
        const newInsights = document.querySelectorAll('.hyper-personalized-insight');
        newInsights.forEach(card => {
            card.style.display = 'block';
            card.addEventListener('click', () => this.toggleInsightCard(card));
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
            const aiChatModal = document.getElementById('aiChatModal');
            
            if (aiChatModal?.classList.contains('active')) {
                this.closeAiModal();
            } else if (modalOverlay?.classList.contains('active')) {
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

    showAiChatModal() {
        const aiChatModal = document.getElementById('aiChatModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (aiChatModal && modalOverlay) {
            modalOverlay.classList.add('active');
            aiChatModal.style.display = 'block';
            aiChatModal.classList.add('active');
            
            // Initialize mini chart
            setTimeout(() => {
                this.initializeAiChart();
            }, 100);
        }
    }

    closeAiModal() {
        const aiChatModal = document.getElementById('aiChatModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (aiChatModal && modalOverlay) {
            modalOverlay.classList.remove('active');
            aiChatModal.style.display = 'none';
            aiChatModal.classList.remove('active');
        }
    }

    initializeAiChart() {
        const ctx = document.getElementById('aiMiniChart')?.getContext('2d');
        if (!ctx) return;

        const data = this.generatePulseLabsData(this.currentPeriod);
        
        this.aiChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Total Income',
                        data: data.income,
                        backgroundColor: '#22C55E',
                        borderRadius: 4,
                        order: 2
                    },
                    {
                        label: 'Total Expenses',
                        data: data.expenses,
                        backgroundColor: '#EF4444',
                        borderRadius: 4,
                        order: 2
                    },
                    {
                        label: 'Cash on Hand',
                        data: data.cashOnHand,
                        type: 'line',
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#3B82F6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        order: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#E5E5E5'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: {
                            color: '#E5E5E5'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value/1000).toFixed(0) + 'K';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value/1000).toFixed(0) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    sendChatMessage(message = null) {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        const chatMessages = document.getElementById('chatMessages');
        
        const userMessage = message || chatInput?.value.trim();
        if (!userMessage) return;
        
        // Clear input
        if (chatInput) chatInput.value = '';
        
        // Add user message
        this.addChatMessage(userMessage, 'user');
        
        // Disable send button and show typing
        if (sendBtn) sendBtn.disabled = true;
        this.showTypingIndicator();
        
        // Simulate AI response
        setTimeout(() => {
            const response = this.generateAiResponse(userMessage);
            this.hideTypingIndicator();
            this.addChatMessage(response, 'ai');
            if (sendBtn) sendBtn.disabled = false;
        }, 1500 + Math.random() * 1000);
    }

    addChatMessage(message, type) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'ai' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    AI is thinking
                    <span class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateAiResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple response generation based on keywords
        if (lowerMessage.includes('expense') && lowerMessage.includes('september')) {
            return "I can see that September had a significant expense spike to $121K, which is much higher than your average of $71K. This appears to be driven by one-time costs. Would you like me to analyze the specific categories driving this increase?";
        }
        
        if (lowerMessage.includes('cash flow') || lowerMessage.includes('positive')) {
            return "Based on your current data, your cash flow shows some volatility but maintains an overall positive trajectory. Your ending cash position of $74.7K is lower than the beginning period, primarily due to the September expense spike. I'd recommend focusing on expense management in Q4.";
        }
        
        if (lowerMessage.includes('reduce') && lowerMessage.includes('expense')) {
            return "Great question! If you reduce expenses by 15%, that would save approximately $10.7K monthly based on your average. This could improve your ending cash position from $74.7K to around $85K, providing a much healthier buffer for operations.";
        }
        
        if (lowerMessage.includes('forecast') || lowerMessage.includes('predict')) {
            return "Based on your historical patterns, I predict your cash flow will stabilize around $70-80K monthly if you maintain current income levels and control the expense volatility we saw in September. Your PNC projections show a conservative outlook that aligns with this analysis.";
        }
        
        if (lowerMessage.includes('income')) {
            return "Your income shows good consistency, averaging $70.2K monthly with a range of $40K-$79K. The dip in October appears to be seasonal, but your core business income remains stable. I'd suggest exploring ways to boost the lower months.";
        }
        
        // Default responses
        const defaultResponses = [
            "That's an interesting question about your cash flow data. Based on the chart, I can see several trends that might be relevant. Could you be more specific about which aspect you'd like me to analyze?",
            "Looking at your financial data, I notice some patterns in your cash flow. What specific insights are you looking for to help with your business decisions?",
            "Your cash flow data shows both opportunities and areas for attention. I'd be happy to dive deeper into any specific metrics or time periods you're concerned about."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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