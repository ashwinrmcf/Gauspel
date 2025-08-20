class WelcomeApp {
    constructor() {
        this.contentStreams = [];
        this.initializeApp();
        this.setupEventListeners();
        this.startAnimations();
    }

    initializeApp() {
        // Create content streams for each column
        this.createContentStreams();

        // Add initial delay for smoother startup
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    createContentStreams() {
        const streams = [
            { id: 'stream-1', content: this.shuffleArray([...contentData.facts]) },
            { id: 'stream-2', content: this.shuffleArray([...contentData.news]) },
            { id: 'stream-3', content: this.shuffleArray([...contentData.facts, ...contentData.news]) },
            { id: 'stream-4', content: this.shuffleArray([...contentData.facts]) },
            { id: 'stream-5', content: this.shuffleArray([...contentData.news]) }
        ];

        streams.forEach(stream => {
            const streamElement = document.getElementById(stream.id);
            if (streamElement) {
                this.populateStream(streamElement, stream.content);
            }
        });
    }

    populateStream(streamElement, content) {
        // Create more copies for truly seamless scrolling
        const copies = 10; // Increased from 8

        for (let copy = 0; copy < copies; copy++) {
            content.forEach(item => {
                const cardElement = this.createContentCard(item);
                streamElement.appendChild(cardElement);
            });
        }
    }

    createContentCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';

        const isNews = contentData.news.includes(item);

        card.innerHTML = `
            <div class="card-header">
                <span class="card-emoji">${item.emoji}</span>
                <span class="card-category ${isNews ? 'news-category' : ''}">${item.category}</span>
            </div>
            <div class="card-title">${item.title}</div>
            <div class="card-content">${item.content}</div>
            <div class="card-footer">
                <span class="card-author">${isNews ? item.source : item.author}</span>
                <span class="card-time">${isNews ? item.time : item.company}</span>
            </div>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', this.handleCardHover.bind(this));
        card.addEventListener('mouseleave', this.handleCardLeave.bind(this));

        return card;
    }

    handleCardHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(147, 51, 234, 0.2)';
    }

    handleCardLeave(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    setupEventListeners() {
        const signInBtn = document.getElementById('signInBtn');
        const signUpBtn = document.getElementById('signUpBtn');

        signInBtn.addEventListener('click', this.handleSignIn.bind(this));
        signUpBtn.addEventListener('click', this.handleSignUp.bind(this));

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleSignIn();
            } else if (e.key === 'Escape') {
                // Optional: Add exit functionality
            }
        });
    }

    async handleSignIn() {
        const btn = document.getElementById('signInBtn');
        const originalText = btn.textContent;

        btn.textContent = 'Signing in...';
        btn.disabled = true;

        try {
            // Add smooth transition
            document.body.style.opacity = '0.8';

            setTimeout(async () => {
                await window.electronAPI.navigateToLogin();
            }, 500);
        } catch (error) {
            console.error('Navigation error:', error);
            btn.textContent = originalText;
            btn.disabled = false;
            document.body.style.opacity = '1';
        }
    }

    async handleSignUp() {
        const btn = document.getElementById('signUpBtn');
        const originalText = btn.textContent;

        btn.textContent = 'Redirecting...';
        btn.disabled = true;

        try {
            document.body.style.opacity = '0.8';

            setTimeout(async () => {
                await window.electronAPI.navigateToSignup();
            }, 500);
        } catch (error) {
            console.error('Navigation error:', error);
            btn.textContent = originalText;
            btn.disabled = false;
            document.body.style.opacity = '1';
        }
    }

    startAnimations() {
        // Stagger the start of animations for a more organic feel
        const streams = document.querySelectorAll('.content-stream');

        streams.forEach((stream, index) => {
            stream.style.animationDelay = `${index * -2}s`;
        });

        // Add subtle parallax effect to background circles
        this.setupParallaxEffect();
    }

    setupParallaxEffect() {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 100;
            mouseY = (e.clientY / window.innerHeight) * 100;

            const circles = document.querySelectorAll('.circle');
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 50) * speed;
                const y = (mouseY - 50) * speed;

                circle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WelcomeApp();
});

// Add some performance optimizations
window.addEventListener('load', () => {
    // Enable hardware acceleration for better performance
    document.body.style.transform = 'translateZ(0)';

    // Preload navigation pages
    if (window.electronAPI) {
        // Optional: Preload login/signup pages for faster navigation
    }
});
