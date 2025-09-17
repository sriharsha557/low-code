// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Discussion form functionality (demo - would need backend integration)
document.getElementById('discussionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const authorName = document.getElementById('authorName').value;
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
    
    if (!authorName || !postTitle || !postContent) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Create new thread item
    const threadItem = document.createElement('div');
    threadItem.className = 'thread-item';
    threadItem.style.animation = 'fadeIn 0.5s ease-in-out';
    
    const initials = authorName.split(' ').map(name => name[0]).join('').toUpperCase();
    
    threadItem.innerHTML = `
        <div class="thread-header">
            <div class="thread-avatar">${initials}</div>
            <div class="thread-info">
                <h4>${postTitle}</h4>
                <div class="thread-meta">by ${authorName} • Just now</div>
            </div>
        </div>
        <div class="thread-content">
            ${postContent}
        </div>
    `;
    
    // Add to beginning of threads
    const threadsContainer = document.getElementById('discussionThreads');
    threadsContainer.insertBefore(threadItem, threadsContainer.firstChild);
    
    // Reset form
    document.getElementById('discussionForm').reset();
    
    // Show success message
    alert('Your discussion has been posted! 🎉');
    
    // In a real implementation, you would send this data to Firebase/Supabase
    console.log('New post data:', {
        author: authorName,
        title: postTitle,
        content: postContent,
        timestamp: new Date().toISOString()
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate category cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all category cards and thread items
    document.querySelectorAll('.category-card, .thread-item, .chat-option').forEach(item => {
        observer.observe(item);
    });

    // Add click animations to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add hover effect to thread items
    document.querySelectorAll('.thread-item').forEach(thread => {
        thread.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '5px';
            this.style.borderLeftColor = '#00ff88';
        });
        
        thread.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '2px';
            this.style.borderLeftColor = '#eee';
        });
    });
});

// Auto-update community stats (demo)
setInterval(() => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const increment = Math.floor(Math.random() * 3);
        if (increment > 0) {
            const newValue = currentValue + increment;
            stat.textContent = newValue.toLocaleString();
        }
    });
}, 30000); // Update every 30 seconds

// Add typing indicator for form inputs
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '#00ff88';
        this.style.boxShadow = '0 0 10px rgba(0,255,136,0.2)';
        
        setTimeout(() => {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            }
        }, 2000);
    });
});
// Configuration
const CONFIG = {
    // GitHub repository configuration
    GITHUB_USER: 'sriharsha557',
    GITHUB_REPO: 'low-code',
    GUIDES_FOLDER: 'guides',
    GITHUB_API_BASE: 'https://api.github.com/repos',
    GITHUB_RAW_BASE: 'https://raw.githubusercontent.com',
    
    // Default branch (usually 'main' or 'master')
    BRANCH: 'main',
    
    // Cache duration in milliseconds (5 minutes)
    CACHE_DURATION: 5 * 60 * 1000
};

// Global state
let guidesData = [];
let currentGuide = null;
let cache = {
    guides: null,
    timestamp: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    configureMarked();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🚀 Initializing Dev Guides Terminal...');
    
    // Show welcome screen initially
    showScreen('welcome-screen');
    
    // Setup highlight.js for code syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.configure({
            languages: ['html', 'css', 'javascript', 'python', 'bash', 'json', 'markdown']
        });
    }
    
    console.log('✅ Application initialized successfully');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Handle navigation menu clicks
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', handleMenuClick);
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', handleWindowResize);
}

/**
 * Configure Marked.js settings
 */
function configureMarked() {
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            highlight: function(code, lang) {
                if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {
                        console.warn('Highlight.js error:', err);
                    }
                }
                return code;
            },
            breaks: true,
            gfm: true,
            tables: true,
            sanitize: false
        });
    }
}

/**
 * Handle menu navigation
 */
function handleMenuClick(e) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    
    // Update active menu item
    document.querySelector
function goBack() {
    if (document.getElementById('viewer-screen').classList.contains('active')) {
        showGuidesList();
    } else {
        window.location.href = 'index.html';
    }
}
let currentGuidesLoaded = 0;
const guidesPerPage = 20;

// Mock guides data (replace with actual API call)
const allGuides = [
    {
        name: "HTML Tutorial",
        description: "Complete HTML guide for beginners",
        filename: "html_tutorial.md",
        size: "45KB",
        date: "2024-01-15"
    },
    {
        name: "CSS Fundamentals",
        description: "Master CSS styling and layouts",
        filename: "css_fundamentals.md",
        size: "38KB",
        date: "2024-01-20"
    },
    {
        name: "JavaScript Basics",
        description: "Learn JavaScript programming",
        filename: "javascript_basics.md",
        size: "52KB",
        date: "2024-01-25"
    },
    // Add more guides as needed
];

// Auto-load guides when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('guides-screen').classList.add('active');
        loadInitialGuides();
    }, 3000); // 3 second delay for welcome screen
});

function loadInitialGuides() {
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(() => {
        loadGuides(0, guidesPerPage);
        document.getElementById('loading').style.display = 'none';
    }, 1000);
}

