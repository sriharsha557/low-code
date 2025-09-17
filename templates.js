// Templates JavaScript - templates.js

// Global variables
let currentTemplates = [];
let filteredTemplates = [];
let currentCategory = 'all';
let templatesPerPage = 9;
let currentPage = 1;
let currentTemplate = null;

// Mock template data - replace with your actual data source
const mockTemplates = [
    // Web Templates
    {
        id: 1,
        name: "Business Landing Page",
        category: "webpage",
        description: "Professional business landing page with modern design, contact forms, and responsive layout. Perfect for startups and corporations.",
        features: ["Responsive Design", "Contact Forms", "SEO Optimized", "Mobile First"],
        downloads: 1250,
        rating: 4.8,
        size: "2.3 MB",
        version: "v2.1",
        preview_url: "https://example.com/preview/business-landing",
        download_url: "#",
        content: "# Business Landing Page Template\n\n## Overview\nA modern, professional landing page template designed for businesses of all sizes.\n\n## Features\n- **Responsive Design**: Looks great on all devices\n- **Contact Forms**: Built-in contact functionality\n- **SEO Optimized**: Search engine friendly\n- **Fast Loading**: Optimized for performance\n\n## Technologies Used\n- HTML5\n- CSS3\n- JavaScript\n- Bootstrap 5\n\n## Installation\n1. Download the template files\n2. Extract to your web directory\n3. Customize the content\n4. Deploy to your server\n\n## Customization\nThe template includes easy-to-edit sections for:\n- Hero content\n- Services\n- About section\n- Contact information\n- Social media links"
    },
    {
        id: 2,
        name: "E-commerce Store",
        category: "webpage",
        description: "Complete e-commerce solution with shopping cart, payment integration, and admin dashboard. Ready for online retail business.",
        features: ["Shopping Cart", "Payment Gateway", "Admin Panel", "Inventory Management"],
        downloads: 980,
        rating: 4.6,
        size: "5.7 MB",
        version: "v3.0",
        preview_url: "https://example.com/preview/ecommerce",
        download_url: "#",
        content: "# E-commerce Store Template\n\n## Complete Online Store Solution\nFull-featured e-commerce template with everything you need to start selling online.\n\n## Key Features\n- **Product Management**: Easy product catalog management\n- **Shopping Cart**: Intuitive cart functionality\n- **Payment Processing**: Multiple payment gateway support\n- **Order Management**: Complete order tracking system\n- **User Accounts**: Customer registration and profiles\n- **Admin Dashboard**: Comprehensive admin interface\n\n## Included Pages\n- Homepage with featured products\n- Product catalog with filtering\n- Individual product pages\n- Shopping cart and checkout\n- User account pages\n- Admin dashboard\n\n## Setup Instructions\n1. Install on your web server\n2. Configure database connection\n3. Set up payment gateways\n4. Customize branding and content\n5. Add your products\n6. Go live!"
    },
    {
        id: 3,
        name: "Portfolio Showcase",
        category: "webpage",
        description: "Creative portfolio template for designers, photographers, and artists. Features gallery, blog, and contact sections.",
        features: ["Image Gallery", "Blog System", "Portfolio Grid", "Lightbox"],
        downloads: 2100,
        rating: 4.9,
        size: "1.8 MB",
        version: "v1.5",
        preview_url: "https://example.com/preview/portfolio",
        download_url: "#",
        content: "# Portfolio Showcase Template\n\n## Creative Portfolio Solution\nElegant portfolio template perfect for showcasing your creative work.\n\n## Features\n- **Image Gallery**: Beautiful grid layout for your work\n- **Lightbox**: Full-screen image viewing\n- **Blog Integration**: Share your creative process\n- **Contact Forms**: Let clients reach out easily\n- **Mobile Optimized**: Looks great on all devices\n- **Fast Loading**: Optimized images and code\n\n## Perfect For\n- Photographers\n- Graphic Designers\n- Artists\n- Creative Professionals\n- Freelancers\n\n## Customization Options\n- Multiple color schemes\n- Flexible layout options\n- Easy content management\n- Social media integration"
    },
    // AI Apps
    {
        id: 4,
        name: "AI Chatbot Assistant",
        category: "ai-apps",
        description: "Intelligent chatbot powered by advanced AI. Includes conversation memory, context understanding, and customizable personality.",
        features: ["Natural Language Processing", "Context Memory", "Custom Personality", "Multi-language"],
        downloads: 3200,
        rating: 4.7,
        size: "8.5 MB",
        version: "v4.2",
        preview_url: "https://example.com/preview/ai-chatbot",
        download_url: "#",
        content: "# AI Chatbot Assistant\n\n## Intelligent Conversation AI\nAdvanced chatbot application with natural language understanding and contextual responses.\n\n## Core Features\n- **Natural Language Processing**: Understands complex queries\n- **Conversation Memory**: Remembers context throughout chat\n- **Personality Customization**: Adjustable tone and responses\n- **Multi-language Support**: Communicate in multiple languages\n- **Learning Capabilities**: Improves responses over time\n- **Integration Ready**: Easy API integration\n\n## Use Cases\n- Customer support\n- Personal assistant\n- Educational tutor\n- Entertainment companion\n- Business automation\n\n## Technical Requirements\n- Python 3.8+\n- TensorFlow/PyTorch\n- OpenAI API access\n- Database for conversation storage\n\n## Setup Guide\n1. Install dependencies\n2. Configure API keys\n3. Train custom personality\n4. Deploy to your platform\n5. Test and refine responses"
    },
    {
        id: 5,
        name: "Image Recognition App",
        category: "ai-apps",
        description: "Computer vision application that can identify objects, faces, and scenes in images with high accuracy and real-time processing.",
        features: ["Object Detection", "Face Recognition", "Scene Analysis", "Real-time Processing"],
        downloads: 1800,
        rating: 4.5,
        size: "12.3 MB",
        version: "v2.8",
        preview_url: "https://example.com/preview/image-recognition",
        download_url: "#",
        content: "# Image Recognition Application\n\n## Advanced Computer Vision\nPowerful image recognition system using state-of-the-art AI models.\n\n## Capabilities\n- **Object Detection**: Identify and classify objects in images\n- **Face Recognition**: Detect and recognize faces with high accuracy\n- **Scene Analysis**: Understand image context and environment\n- **Text Extraction**: OCR functionality for text in images\n- **Real-time Processing**: Fast analysis for live camera feeds\n- **Batch Processing**: Handle multiple images simultaneously\n\n## Applications\n- Security systems\n- Content moderation\n- Inventory management\n- Medical imaging\n- Automotive systems\n- Social media platforms\n\n## Model Features\n- 95%+ accuracy on standard datasets\n- Support for 1000+ object classes\n- Custom model training capabilities\n- Edge deployment optimization\n\n## Installation\n1. Download the application\n2. Install required dependencies\n3. Configure camera/image input\n4. Run calibration tests\n5. Start recognition engine"
    },
    {
        id: 6,
        name: "Sentiment Analysis Tool",
        category: "ai-apps",
        description: "AI-powered text analysis tool that determines emotional tone, sentiment scores, and mood classification from text input.",
        features: ["Emotion Detection", "Sentiment Scoring", "Mood Classification", "Batch Analysis"],
        downloads: 2400,
        rating: 4.6,
        size: "4.2 MB",
        version: "v3.1",
        preview_url: "https://example.com/preview/sentiment-analysis",
        download_url: "#",
        content: "# Sentiment Analysis Tool\n\n## Advanced Text Emotion Detection\nComprehensive sentiment analysis with detailed emotional insights.\n\n## Analysis Features\n- **Sentiment Scoring**: Positive/negative/neutral classification\n- **Emotion Detection**: Joy, anger, fear, sadness, surprise, disgust\n- **Confidence Levels**: Reliability scores for each prediction\n- **Batch Processing**: Analyze multiple texts simultaneously\n- **Historical Tracking**: Monitor sentiment trends over time\n- **Custom Training**: Adapt to domain-specific language\n\n## Business Applications\n- Social media monitoring\n- Customer feedback analysis\n- Brand reputation management\n- Market research\n- Content optimization\n- Customer service insights\n\n## Supported Formats\n- Plain text\n- CSV files\n- JSON data\n- Social media posts\n- Reviews and comments\n- Survey responses\n\n## API Integration\n- RESTful API endpoints\n- Real-time webhooks\n- Batch processing queues\n- Custom model deployment"
    },
    // Agentic Apps
    {
        id: 7,
        name: "Task Automation Agent",
        category: "agentic-apps",
        description: "Intelligent automation agent that can plan, execute, and monitor complex multi-step tasks with minimal human intervention.",
        features: ["Task Planning", "Auto Execution", "Progress Monitoring", "Error Recovery"],
        downloads: 1500,
        rating: 4.8,
        size: "15.6 MB",
        version: "v1.9",
        preview_url: "https://example.com/preview/task-agent",
        download_url: "#",
        content: "# Task Automation Agent\n\n## Intelligent Process Automation\nAdvanced agentic system that autonomously handles complex workflows.\n\n## Agent Capabilities\n- **Task Decomposition**: Break complex goals into manageable steps\n- **Dynamic Planning**: Adapt plans based on changing conditions\n- **Resource Management**: Optimize use of available tools and APIs\n- **Error Handling**: Automatic recovery and alternative approaches\n- **Progress Reporting**: Real-time status updates and notifications\n- **Learning Integration**: Improve performance through experience\n\n## Automation Features\n- Web scraping and data collection\n- File processing and organization\n- Email and communication management\n- Report generation and distribution\n- Database operations and maintenance\n- System monitoring and alerts\n\n## Use Cases\n- Business process automation\n- Data pipeline management\n- Content management workflows\n- Customer service automation\n- Research and analysis tasks\n- System administration\n\n## Configuration\n1. Define task objectives\n2. Set up tool integrations\n3. Configure monitoring parameters\n4. Test execution flows\n5. Deploy autonomous operation"
    },
    {
        id: 8,
        name: "Research Assistant Bot",
        category: "agentic-apps",
        description: "AI research agent that can gather information, analyze data, and generate comprehensive reports on any topic automatically.",
        features: ["Information Gathering", "Data Analysis", "Report Generation", "Source Verification"],
        downloads: 2200,
        rating: 4.9,
        size: "11.8 MB",
        version: "v2.3",
        preview_url: "https://example.com/preview/research-bot",
        download_url: "#",
        content: "# Research Assistant Bot\n\n## Autonomous Research Intelligence\nComprehensive research agent that conducts thorough investigations and analysis.\n\n## Research Capabilities\n- **Multi-source Data Gathering**: Web, databases, APIs, documents\n- **Information Verification**: Cross-reference and fact-checking\n- **Data Analysis**: Statistical analysis and pattern recognition\n- **Report Synthesis**: Generate structured, comprehensive reports\n- **Citation Management**: Proper source attribution and referencing\n- **Continuous Learning**: Improve research strategies over time\n\n## Research Domains\n- Academic research\n- Market analysis\n- Competitive intelligence\n- Technical documentation\n- News and trend analysis\n- Scientific literature review\n\n## Output Formats\n- Executive summaries\n- Detailed research reports\n- Data visualizations\n- Reference bibliographies\n- Presentation slides\n- Raw data exports\n\n## Workflow Process\n1. Define research questions\n2. Identify relevant sources\n3. Collect and verify information\n4. Analyze and synthesize data\n5. Generate comprehensive reports\n6. Provide recommendations\n\n## Advanced Features\n- Multi-language research\n- Real-time monitoring\n- Collaborative workflows\n- Custom research templates\n- Integration with research tools"
    },
    {
        id: 9,
        name: "Customer Service Agent",
        category: "agentic-apps",
        description: "Autonomous customer service agent that handles inquiries, resolves issues, and escalates complex cases with human-like interaction.",
        features: ["Issue Resolution", "Context Understanding", "Escalation Logic", "Multi-channel"],
        downloads: 2800,
        rating: 4.7,
        size: "9.4 MB",
        version: "v3.5",
        preview_url: "https://example.com/preview/customer-agent",
        download_url: "#",
        content: "# Customer Service Agent\n\n## Intelligent Customer Support Automation\nAdvanced agentic system for autonomous customer service operations.\n\n## Service Capabilities\n- **Issue Classification**: Automatic categorization of customer inquiries\n- **Resolution Planning**: Multi-step problem-solving approaches\n- **Knowledge Base Integration**: Access to comprehensive support resources\n- **Escalation Management**: Smart handoff to human agents when needed\n- **Sentiment Monitoring**: Detect customer frustration and adjust approach\n- **Follow-up Actions**: Automated case closure and satisfaction surveys\n\n## Communication Channels\n- Live chat integration\n- Email support automation\n- Social media monitoring\n- Phone system integration\n- Mobile app messaging\n- Self-service portals\n\n## Business Benefits\n- 24/7 availability\n- Consistent service quality\n- Reduced response times\n- Cost-effective scaling\n- Improved customer satisfaction\n- Data-driven insights\n\n## Integration Features\n- CRM system connectivity\n- Ticket management systems\n- Knowledge base platforms\n- Analytics and reporting\n- Multi-language support\n- Custom workflow rules\n\n## Implementation\n1. Configure knowledge base\n2. Set up communication channels\n3. Define escalation rules\n4. Train on historical data\n5. Monitor and optimize performance"
    }
];

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const templatesScreen = document.getElementById('templates-screen');
const viewerScreen = document.getElementById('viewer-screen');
const templatesGrid = document.getElementById('templates-grid');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');
const loadMoreContainer = document.getElementById('load-more-container');
const templateCountElement = document.getElementById('template-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome screen first
    showScreen('welcome-screen');
    
    // Auto-transition to templates screen after loading animation
    setTimeout(() => {
        showScreen('templates-screen');
        loadInitialTemplates();
    }, 3000);
    
    // Set up category tab event listeners
    setupCategoryTabs();
});

