// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    
    // Save the user's preference
    const theme = bodyElement.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Add a subtle animation to the toggle button
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 100);
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's a valid section link
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Resume download link handler
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can replace this with actual resume file path
        console.log('Resume download initiated');
        // Example: e.preventDefault(); window.location.href = '/resume.pdf';
    });
});

// Add keyboard shortcut for theme toggle (Ctrl/Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Performance: Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize events
    }, 250);
});

// Log theme preference on page load
console.log(`Portfolio loaded in ${currentTheme} mode`);