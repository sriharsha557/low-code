<script>
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
