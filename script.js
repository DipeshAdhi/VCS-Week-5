// Git Merge Project - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Git Merge Project Loaded');

    // Initialize all interactive features
    initMergeSimulator();
    initNavigation();
    initAnimations();
    initCommandCards();
    initTipCards();
});

// ===== Merge Simulator =====
function initMergeSimulator() {
    const mergeBtn = document.getElementById('mergeBtn');
    const mergeResult = document.getElementById('mergeResult');
    const resultText = document.getElementById('resultText');

    if (!mergeBtn) return;

    const mergeMessages = [
        '✅ Merge successful! Branch "feature-login" merged into "main".',
        '✅ Merge completed! 5 commits integrated. No conflicts detected.',
        '✅ Fast-forward merge successful! Your branch is now up to date.',
        '⚠️ Merge requires resolution. 2 files have conflicts. Resolving...',
        '✅ All conflicts resolved! Merge finalized successfully.',
        '✅ Branch "develop" has been merged into "main" with 8 new commits.'
    ];

    mergeBtn.addEventListener('click', function() {
        mergeBtn.disabled = true;
        mergeBtn.textContent = 'Merging...';
        mergeBtn.style.opacity = '0.6';

        // Simulate merge process
        setTimeout(() => {
            const randomMsg = mergeMessages[Math.floor(Math.random() * mergeMessages.length)];
            resultText.textContent = randomMsg;
            mergeResult.classList.remove('hidden');

            // Re-enable button
            mergeBtn.disabled = false;
            mergeBtn.textContent = 'Simulate Merge Again';
            mergeBtn.style.opacity = '1';

            // Auto-hide result after 5 seconds
            setTimeout(() => {
                mergeResult.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
}

// ===== Navigation =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== Scroll Animations =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.content-section, .features-section, .commands-section, .tips-section').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== Command Cards Interaction =====
function initCommandCards() {
    const commandCards = document.querySelectorAll('.command-card');

    commandCards.forEach(card => {
        card.addEventListener('click', function() {
            const code = this.querySelector('code').textContent;
            copyToClipboard(code);

            // Show feedback
            const originalText = this.style.backgroundColor;
            this.style.backgroundColor = '#2ecc71';
            this.style.color = 'white';

            setTimeout(() => {
                this.style.backgroundColor = originalText;
                this.style.color = 'inherit';
            }, 1500);
        });

        // Add hover effect with cursor pointer
        card.style.cursor = 'pointer';

        // Tooltip on hover
        card.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Click to copy command';
            tooltip.style.cssText = `
                position: absolute;
                background-color: #2c3e50;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.85rem;
                margin-top: -40px;
                white-space: nowrap;
                z-index: 1000;
            `;
            this.style.position = 'relative';
            this.appendChild(tooltip);

            setTimeout(() => tooltip.remove(), 2000);
        });
    });
}

// ===== Tip Cards Interaction =====
function initTipCards() {
    const tipCards = document.querySelectorAll('.tip');

    tipCards.forEach((tip, index) => {
        // Add staggered animation
        tip.style.animationDelay = `${index * 0.1}s`;

        // Add click interaction
        tip.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// ===== Utility: Copy to Clipboard =====
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Command copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('Command copied to clipboard!');
}

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// ===== Smooth Scroll on Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Page Load Analytics =====
function trackPageLoad() {
    console.log('Page loaded:', {
        url: window.location.href,
        time: new Date().toLocaleString(),
        userAgent: navigator.userAgent
    });
}

trackPageLoad();

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (if needed later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut triggered');
    }

    // Home key to scroll to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===== Scroll Progress Indicator =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

initScrollProgress();

// ===== Dark Mode Toggle (Optional Enhancement) =====
function initDarkMode() {
    const darkModeBtn = document.querySelector('.dark-mode-toggle');
    if (!darkModeBtn) return;

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// Log all interactive elements
console.log('✅ Git Merge Project JavaScript loaded successfully');
console.log('Features active:');
console.log('  ✓ Merge Simulator');
console.log('  ✓ Navigation Highlighting');
console.log('  ✓ Scroll Animations');
console.log('  ✓ Command Card Copy-to-Clipboard');
console.log('  ✓ Notifications');
console.log('  ✓ Scroll Progress Bar');
console.log('  ✓ Keyboard Shortcuts');