// Screen management
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Category tabs setup
function setupCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter templates by category
            currentCategory = this.dataset.category;
            currentPage = 1;
            filterAndDisplayTemplates();
        });
    });
}

// Load initial templates
function loadInitialTemplates() {
    showLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
        currentTemplates = [...mockTemplates];
        filterAndDisplayTemplates();
        updateTemplateCount();
        showLoading(false);
    }, 1000);
}

// Filter and display templates
function filterAndDisplayTemplates() {
    // Filter by category
    if (currentCategory === 'all') {
        filteredTemplates = [...currentTemplates];
    } else {
        filteredTemplates = currentTemplates.filter(template => 
            template.category === currentCategory
        );
    }
    
    // Display templates for current page
    const startIndex = (currentPage - 1) * templatesPerPage;
    const endIndex = startIndex + templatesPerPage;
    const templatesToShow = filteredTemplates.slice(0, endIndex);
    
    displayTemplates(templatesToShow);
    updateLoadMoreButton();
}

// Display templates in grid
function displayTemplates(templates) {
    templatesGrid.innerHTML = '';
    
    templates.forEach(template => {
        const templateCard = createTemplateCard(template);
        templatesGrid.appendChild(templateCard);
    });
}

// Create template card element
function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.dataset.category = template.category;
    card.onclick = () => viewTemplate(template.id);
    
    const featuresHTML = template.features.map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="template-header">
            <h3 class="template-name">${template.name}</h3>
            <span class="template-category-badge ${template.category}">${getCategoryDisplayName(template.category)}</span>
        </div>
        <p class="template-description">${template.description}</p>
        <div class="template-features">
            ${featuresHTML}
        </div>
        <div class="template-info">
            <div class="template-stats">
                <span class="stat-downloads">📥 ${template.downloads}</span>
                <span class="stat-rating">⭐ ${template.rating}</span>
            </div>
            <div class="template-actions-preview">
                <button class="quick-action-btn" onclick="event.stopPropagation(); previewTemplate(${template.id})">Preview</button>
                <button class="quick-action-btn" onclick="event.stopPropagation(); downloadTemplate(${template.id})">Download</button>
            </div>
        </div>
    `;
    
    return card;
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'webpage': 'Web Template',
        'ai-apps': 'AI App',
        'agentic-apps': 'Agentic App'
    };
    return categoryNames[category] || category;
}

// View template details
function viewTemplate(templateId) {
    currentTemplate = currentTemplates.find(t => t.id === templateId);
    if (!currentTemplate) return;
    
    showScreen('viewer-screen');
    loadTemplateDetails();
}

// Load template details
function loadTemplateDetails() {
    const titleElement = document.getElementById('template-title');
    const categoryElement = document.getElementById('template-category');
    const sizeElement = document.getElementById('template-size');
    const versionElement = document.getElementById('template-version');
    const contentElement = document.getElementById('template-content');
    
    // Show loading state
    titleElement.textContent = 'Loading Template...';
    categoryElement.textContent = 'Category: Loading...';
    sizeElement.textContent = 'Size: Loading...';
    versionElement.textContent = 'Version: Loading...';
    contentElement.innerHTML = `
        <div class="content-loading">
            <div class="retro-spinner"></div>
            <p>LOADING TEMPLATE DETAILS...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        titleElement.textContent = currentTemplate.name;
        categoryElement.textContent = `Category: ${getCategoryDisplayName(currentTemplate.category)}`;
        sizeElement.textContent = `Size: ${currentTemplate.size}`;
        versionElement.textContent = `Version: ${currentTemplate.version}`;
        
        // Convert markdown content to HTML (simplified)
        const htmlContent = convertMarkdownToHTML(currentTemplate.content);
        contentElement.innerHTML = htmlContent;
        
        // Update action buttons
        updateActionButtons();
    }, 800);
}

