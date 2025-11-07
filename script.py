
import pandas as pd

# Create comprehensive feature specification for Business 360 mobile-first approach

feature_structure = {
    'Screen_Section': [
        'Navigation (Sidebar)',
        'Hero Section (Top 40%)',
        'Hero Section (Top 40%)',
        'Hero Section (Top 40%)',
        'Insights Panel (Middle 35%)',
        'Insights Panel (Middle 35%)',
        'Insights Panel (Middle 35%)',
        'Insights Panel (Middle 35%)',
        'Upgrade CTA (Bottom 25%)',
        'Upgrade CTA (Bottom 25%)',
        'Upgrade CTA (Bottom 25%)',
        'Feature Cards (Below fold)',
        'Feature Cards (Below fold)',
        'Feature Cards (Below fold)',
        'Feature Cards (Below fold)',
        'Feature Cards (Below fold)',
        'Feature Cards (Below fold)'
    ],
    'Component': [
        'Sidebar Menu Item',
        'Cash Flow Graph',
        'Account Filter Badge',
        'Time Period Selector',
        'Generic Insight Card 1',
        'Generic Insight Card 2',
        'Generic Insight Card 3',
        'View All Insights Link',
        'Upgrade Banner Container',
        'Unlock Premium Features CTA',
        'Bank Connection Button',
        'Real-Time Balance Card',
        'AI Forecasting Card',
        'Payment Processing Card',
        'Fraud Detection Card',
        'Receivables Management Card',
        'Advanced Analytics Card'
    ],
    'Description': [
        '"Business 360" tab in left sidebar navigation',
        'Interactive line/area chart showing 30-day cash flow trend from PNC only',
        'Badge showing "PNC Bank Only" with info icon',
        'Toggle between 7D, 30D, 90D, 1Y views',
        'Alert: "Low balance detected - Consider moving $5K from savings"',
        'Info: "Your average daily balance is 15% higher than last month"',
        'Warning: "3 upcoming payments totaling $12,500 in next 7 days"',
        'Link to full insights dashboard',
        'Premium tier promotion box with gradient background',
        'Headline + subtitle explaining multi-bank benefits',
        'Primary action button to connect additional banks',
        'View all account balances in real-time across banks',
        '7-30 day ML-powered cash flow predictions',
        'ACH, wire, mobile check deposit, recurring payments',
        'Positive Pay for checks & ACH, anomaly detection',
        'Automated invoicing, payment links, reminders',
        'Expense categorization, budgets, trends'
    ],
    'Mobile_UX_Treatment': [
        'Fixed sidebar, collapsible on mobile, "Business 360" icon with notification badge',
        'Full-width interactive chart, pinch-to-zoom, swipe for date range',
        'Top-right corner badge, tappable for account details',
        'Horizontal scrolling pill selector, smooth animations',
        'Card with icon, bold headline, expandable detail',
        'Card with icon, bold headline, expandable detail',
        'Card with icon, bold headline, expandable detail',
        'Small text link with chevron icon',
        'Sticky card with rounded corners, shadow, gradient bg',
        'Large heading + 2-3 line description',
        'Full-width primary button, prominent placement',
        'Scrollable card, swipe between accounts',
        'Card with chart preview, tap to expand',
        'Card with quick actions, tap to process payment',
        'Card with status indicators, tap for details',
        'Card with invoice list, tap to manage',
        'Card with expense breakdown, tap for full analytics'
    ],
    'Visual_Design': [
        'Teal icon (#21808D), white text on dark bg',
        'Gradient blue-to-teal line, grid background, axis labels',
        'Light gray pill badge with PNC logo',
        'Pills with active state (teal bg), inactive (gray outline)',
        'Yellow warning icon, white card bg, 12px padding',
        'Blue info icon, white card bg, 12px padding',
        'Orange alert icon, white card bg, 12px padding',
        'Small gray text, right arrow icon',
        'Gradient teal-to-blue bg, white text, 16px padding',
        'Bold 18px headline, 14px description text',
        'Teal button (#21808D), white text, rounded 8px',
        'White card, account logo, balance in large text',
        'Chart icon, forecast range displayed',
        'Dollar icon, payment type badges',
        'Shield icon, security status indicator',
        'Invoice icon, count badge',
        'Pie chart icon, category breakdown'
    ],
    'Interaction_Pattern': [
        'Tap to navigate, active state highlighted',
        'Tap data point for details tooltip, swipe for date range',
        'Tap badge to see account connection settings',
        'Tap pill to change time period, smooth transition',
        'Tap to expand full recommendation details',
        'Tap to expand historical comparison view',
        'Tap to see payment schedule detail',
        'Tap to navigate to insights dashboard',
        'Visible when scrolling, persistent on screen',
        'Tap "Learn More" to see feature comparison',
        'Tap to initiate bank connection flow (Plaid)',
        'Tap to see transaction list, swipe to refresh',
        'Tap to see detailed forecast breakdown',
        'Tap to quick-process saved payment',
        'Tap to review fraud alerts, swipe to dismiss',
        'Tap to send invoice, swipe to see aging',
        'Tap to see full expense report by category'
    ],
    'Data_Source': [
        'Static navigation config',
        'PNC Bank API (real-time transaction data)',
        'Connected accounts metadata',
        'User preference (default: 30D)',
        'ML model analyzing PNC transaction patterns',
        'Calculated from PNC historical balances',
        'PNC scheduled transaction data',
        'Internal routing',
        'Marketing content + feature flags',
        'Static copy with dynamic benefit calculations',
        'Plaid integration or OAuth flow',
        'Connected bank APIs (real-time)',
        'ML forecasting engine',
        'Payment processing service APIs',
        'Fraud detection ML model',
        'Invoice management system',
        'Expense categorization engine'
    ],
    'Premium_Indicator': [
        'None (always visible)',
        'Free tier (PNC only)',
        'Free tier indicator',
        'Free tier (always visible)',
        'Free tier (generic)',
        'Free tier (generic)',
        'Free tier (generic)',
        'Free tier (always visible)',
        'UPGRADE PROMPT',
        'UPGRADE PROMPT',
        'UPGRADE PROMPT',
        'Premium feature (multi-bank)',
        'Premium feature',
        'Free tier (basic)',
        'Premium feature',
        'Premium feature',
        'Premium feature'
    ]
}

