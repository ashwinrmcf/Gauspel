// Truth and integrity quotes for Gauspel
const truthQuotes = [
    {
        text: "Truth is the first casualty of war, but it doesn't have to be.",
        author: "Gauspel"
    },
    {
        text: "In a world of information, verification is wisdom.",
        author: "Digital Age Proverb"
    },
    {
        text: "The truth will set you free, but first it will challenge you.",
        author: "Unknown"
    },
    {
        text: "Facts are stubborn things; and whatever may be our wishes, they cannot alter the state of facts.",
        author: "John Adams"
    },
    {
        text: "A lie can travel halfway around the world while the truth is putting on its shoes.",
        author: "Mark Twain"
    },
    {
        text: "The only way to combat fake news is with real facts.",
        author: "Gauspel"
    },
    {
        text: "Doubt is not a pleasant condition, but certainty is absurd.",
        author: "Voltaire"
    },
    {
        text: "Trust, but verify.",
        author: "Ronald Reagan"
    }
];

let currentQuoteIndex = 0;

function rotateQuotes() {
    const quoteTextElement = document.getElementById('quoteText');
    const quoteAuthorElement = document.querySelector('.quote-author');
    
    if (quoteTextElement && quoteAuthorElement) {
        // Fade out
        quoteTextElement.style.opacity = '0.3';
        quoteAuthorElement.style.opacity = '0.3';
        
        setTimeout(() => {
            // Change quote
            currentQuoteIndex = (currentQuoteIndex + 1) % truthQuotes.length;
            const currentQuote = truthQuotes[currentQuoteIndex];
            
            quoteTextElement.textContent = `"${currentQuote.text}"`;
            quoteAuthorElement.textContent = `- ${currentQuote.author}`;
            
            // Fade in
            quoteTextElement.style.opacity = '0.8';
            quoteAuthorElement.style.opacity = '0.7';
        }, 300);
    }
}

// Initialize manual quote sync when page loads
document.addEventListener('DOMContentLoaded', function() {
    const syncBtn = document.getElementById('syncQuoteBtn');
    if (syncBtn) {
        syncBtn.addEventListener('click', rotateQuotes);
    }
});