// Convert markdown to HTML (simplified)
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Convert bold text
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // Convert bullet points
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convert numbered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // Convert paragraphs
    html = html.split('\n\n').map(paragraph => {
        if (!paragraph.startsWith('<') && paragraph.trim()) {
            return `<p>${paragraph.trim()}</p>`;
        }
        return paragraph;
    }).join('\n');
    
    return html;
}

// Update action buttons
function updateActionButtons() {
    const previewBtn = document.getElementById('preview-btn');
    const downloadBtn = document.getElementById('download-btn');
    const forkBtn = document.getElementById('fork-btn');
    
    previewBtn.onclick = () => previewTemplate(currentTemplate.id);
    downloadBtn.onclick = () => downloadTemplate(currentTemplate.id);
    forkBtn.onclick = () => forkTemplate(currentTemplate.id);
}

// Show templates list
function showTemplatesList() {
    showScreen('templates-screen');
    currentTemplate = null;
}

// Preview template
function previewTemplate(templateId = null) {
    const template = templateId ? 
        currentTemplates.find(t => t.id === templateId) : 
        currentTemplate;
    
    if (!template) return;
    
    // Create and show preview modal
    const modal = createPreviewModal(template);
    document.body.appendChild(modal);
    modal.classList.add('active');
}

// Create preview modal
function createPreviewModal(template) {
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${template.name} - Live Preview</h3>
                <button class="close-modal" onclick="closePreviewModal(this)">×</button>
            </div>
            <div class="modal-body">
                <iframe class="preview-iframe" src="${template.preview_url}" frameborder="0"></iframe>
            </div>
        </div>
    `;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePreviewModal(modal.querySelector('.close-modal'));
        }
    });
    
    return modal;
}

// Close preview modal
function closePreviewModal(button) {
    const modal = button.closest('.preview-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Download template
function downloadTemplate(templateId = null) {
    const template = templateId ? 
        currentTemplates.find(t => t.id === templateId) : 
        currentTemplate;
    
    if (!template) return;
    
    // Simulate download
    alert(`Downloading ${template.name}...\n\nThis would normally start the download of the template files.`);
    
    // In a real implementation, you would:
    // window.location.href = template.download_url;
}

// Fork template
function forkTemplate(templateId = null) {
    const template = templateId ? 
        currentTemplates.find(t => t.id === templateId) : 
        currentTemplate;
    
    if (!template) return;
    
    // Simulate fork action
    alert(`Forking ${template.name}...\n\nThis would create a customizable copy in your workspace.`);
}

// Load more templates
function loadMoreTemplates() {
    currentPage++;
    filterAndDisplayTemplates();
}

// Update load more button
function updateLoadMoreButton() {
    const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
    const shouldShowLoadMore = currentPage < totalPages;
    
    if (shouldShowLoadMore) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// Update template count
function updateTemplateCount() {
    if (templateCountElement) {
        templateCountElement.textContent = currentTemplates.length;
        
        // Animate count
        let count = 0;
        const target = currentTemplates.length;
        const increment = Math.ceil(target / 30);
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            templateCountElement.textContent = count;
        }, 50);
    }
}

// Show/hide loading
function showLoading(show) {
    if (show) {
        loadingElement.style.display = 'block';
        templatesGrid.style.display = 'none';
        errorElement.style.display = 'none';
        loadMoreContainer.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        templatesGrid.style.display = 'grid';
    }
}

// Show error
function showError() {
    loadingElement.style.display = 'none';
    templatesGrid.style.display = 'none';
    errorElement.style.display = 'block';
    loadMoreContainer.style.display = 'none';
}

// Search functionality (if you want to add search later)
function searchTemplates(query) {
    const searchResults = currentTemplates.filter(template =>
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.description.toLowerCase().includes(query.toLowerCase()) ||
        template.features.some(feature => 
            feature.toLowerCase().includes(query.toLowerCase())
        )
    );
    
    filteredTemplates = searchResults;
    currentPage = 1;
    displayTemplates(filteredTemplates.slice(0, templatesPerPage));
    updateLoadMoreButton();
}