features_df = pd.DataFrame(feature_structure)

# Create detailed screen layout specification
screen_layout = """
╔════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                       BUSINESS 360: MOBILE-FIRST SCREEN LAYOUT                                     ║
║                            PNC Bank Cash Flow Management                                            ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ SCREEN LAYOUT OVERVIEW                                                                             │
│ Mobile Viewport: 375px width (iPhone standard) | Scrollable vertical layout                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════════════════════════════
ZONE 1: NAVIGATION (Fixed Top Bar, 60px height)
═══════════════════════════════════════════════════════════════════════════════════════════════════════

Component: Collapsible Sidebar Menu + Top Bar
├─ Hamburger Menu Icon (Left): Teal (#21808D), 24px × 24px
├─ "Business 360" Title (Center): 18px bold, dark gray (#1F2121)
├─ Notification Badge (Right): Red dot if alerts present
└─ Background: White with bottom border shadow

Mobile Treatment:
  • Sidebar collapses to hamburger menu on <768px screens
  • "Business 360" active state: Teal text + teal left border (4px)
  • Tap hamburger → Full-screen overlay sidebar slides from left
  • Other menu items: Dashboard, Payments, Reports, Settings


═══════════════════════════════════════════════════════════════════════════════════════════════════════
ZONE 2: HERO SECTION - CASH FLOW GRAPH (Top 40% of viewport, ~280px height)
═══════════════════════════════════════════════════════════════════════════════════════════════════════

Component 1: Account Filter Badge
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [PNC Bank Logo] PNC Bank Only  [i]                                              Last updated: 2m  │
│  Light gray pill badge (bg: #F5F5F5), 12px padding, rounded 20px                                   │
│  Tap [i] icon → Tooltip: "Connect more banks for complete cash visibility"                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Component 2: Interactive Cash Flow Graph
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         Cash Flow Trend (Last 30 Days)                                             │
│                                                                                                     │
│   $50K ┤                                              ╱╲                                           │
│        │                                   ╱╲    ╱╲  ╱  ╲                                         │
│   $40K ┤                        ╱╲    ╱╲  ╱  ╲  ╱  ╲╱    ╲                                        │
│        │             ╱╲    ╱╲  ╱  ╲  ╱  ╲╱    ╲╱                                                   │
│   $30K ┤   ╱╲    ╱╲ ╱  ╲  ╱  ╲╱    ╲╱                                                              │
│        │  ╱  ╲  ╱  ╲                                                                               │
│   $20K ┤ ╱    ╲╱                                                                                   │
│        │                                                                                            │
│   $10K ┼────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬             │
│         Nov 1  Nov 5  Nov 10 Nov 15 Nov 20 Nov 25 Nov 30                                          │
│                                                                                                     │
│  Design: Gradient area chart (teal to transparent), white grid lines, smooth curves               │
│  Interaction: Tap any point → Tooltip shows exact balance + date                                  │
│  Swipe left/right: Change date range | Pinch: Zoom in/out                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Component 3: Time Period Selector (Horizontal scroll)
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [ 7D ]  [ 30D ]  [ 90D ]  [ 1Y ]  [ All ]                                                        │
│  Pills: Active (teal bg #21808D, white text) | Inactive (gray outline, dark text)                 │
│  Horizontal scrolling on mobile, smooth scroll snap                                                │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Visual Design Details:
  • Graph container: White bg, subtle shadow (0 2px 8px rgba(0,0,0,0.06))
  • Rounded corners: 12px
  • Padding: 16px all sides
  • Gradient: Linear from rgba(33,128,141,0.3) to rgba(33,128,141,0.05)
  • Grid lines: Light gray (#E5E5E5), 1px
  • Current balance indicator: Large bold text "$42,350" top-right corner


═══════════════════════════════════════════════════════════════════════════════════════════════════════
ZONE 3: INSIGHTS PANEL (Middle 35% of viewport, ~250px height)
═══════════════════════════════════════════════════════════════════════════════════════════════════════

Header:
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Insights                                                                     View All →           │
│  14px gray text                                                              12px teal link        │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Component: Generic Insight Cards (Vertical stack, 3 cards visible)

Card 1: Low Balance Alert
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ⚠️  Low balance detected                                                      [>]                │
│                                                                                                     │
│  Your checking balance ($8,420) is below your typical minimum. Consider                           │
│  moving $5,000 from savings to maintain comfortable operating buffer.                             │
│                                                                                                     │
│  • Background: White card, yellow left border (4px), subtle shadow                                │
│  • Icon: Warning triangle (⚠️), 24px, orange (#E68161)                                            │
│  • Tap: Expand to show transfer options                                                           │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Card 2: Positive Trend
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  📈  Balance trending up                                                       [>]                │
│                                                                                                     │
│  Your average daily balance is 15% higher than last month ($38,200 vs                             │
│  $33,200). Great cash management!                                                                 │
│                                                                                                     │
│  • Background: White card, green left border (4px), subtle shadow                                 │
│  • Icon: Chart up (📈), 24px, green (#22C55E)                                                     │
│  • Tap: Expand to show month-over-month comparison                                                │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Card 3: Upcoming Payments
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  💳  Upcoming payments                                                          [>]                │
│                                                                                                     │
│  You have 3 scheduled payments totaling $12,500 in the next 7 days.                               │
│  Nov 10: Supplier invoice ($8,000) | Nov 12: Payroll ($4,200) | Nov 14: Rent ($300)              │
│                                                                                                     │
│  • Background: White card, blue left border (4px), subtle shadow                                  │
│  • Icon: Credit card (💳), 24px, blue (#3B82F6)                                                   │
│  • Tap: Expand to show full payment schedule                                                      │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Design System:
  • Card padding: 16px
  • Card margin: 12px between cards
  • Border radius: 8px
  • Left accent border: 4px solid (color by severity)
  • Typography: 16px bold headline, 14px body text
  • Expandable: Tap card → Smooth expand animation (300ms ease)


═══════════════════════════════════════════════════════════════════════════════════════════════════════
ZONE 4: UPGRADE CTA BANNER (Bottom 25% of viewport, ~180px height - STICKY)
═══════════════════════════════════════════════════════════════════════════════════════════════════════

Component: Premium Upgrade Prompt (Persistent, sticky on scroll)

┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                     │
│  ✨ Take Your Business to the Next Level                                                          │
│                                                                                                     │
│  Unlock hyper-personalized insights by connecting all your business accounts.                     │
│  Get AI-powered forecasting, fraud detection across all banks, and consolidated                   │
│  cash visibility—not just PNC.                                                                    │
│                                                                                                     │
│  Benefits with Multi-Bank Access:                                                                 │
│  ✓ Consolidate cash from Chase, Wells Fargo, Bank of America, and 12,000+ banks                  │
│  ✓ AI predicts cash flow 30-90 days ahead with 95% accuracy                                      │
│  ✓ Identify fraud patterns across ALL accounts, not just one bank                                │
│  ✓ Real-time alerts when balances drop across your entire cash position                          │
│                                                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────────────────────┐        │
│  │  [🔗]  Connect Additional Bank Accounts  →                                           │        │
│  │  Primary button, full width, teal bg (#21808D), white text, 48px height              │        │
│  └──────────────────────────────────────────────────────────────────────────────────────┘        │
│                                                                                                     │
│  Learn more about premium features  →                                                             │
│  (Small gray link, 12px)                                                                           │
│                                                                                                     │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Visual Design:
  • Background: Gradient from teal (#21808D) to blue (#1E3A8A), 20% opacity overlay
  • Border: 1px solid rgba(33,128,141,0.2)
  • Border radius: 12px (top corners only if sticky to bottom)
  • Padding: 20px all sides
  • Shadow: 0 -4px 12px rgba(0,0,0,0.1) (upward shadow)
  • Icon: Sparkles emoji (✨) or stars icon, 32px
  • Text color: Dark gray (#1F2121) on light bg variant
  • Button: Prominent, uses brand teal, white text, 16px font, bold

Interaction:
  • Sticky position: Remains visible as user scrolls down
  • Tap "Connect Additional Bank Accounts" → Launches Plaid Link integration
  • Tap "Learn more" → Modal or sheet showing feature comparison table
  • Dismissible: Small X icon top-right (persists for session, reappears on next login)

Mobile Optimization:
  • Collapses to compact version on small screens (<375px)
  • Button becomes full-width on mobile
  • Benefits list collapses to "View benefits" expandable section


═══════════════════════════════════════════════════════════════════════════════════════════════════════
ZONE 5: FEATURE CARDS (Below fold, scrollable, ~600px total height)
═══════════════════════════════════════════════════════════════════════════════════════════════════════

Header:
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Explore Features                                                                                   │
│  18px bold, dark gray (#1F2121)                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

Card Layout: 2-column grid on mobile (375px), 3-column on tablet (768px+)

Feature Card 1: Real-Time Balance Visibility
┌─────────────────────────────────────────┐
│  💰                                     │
│  Real-Time Balance                      │
│                                         │
│  View all account balances across       │
│  banks in one place, updated live.      │
│                                         │
│  [Premium Badge]  →                     │
└─────────────────────────────────────────┘

Feature Card 2: AI Cash Flow Forecasting
┌─────────────────────────────────────────┐
│  🔮                                     │
│  AI Forecasting                         │
│                                         │
│  Predict cash position 7-90 days        │
│  ahead with ML-powered insights.        │
│                                         │
│  [Premium Badge]  →                     │
└─────────────────────────────────────────┘

Feature Card 3: Payment Processing
┌─────────────────────────────────────────┐
│  💸                                     │
│  Fast Payments                          │
│                                         │
│  ACH, wire, mobile check deposit,       │
│  recurring payments, 24/7.              │
│                                         │
│  [Free Tier]  →                         │
└─────────────────────────────────────────┘

Feature Card 4: Fraud Detection
┌─────────────────────────────────────────┐
│  🛡️                                     │
│  Fraud Protection                       │
│                                         │
│  Positive Pay for checks & ACH,         │
│  anomaly detection, alerts.             │
│                                         │
│  [Premium Badge]  →                     │
└─────────────────────────────────────────┘

Feature Card 5: Receivables Management
┌─────────────────────────────────────────┐
│  📄                                     │
│  Invoice Automation                     │
│                                         │
│  Auto-generate invoices, payment        │
│  links, reminders, late fees.           │
│                                         │
│  [Premium Badge]  →                     │
└─────────────────────────────────────────┘

Feature Card 6: Advanced Analytics
┌─────────────────────────────────────────┐
│  📊                                     │
│  Expense Analytics                      │
│                                         │
│  Auto-categorize expenses, budgets,     │
│  trends, tax-ready reports.             │
│                                         │
│  [Premium Badge]  →                     │
└─────────────────────────────────────────┘

Card Design System:
  • Card size: 160px × 180px on mobile (2 columns)
  • Background: White with subtle shadow (0 2px 6px rgba(0,0,0,0.08))
  • Border: 1px solid #E5E5E5
  • Border radius: 10px
  • Padding: 16px
  • Icon size: 40px emoji or icon font
  • Title: 16px bold, dark gray
  • Description: 13px regular, medium gray (#626464)
  • Badge: Small pill (Premium = teal bg, Free = gray outline)
  • Tap: Navigate to feature detail page or upgrade modal

Grid Layout:
  • Mobile (375px): 2 columns, 8px gap
  • Tablet (768px): 3 columns, 12px gap
  • Desktop (1024px+): 4 columns, 16px gap


═══════════════════════════════════════════════════════════════════════════════════════════════════════
MOBILE INTERACTION FLOWS
═══════════════════════════════════════════════════════════════════════════════════════════════════════

FLOW 1: User Lands on Business 360
  Step 1: Tap "Business 360" in sidebar
  Step 2: Screen loads with hero graph animating from left
  Step 3: Insights cards fade in sequentially (100ms stagger)
  Step 4: Upgrade CTA slides up from bottom after 2 seconds
  Step 5: Feature cards lazy-load as user scrolls

FLOW 2: User Taps Cash Flow Graph Data Point
  Step 1: Tap any point on graph line
  Step 2: Tooltip appears above point showing:
          "Nov 15, 2025: $42,350"
          "↑ $3,200 from previous day"
  Step 3: Tooltip auto-dismisses after 3 seconds or tap elsewhere

FLOW 3: User Expands Insight Card
  Step 1: Tap insight card (e.g., "Low balance detected")
  Step 2: Card expands smoothly (300ms ease animation)
  Step 3: Additional details appear:
          - Suggested actions ("Transfer $5K from savings")
          - Historical context ("Your typical minimum is $12K")
          - Quick action buttons ("Transfer Now" | "Dismiss")
  Step 4: Tap outside card or [X] to collapse

FLOW 4: User Taps "Connect Additional Bank Accounts" CTA
  Step 1: Tap primary button in upgrade CTA
  Step 2: Modal slides up from bottom (400ms ease)
  Step 3: Plaid Link interface loads:
          - "Connect your bank accounts securely"
          - Bank search input
          - Popular banks grid (Chase, Wells Fargo, BofA, etc.)
  Step 4: User selects bank → OAuth flow
  Step 5: Success: "Connected Chase ✓" → Returns to Business 360
  Step 6: Screen refreshes showing multi-bank graph + hyper-personalized insights

FLOW 5: User Scrolls to Feature Cards
  Step 1: Scroll down past upgrade CTA
  Step 2: Feature cards lazy-load as they enter viewport
  Step 3: Tap feature card → Navigate to feature detail or upgrade modal
  Step 4: Premium badge: Shows "Upgrade to unlock" modal


═══════════════════════════════════════════════════════════════════════════════════════════════════════
RESPONSIVE BREAKPOINTS
═══════════════════════════════════════════════════════════════════════════════════════════════════════

Mobile Portrait (375px - 767px):
  • Sidebar: Collapses to hamburger menu
  • Graph: Full width, 280px height
  • Insights: Vertical stack, 3 cards visible
  • Upgrade CTA: Sticky bottom, full width
  • Feature cards: 2-column grid

Mobile Landscape (568px - 767px):
  • Graph: Reduced to 220px height
  • Insights: Horizontal scroll, 3 cards side-by-side
  • Upgrade CTA: Reduced padding

Tablet (768px - 1023px):
  • Sidebar: Persistent left sidebar (60px collapsed, 240px expanded)
  • Graph: 60% width, right sidebar shows quick stats
  • Insights: 2-column grid
  • Feature cards: 3-column grid

Desktop (1024px+):
  • Sidebar: Always expanded (240px)
  • Graph: 66% width, right sidebar with quick actions
  • Insights: 3-column grid
  • Upgrade CTA: Dismissible banner (not sticky)
  • Feature cards: 4-column grid


═══════════════════════════════════════════════════════════════════════════════════════════════════════
ACCESSIBILITY REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════════════════════════════════

ARIA Labels:
  • Graph: aria-label="Cash flow trend chart for last 30 days"
  • Insight cards: aria-live="polite" for dynamic updates
  • CTA button: aria-label="Connect additional bank accounts to unlock premium features"
  • Feature cards: aria-label="[Feature name] - Tap to learn more"

Keyboard Navigation:
  • Tab order: Sidebar → Graph controls → Insights → CTA → Feature cards
  • Enter/Space: Activate buttons and expand cards
  • Escape: Collapse expanded cards or modals

Screen Reader:
  • Graph data: Announce key data points on focus
  • Insights: Read full card content when focused
  • Premium badges: Announce "Premium feature - upgrade required"

Color Contrast:
  • All text: Minimum 4.5:1 contrast ratio (WCAG AA)
  • Large text (18px+): Minimum 3:1 contrast ratio
  • Interactive elements: Focus indicators with 3:1 contrast

Touch Targets:
  • Minimum 44px × 44px for all tappable elements
  • Adequate spacing (8px minimum) between interactive elements
"""

# Save detailed specification
features_df.to_csv('business_360_feature_specification.csv', index=False)

with open('business_360_mobile_layout_spec.txt', 'w', encoding='utf-8') as f:
    f.write(screen_layout)

print("Business 360 Mobile-First Specification Created")
print("=" * 100)
print("\nFeature Specification Table:")
print(features_df.to_string(index=False))
print("\n\n✓ Files created:")
print("  - business_360_feature_specification.csv")
print("  - business_360_mobile_layout_spec.txt")
