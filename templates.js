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
        size: "1.8 MB",
        version: "v1.5",
        preview_url: "https://example.com/preview/portfolio",
        download_url: "#",
        content: `# Portfolio Showcase Template

## Creative Portfolio Solution
Elegant portfolio template perfect for showcasing your creative work.

## Features
- **Image Gallery**: Beautiful grid layout for your work
- **Lightbox**: Full-screen image viewing
- **Blog Integration**: Share your creative process
- **Contact Forms**: Let clients reach out easily
- **Mobile Optimized**: Looks great on all devices
- **Fast Loading**: Optimized images and code

## Perfect For
- Photographers
- Graphic Designers
- Artists
- Creative Professionals
- Freelancers

## Customization Options
- Multiple color schemes
- Flexible layout options
- Easy content management
- Social media integration`
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
        content: `# AI Chatbot Assistant

## Intelligent Conversation AI
Advanced chatbot application with natural language understanding and contextual responses.

## Core Features
- **Natural Language Processing**: Understands complex queries
- **Conversation Memory**: Remembers context throughout chat
- **Personality Customization**: Adjustable tone and responses
- **Multi-language Support**: Communicate in multiple languages
- **Learning Capabilities**: Improves responses over time
- **Integration Ready**: Easy API integration

## Use Cases
- Customer support
- Personal assistant
- Educational tutor
- Entertainment companion
- Business automation

## Technical Requirements
- Python 3.8+
- TensorFlow/PyTorch
- OpenAI API access
- Database for conversation storage

## Setup Guide
1. Install dependencies
2. Configure API keys
3. Train custom personality
4. Deploy to your platform
5. Test and refine responses`
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
        content: `# Image Recognition Application

## Advanced Computer Vision
Powerful image recognition system using state-of-the-art AI models.

## Capabilities
- **Object Detection**: Identify and classify objects in images
- **Face Recognition**: Detect and recognize faces with high accuracy
- **Scene Analysis**: Understand image context and environment
- **Text Extraction**: OCR functionality for text in images
- **Real-time Processing**: Fast analysis for live camera feeds
- **Batch Processing**: Handle multiple images simultaneously

## Applications
- Security systems
- Content moderation
- Inventory management
- Medical imaging
- Automotive systems
- Social media platforms

## Model Features
- 95%+ accuracy on standard datasets
- Support for 1000+ object classes
- Custom model training capabilities
- Edge deployment optimization

## Installation
1. Download the application
2. Install required dependencies
3. Configure camera/image input
4. Run calibration tests
5. Start recognition engine`
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
        content: `# Sentiment Analysis Tool

## Advanced Text Emotion Detection
Comprehensive sentiment analysis with detailed emotional insights.

## Analysis Features
- **Sentiment Scoring**: Positive/negative/neutral classification
- **Emotion Detection**: Joy, anger, fear, sadness, surprise, disgust
- **Confidence Levels**: Reliability scores for each prediction
- **Batch Processing**: Analyze multiple texts simultaneously
- **Historical Tracking**: Monitor sentiment trends over time
- **Custom Training**: Adapt to domain-specific language

## Business Applications
- Social media monitoring
- Customer feedback analysis
- Brand reputation management
- Market research
- Content optimization
- Customer service insights

## Supported Formats
- Plain text
- CSV files
- JSON data
- Social media posts
- Reviews and comments
- Survey responses

## API Integration
- RESTful API endpoints
- Real-time webhooks
- Batch processing queues
- Custom model deployment`
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
        content: `# Task Automation Agent

## Intelligent Process Automation
Advanced agentic system that autonomously handles complex workflows.

## Agent Capabilities
- **Task Decomposition**: Break complex goals into manageable steps
- **Dynamic Planning**: Adapt plans based on changing conditions
- **Resource Management**: Optimize use of available tools and APIs
- **Error Handling**: Automatic recovery and alternative approaches
- **Progress Reporting**: Real-time status updates and notifications
- **Learning Integration**: Improve performance through experience

## Automation Features
- Web scraping and data collection
- File processing and organization
- Email and communication management
- Report generation and distribution
- Database operations and maintenance
- System monitoring and alerts

## Use Cases
- Business process automation
- Data pipeline management
- Content management workflows
- Customer service automation
- Research and analysis tasks
- System administration

## Configuration
1. Define task objectives
2. Set up tool integrations
3. Configure monitoring parameters
4. Test execution flows
5. Deploy autonomous operation`
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
        content: `# Research Assistant Bot

## Autonomous Research Intelligence
Comprehensive research agent that conducts thorough investigations and analysis.

## Research Capabilities
- **Multi-source Data Gathering**: Web, databases, APIs, documents
- **Information Verification**: Cross-reference and fact-checking
- **Data Analysis**: Statistical analysis and pattern recognition
- **Report Synthesis**: Generate structured, comprehensive reports
- **Citation Management**: Proper source attribution and referencing
- **Continuous Learning**: Improve research strategies over time

## Research Domains
- Academic research
- Market analysis
- Competitive intelligence
- Technical documentation
- News and trend analysis
- Scientific literature review

## Output Formats
- Executive summaries
- Detailed research reports
- Data visualizations
- Reference bibliographies
- Presentation slides
- Raw data exports

## Workflow Process
1. Define research questions
2. Identify relevant sources
3. Collect and verify information
4. Analyze and synthesize data
5. Generate comprehensive reports
6. Provide recommendations

## Advanced Features
- Multi-language research
- Real-time monitoring
- Collaborative workflows
- Custom research templates
- Integration with research tools`
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
        content: `# Customer Service Agent

## Intelligent Customer Support Automation
Advanced agentic system for autonomous customer service operations.

## Service Capabilities
- **Issue Classification**: Automatic categorization of customer inquiries
- **Resolution Planning**: Multi-step problem-solving approaches
- **Knowledge Base Integration**: Access to comprehensive support resources
- **Escalation Management**: Smart handoff to human agents when needed
- **Sentiment Monitoring**: Detect customer frustration and adjust approach
- **Follow-up Actions**: Automated case closure and satisfaction surveys

## Communication Channels
- Live chat integration
- Email support automation
- Social media monitoring
- Phone system integration
- Mobile app messaging
- Self-service portals

## Business Benefits
- 24/7 availability
- Consistent service quality
- Reduced response times
- Cost-effective scaling
- Improved customer satisfaction
- Data-driven insights

## Integration Features
- CRM system connectivity
- Ticket management systems
- Knowledge base platforms
- Analytics and reporting
- Multi-language support
- Custom workflow rules

## Implementation
1. Configure knowledge base
2. Set up communication channels
3. Define escalation rules
4. Train on historical data
5. Monitor and optimize performance`
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
}"2.3 MB",
        version: "v2.1",
        preview_url: "https://example.com/preview/business-landing",
        download_url: "#",
        content: `# Business Landing Page Template

## Overview
A modern, professional landing page template designed for businesses of all sizes.

## Features
- **Responsive Design**: Looks great on all devices
- **Contact Forms**: Built-in contact functionality
- **SEO Optimized**: Search engine friendly
- **Fast Loading**: Optimized for performance

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Installation
1. Download the template files
2. Extract to your web directory
3. Customize the content
4. Deploy to your server

## Customization
The template includes easy-to-edit sections for:
- Hero content
- Services
- About section
- Contact information
- Social media links`
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
        content: `# E-commerce Store Template

## Complete Online Store Solution
Full-featured e-commerce template with everything you need to start selling online.

## Key Features
- **Product Management**: Easy product catalog management
- **Shopping Cart**: Intuitive cart functionality
- **Payment Processing**: Multiple payment gateway support
- **Order Management**: Complete order tracking system
- **User Accounts**: Customer registration and profiles
- **Admin Dashboard**: Comprehensive admin interface

## Included Pages
- Homepage with featured products
- Product catalog with filtering
- Individual product pages
- Shopping cart and checkout
- User account pages
- Admin dashboard

## Setup Instructions
1. Install on your web server
2. Configure database connection
3. Set up payment gateways
4. Customize branding and content
5. Add your products
6. Go live!`
    },
    {
        id: 3,
        name: "Portfolio Showcase",
        category: "webpage",
        description: "Creative portfolio template for designers, photographers, and artists. Features gallery, blog, and contact sections.",
        features: ["Image Gallery", "Blog System", "Portfolio Grid", "Lightbox"],
        downloads: 2100,
        rating: 4.9,
        size
