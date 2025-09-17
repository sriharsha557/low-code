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
let currentGuidesLoaded = 0;
const guidesPerPage = 20;
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
    console.log('🚀 Initializing Dev Guides...');
    
    // Show welcome screen initially
    showScreen('welcome-screen');
    
    // Setup highlight.js for code syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.configure({
            languages: ['html', 'css', 'javascript', 'python', 'bash', 'json', 'markdown']
        });
    }
    
    // Auto-load guides after 3 seconds
    setTimeout(() => {
        loadGuidesFromGitHub();
    }, 3000);
    
    console.log('✅ Application initialized successfully');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Handle window resize for responsive behavior
    window.addEventListener('resize', handleWindowResize);
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
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
 * Show specific screen
 */
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

/**
 * Load guides from GitHub repository
 */
async function loadGuidesFromGitHub() {
    try {
        console.log('📂 Fetching guides from GitHub...');
        
        // Check cache first
        if (isCacheValid()) {
            console.log('📋 Using cached guides data');
            guidesData = cache.guides;
            displayGuides();
            return;
        }
        
        // Show loading state
        showScreen('guides-screen');
        document.getElementById('loading').style.display = 'block';
        
        // Fetch from GitHub API
        const apiUrl = `${CONFIG.GITHUB_API_BASE}/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/contents/${CONFIG.GUIDES_FOLDER}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const files = await response.json();
        
        // Filter for markdown files
        const markdownFiles = files.filter(file => 
            file.name.endsWith('.md') && file.type === 'file'
        );
        
        // Transform to guides format
        guidesData = markdownFiles.map(file => ({
            name: formatGuideName(file.name),
            description: generateDescription(file.name),
            filename: file.name,
            size: formatFileSize(file.size),
            date: formatDate(new Date()),
            downloadUrl: file.download_url
        }));
        
        // Cache the results
        cache = {
            guides: guidesData,
            timestamp: Date.now()
        };
        
        console.log(`✅ Loaded ${guidesData.length} guides from GitHub`);
        displayGuides();
        
    } catch (error) {
        console.error('❌ Error loading guides:', error);
        showError();
    }
}

/**
 * Check if cache is still valid
 */
function isCacheValid() {
    return cache.guides && 
           cache.timestamp && 
           (Date.now() - cache.timestamp) < CONFIG.CACHE_DURATION;
}

/**
 * Display guides in the grid
 */
function displayGuides() {
    document.getElementById('loading').style.display = 'none';
    
    const startIndex = currentGuidesLoaded;
    const endIndex = Math.min(startIndex + guidesPerPage, guidesData.length);
    const guidesToShow = guidesData.slice(startIndex, endIndex);
    
    const guidesGrid = document.getElementById('guides-grid');
    
    guidesToShow.forEach(guide => {
        const guideCard = createGuideCard(guide);
        guidesGrid.appendChild(guideCard);
    });
    
    currentGuidesLoaded = endIndex;
    
    // Update guide count
    document.getElementById('guide-count').textContent = currentGuidesLoaded;
    
    // Show/hide load more button
    const loadMoreContainer = document.getElementById('load-more-container');
    if (currentGuidesLoaded < guidesData.length) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

/**
 * Create a guide card element
 */
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

/**
 * Open a specific guide
 */
function openGuide(guide) {
    showScreen('viewer-screen');
    
    document.getElementById('guide-title').textContent = guide.name;
    document.getElementById('guide-date').textContent = `Date: ${guide.date}`;
    document.getElementById('guide-size').textContent = `Size: ${guide.size}`;
    
    // Load the actual markdown content
    loadGuideContent(guide);
}

/**
 * Load guide content from GitHub
 */
async function loadGuideContent(guide) {
    const contentDiv = document.getElementById('guide-content');
    contentDiv.innerHTML = `
        <div class="content-loading">
            <div class="retro-spinner"></div>
            <p>LOADING CONTENT...</p>
        </div>
    `;
    
    try {
        // Use the download_url from GitHub API or construct the raw URL
        const contentUrl = guide.downloadUrl || 
            `${CONFIG.GITHUB_RAW_BASE}/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/${CONFIG.BRANCH}/${CONFIG.GUIDES_FOLDER}/${guide.filename}`;
        
        console.log('📄 Fetching guide content from:', contentUrl);
        
        const response = await fetch(contentUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch guide content: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        contentDiv.innerHTML = html;
        
        // Highlight code blocks
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
        
        console.log('✅ Guide content loaded successfully');
        
    } catch (error) {
        console.error('❌ Error loading guide content:', error);
        contentDiv.innerHTML = `
            <div class="error-message">
                <h3>Failed to Load Guide</h3>
                <p>Could not load "${guide.filename}" from the repository.</p>
                <p>Error: ${error.message}</p>
                <button class="cta-btn" onclick="loadGuideContent(${JSON.stringify(guide).replace(/"/g, '&quot;')})">
                    Try Again
                </button>
            </div>
        `;
    }
}

/**
 * Load more guides
 */
function loadMoreGuides() {
    displayGuides();
}

/**
 * Show guides list (back navigation)
 */
function showGuidesList() {
    showScreen('guides-screen');
}

/**
 * Show error state
 */
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
}

/**
 * Retry loading guides
 */
function loadInitialGuides() {
    document.getElementById('error-message').style.display = 'none';
    currentGuidesLoaded = 0;
    guidesData = [];
    
    // Clear existing guides
    const guidesGrid = document.getElementById('guides-grid');
    guidesGrid.innerHTML = '';
    
    // Reload from GitHub
    loadGuidesFromGitHub();
}

// Utility Functions

/**
 * Format guide name from filename
 */
function formatGuideName(filename) {
    return filename
        .replace('.md', '')
        .replace(/[_-]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Generate description based on filename
 */
function generateDescription(filename) {
    const name = filename.replace('.md', '').toLowerCase();
    
    const descriptions = {
        'html': 'Learn HTML fundamentals and best practices',
        'css': 'Master CSS styling and modern layouts',
        'javascript': 'JavaScript programming essentials',
        'react': 'Build modern React applications',
        'node': 'Server-side development with Node.js',
        'python': 'Python programming guide',
        'api': 'RESTful API development guide',
        'database': 'Database design and management',
        'git': 'Version control with Git',
        'deployment': 'Application deployment strategies'
    };
    
    // Look for keywords in filename
    for (const [keyword, description] of Object.entries(descriptions)) {
        if (name.includes(keyword)) {
            return description;
        }
    }
    
    return `Comprehensive guide on ${formatGuideName(filename).toLowerCase()}`;
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Format date
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Handle window resize
 */
function handleWindowResize() {
    // Add any responsive behavior if needed
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(e) {
    // ESC key to go back
    if (e.key === 'Escape') {
        const currentScreen = document.querySelector('.screen.active');
        if (currentScreen && currentScreen.id === 'viewer-screen') {
            showGuidesList();
        }
    }
    
    // R key to refresh guides
    if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            loadInitialGuides();
        }
    }
}

// Go back function for navigation
function goBack() {
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen && currentScreen.id === 'viewer-screen') {
        showGuidesList();
    } else {
        window.location.href = 'index.html';
    }
}
