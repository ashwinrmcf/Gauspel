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
            { id: 'stream-1' },
            { id: 'stream-2' },
            { id: 'stream-3' },
            { id: 'stream-4' },
            { id: 'stream-5' }
        ];

        streams.forEach(stream => {
            const streamElement = document.getElementById(stream.id);
            if (streamElement) {
                this.populateStream(streamElement);
                // Duplicate content once for perfect 50% loop distance
                const clones = Array.from(streamElement.children).map(node => node.cloneNode(true));
                clones.forEach(clone => streamElement.appendChild(clone));
            }
        });
    }

    populateStream(streamElement) {
        // Generate cards using fake vs facts data
        const cards = this.generateContentCards();
        cards.forEach(cardHTML => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = cardHTML;
            streamElement.appendChild(cardElement.firstElementChild);
        });
    }

    generateContentCards() {
        const cards = [];
        
        // Load fake vs facts data from external file
        const fakeVsFactsData = window.fakeVsFactsData || [
            {
                id: 1,
                category: "Technology",
                emoji: "📱",
                fakeNews: {
                    title: "5G Towers Control Your Mind",
                    content: "New study reveals 5G towers emit brain-controlling frequencies that make people buy more products online."
                },
                realFact: {
                    title: "5G Technology Facts",
                    content: "5G uses radio frequencies similar to 4G but with higher speeds. No scientific evidence supports mind control claims."
                }
            },
            {
                id: 2,
                category: "Health",
                emoji: "💉",
                fakeNews: {
                    title: "Vaccines Contain Microchips",
                    content: "Secret government documents reveal all vaccines now contain tracking microchips to monitor citizens."
                },
                realFact: {
                    title: "Vaccine Ingredients",
                    content: "Vaccines contain antigens, preservatives, and stabilizers. No microchips or tracking devices are present."
                }
            },
            {
                id: 3,
                category: "Climate",
                emoji: "🌡️",
                fakeNews: {
                    title: "Global Warming is a Hoax",
                    content: "Scientists admit climate change data was fabricated to increase government funding and control."
                },
                realFact: {
                    title: "Climate Science Consensus",
                    content: "97% of climate scientists agree that human activities are the primary cause of recent climate change."
                }
            },
            {
                id: 4,
                category: "Space",
                emoji: "🌙",
                fakeNews: {
                    title: "Moon Landing Was Staged",
                    content: "Hollywood director admits he filmed the 1969 moon landing in a secret studio for NASA."
                },
                realFact: {
                    title: "Moon Landing Evidence",
                    content: "Multiple lines of evidence confirm moon landings, including retroreflectors still used by scientists today."
                }
            },
            {
                id: 5,
                category: "AI",
                emoji: "🤖",
                fakeNews: {
                    title: "AI Will Replace All Jobs by 2025",
                    content: "Leaked report shows artificial intelligence will eliminate 95% of human jobs within two years."
                },
                realFact: {
                    title: "AI Job Impact Reality",
                    content: "AI will transform jobs rather than eliminate them entirely. New roles in AI management and oversight are emerging."
                }
            },
            {
                id: 6,
                category: "Food",
                emoji: "🥛",
                fakeNews: {
                    title: "Milk Causes Autism",
                    content: "New research links dairy consumption during pregnancy to increased autism rates in children."
                },
                realFact: {
                    title: "Autism Research Facts",
                    content: "No credible scientific evidence links dairy consumption to autism. Autism has genetic and developmental factors."
                }
            },
            {
                id: 7,
                category: "Internet",
                emoji: "📡",
                fakeNews: {
                    title: "WiFi Signals Cause Cancer",
                    content: "Study reveals WiFi radiation increases cancer risk by 300% in households with multiple devices."
                },
                realFact: {
                    title: "WiFi Safety Research",
                    content: "WiFi uses non-ionizing radiation at levels far below harmful thresholds. No cancer link has been established."
                }
            },
            {
                id: 8,
                category: "Medicine",
                emoji: "💊",
                fakeNews: {
                    title: "Natural Remedies Cure Everything",
                    content: "Big Pharma suppresses knowledge that lemon juice and honey can cure cancer and diabetes."
                },
                realFact: {
                    title: "Evidence-Based Medicine",
                    content: "While natural compounds can have health benefits, serious diseases require proven medical treatments."
                }
            },
            {
                id: 9,
                category: "Energy",
                emoji: "⚡",
                fakeNews: {
                    title: "Free Energy Devices Suppressed",
                    content: "Oil companies hide revolutionary free energy technology that could power the world forever."
                },
                realFact: {
                    title: "Energy Conservation Laws",
                    content: "The laws of thermodynamics prevent perpetual motion machines. Energy cannot be created from nothing."
                }
            },
            {
                id: 10,
                category: "Nutrition",
                emoji: "🍎",
                fakeNews: {
                    title: "Organic Food is a Scam",
                    content: "Secret study shows organic foods contain more pesticides than conventional produce."
                },
                realFact: {
                    title: "Organic Standards",
                    content: "Organic foods are grown with strict regulations limiting synthetic pesticides and fertilizers."
                }
            }
        ];
        
        // Generate 80 cards randomly from the data
        for (let i = 0; i < 80; i++) {
            const item = fakeVsFactsData[Math.floor(Math.random() * fakeVsFactsData.length)];
            
            cards.push(`
                <div class="content-card">
                    <div class="card-header">
                        <span class="card-emoji">${item.emoji}</span>
                        <div class="card-category">${item.category}</div>
                    </div>
                    
                    <div class="fake-news-section">
                        <h4 class="news-title">${item.fakeNews.title}</h4>
                        <p class="news-content">${item.fakeNews.content}</p>
                    </div>
                    
                    <div class="real-fact-section">
                        <h4 class="news-title">${item.realFact.title}</h4>
                        <p class="news-content">${item.realFact.content}</p>
                    </div>
                </div>
            `);
        }
        
        return cards;
    }


    handleCardHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-4px) translateZ(0)';
        card.style.opacity = '0.9';
    }

    handleCardLeave(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(0) translateZ(0)';
        card.style.opacity = '0.7';
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
        const getStartedBtn = document.getElementById('getStartedBtn');

        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', this.handleGetStarted.bind(this));
        }

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleGetStarted();
            } else if (e.key === 'Escape') {
                // Optional: Add exit functionality
            }
        });
    }

    async handleGetStarted() {
        const btn = document.getElementById('getStartedBtn');
        const logo = document.querySelector('.logo-image');
        if (!btn || !logo) return;
        
        const originalText = btn.textContent;

        // Disable button and show loading state
        btn.textContent = 'Loading...';
        btn.disabled = true;

        try {
            // Create transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'page-transition';
            document.body.appendChild(overlay);

            // Start eye-catching logo animation
            logo.classList.add('click-animation');

            // Activate transition overlay after a short delay
            setTimeout(() => {
                overlay.classList.add('active');
            }, 800);

            // Navigate after logo animation completes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Navigation error:', error);
            btn.textContent = originalText;
            btn.disabled = false;
            
            // Remove overlay if it exists
            const overlay = document.querySelector('.page-transition');
            if (overlay) {
                overlay.remove();
            }
            
            // Remove animation class
            if (logo) {
                logo.classList.remove('click-animation');
            }
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