function loadGuides(start = 0, count = guidesPerPage) {
    const guidesGrid = document.getElementById('guides-grid');
    const guidesToShow = allGuides.slice(start, start + count);
    
    guidesToShow.forEach(guide => {
        const guideCard = createGuideCard(guide);
        guidesGrid.appendChild(guideCard);
    });
    
    currentGuidesLoaded += guidesToShow.length;
    
    // Update guide count
    document.getElementById('guide-count').textContent = currentGuidesLoaded;
    
    // Show/hide load more button
    const loadMoreContainer = document.getElementById('load-more-container');
    if (currentGuidesLoaded < allGuides.length) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

function loadMoreGuides() {
    loadGuides(currentGuidesLoaded, guidesPerPage);
}

function createGuideCard(guide) {
    const card = document.createElement('div');
    card.className = 'guide-card';
    card.onclick = () => openGuide(guide);
    
    card.innerHTML = `
        <div class="guide-header">
            <h3 class="guide-name">${guide.name}</h3>
            <span class="guide-type">MD</span>
        </div>
        <p class="guide-description">${guide.description}</p>
        <div class="guide-info">
            <span class="guide-size">${guide.size}</span>
            <span class="guide-date">${guide.date}</span>
        </div>
    `;
    
    return card;
}

function openGuide(guide) {
    document.getElementById('guides-screen').classList.remove('active');
    document.getElementById('viewer-screen').classList.add('active');
    
    document.getElementById('guide-title').textContent = guide.name;
    document.getElementById('guide-date').textContent = guide.date;
    document.getElementById('guide-size').textContent = guide.size;
    
    // Load the actual markdown content
    loadGuideContent(guide.filename);
}

function loadGuideContent(filename) {
    const contentDiv = document.getElementById('guide-content');
    contentDiv.innerHTML = '<div class="content-loading"><div class="spinner"></div><p>LOADING CONTENT...</p></div>';
    
    // Try to fetch the actual file
    fetch(`guides/${filename}`)
        .then(response => response.text())
        .then(markdown => {
            const html = marked.parse(markdown);
            contentDiv.innerHTML = html;
            // Highlight code blocks
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        })
        .catch(error => {
            contentDiv.innerHTML = `
                <div class="error-message">
                    <p>ERROR: Could not load ${filename}</p>
                    <p>Make sure the file exists in the guides/ folder</p>
                </div>
            `;
        });
}

function showGuidesList() {
    document.getElementById('viewer-screen').classList.remove('active');
    document.getElementById('guides-screen').classList.add('active');
}
let currentGuidesLoaded = 0;
const guidesPerPage = 20;

// Sample guides data
const allGuides = [
    {
        name: "HTML Tutorial",
        description: "Complete HTML guide for beginners",
        filename: "html_tutorial.md",
        size: "45KB",
        date: "2024-01-15"
    },
    {
        name: "CSS Fundamentals", 
        description: "Master CSS styling and layouts",
        filename: "css_fundamentals.md",
        size: "38KB",
        date: "2024-01-20"
    },
    {
        name: "JavaScript Basics",
        description: "Learn JavaScript programming", 
        filename: "javascript_basics.md",
        size: "52KB",
        date: "2024-01-25"
    }
    // Add more guides as needed
];

// Auto-load guides when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('guides-screen').classList.add('active');
        loadInitialGuides();
    }, 3000);
});

function loadInitialGuides() {
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(() => {
        loadGuides(0, guidesPerPage);
        document.getElementById('loading').style.display = 'none';
    }, 1000);
}

function loadGuides(start = 0, count = guidesPerPage) {
    const guidesGrid = document.getElementById('guides-grid');
    const guidesToShow = allGuides.slice(start, start + count);
    
    guidesToShow.forEach(guide => {
        const guideCard = createGuideCard(guide);
        guidesGrid.appendChild(guideCard);
    });
    
    currentGuidesLoaded += guidesToShow.length;
    document.getElementById('guide-count').textContent = currentGuidesLoaded;
    
    const loadMoreContainer = document.getElementById('load-more-container');
    if (currentGuidesLoaded < allGuides.length) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

function loadMoreGuides() {
    loadGuides(currentGuidesLoaded, guidesPerPage);
}

function createGuideCard(guide) {
    const card = document.createElement('div');
    card.className = 'guide-card';
    card.onclick = () => openGuide(guide);
    
    card.innerHTML = `
        <div class="guide-header">
            <h3 class="guide-name">${guide.name}</h3>
            <span class="guide-type">MD</span>
        </div>
        <p class="guide-description">${guide.description}</p>
        <div class="guide-info">
            <span class="guide-size">${guide.size}</span>
            <span class="guide-date">${guide.date}</span>
        </div>
    `;
    
    return card;
}

function openGuide(guide) {
    document.getElementById('guides-screen').classList.remove('active');
    document.getElementById('viewer-screen').classList.add('active');
    
    document.getElementById('guide-title').textContent = guide.name;
    document.getElementById('guide-date').textContent = guide.date; 
    document.getElementById('guide-size').textContent = guide.size;
    
    loadGuideContent(guide.filename);
}

function loadGuideContent(filename) {
    const contentDiv = document.getElementById('guide-content');
    contentDiv.innerHTML = '<div class="content-loading"><div class="spinner"></div><p>LOADING CONTENT...</p></div>';
    
    fetch(`guides/${filename}`)
        .then(response => response.text())
        .then(markdown => {
            const html = marked.parse(markdown);
            contentDiv.innerHTML = html;
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        })
        .catch(error => {
            contentDiv.innerHTML = `
                <div class="error-message">
                    <p>ERROR: Could not load ${filename}</p>
                    <p>Make sure the file exists in the guides/ folder</p>
                </div>
            `;
        });
}

function showGuidesList() {
    document.getElementById('viewer-screen').classList.remove('active');
    document.getElementById('guides-screen').classList.add('active');
}
