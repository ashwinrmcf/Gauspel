document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard components
    initializeSidebar();
    initializeChatInterface();
    initializeAnimations();
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await window.electronAPI.navigateToLogin();
        });
    }
});

function initializeSidebar() {
    const newChatBtn = document.querySelector('.new-chat-btn');
    const chatItems = document.querySelectorAll('.chat-item');
    const upgradeBtn = document.querySelector('.upgrade-btn');
    
    // New chat button functionality
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            startNewChat();
            addHoverEffect(newChatBtn);
        });
    }
    
    // Chat history item interactions
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            chatItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            loadChatHistory(item.dataset.chatId);
        });
        
        // Add hover animations
        addHoverEffect(item);
    });
    
    // Upgrade button functionality
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
            showUpgradeModal();
            addHoverEffect(upgradeBtn);
        });
    }
}

function initializeChatInterface() {
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const voiceBtn = document.querySelector('.voice-btn');
    const promptCards = document.querySelectorAll('.prompt-card');
    
    // Message input functionality
    if (messageInput && sendBtn) {
        messageInput.addEventListener('input', () => {
            sendBtn.disabled = messageInput.value.trim() === '';
            autoResizeTextarea(messageInput);
        });
        
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        sendBtn.addEventListener('click', sendMessage);
        addHoverEffect(sendBtn);
    }
    
    // Voice button functionality
    if (voiceBtn) {
        voiceBtn.addEventListener('click', toggleVoiceRecording);
        addHoverEffect(voiceBtn);
    }
    
    // Suggestion cards
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    suggestionCards.forEach(card => {
        card.addEventListener('click', () => {
            const suggestionText = card.querySelector('.suggestion-text').textContent;
            const suggestionDesc = card.querySelector('.suggestion-desc').textContent;
            const fullPrompt = `${suggestionText} ${suggestionDesc}`;
            if (messageInput) {
                messageInput.value = fullPrompt;
                messageInput.focus();
                sendBtn.disabled = false;
            }
        });
        addHoverEffect(card);
    });
}

function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.sidebar, .main-content, .welcome-screen');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add floating animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1) rotate(5deg)';
            logo.style.boxShadow = '0 0 40px rgba(147, 51, 234, 0.6)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
            logo.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.4)';
        });
    }
}

function addHoverEffect(element) {
    if (!element) return;
    
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
        element.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
}

function startNewChat() {
    // Clear current chat
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    
    // Show welcome screen
    const welcomeScreen = document.querySelector('.welcome-screen');
    const chatArea = document.querySelector('.chat-area');
    
    if (welcomeScreen && chatArea) {
        chatArea.style.justifyContent = 'center';
        welcomeScreen.style.display = 'block';
        
        // Add entrance animation
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transform = 'scale(0.9)';
        setTimeout(() => {
            welcomeScreen.style.transition = 'all 0.4s ease-out';
            welcomeScreen.style.opacity = '1';
            welcomeScreen.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Clear message input
    const messageInput = document.querySelector('.message-input');
    if (messageInput) {
        messageInput.value = '';
        messageInput.focus();
    }
    
    // Remove active state from chat items
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
}

function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const messagesContainer = document.querySelector('.messages-container');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const chatArea = document.querySelector('.chat-area');
    
    if (!messageInput || !messagesContainer) return;
    
    const messageText = messageInput.value.trim();
    if (!messageText) return;
    
    // Hide welcome screen and show messages
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }
    if (chatArea) {
        chatArea.style.justifyContent = 'flex-start';
    }
    
    // Create user message
    const userMessage = createMessageElement('user', messageText);
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    messageInput.value = '';
    document.querySelector('.send-btn').disabled = true;
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simulate AI response after delay
    setTimeout(() => {
        const aiResponse = createMessageElement('assistant', 'This is a demo response. The actual AI integration would go here.');
        messagesContainer.appendChild(aiResponse);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

function createMessageElement(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = type === 'user' ? 'U' : 'G';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    content.appendChild(messageText);
    content.appendChild(messageTime);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    // Add entrance animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease-out';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);
    
    return messageDiv;
}

function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

function toggleVoiceRecording() {
    const voiceBtn = document.querySelector('.voice-btn');
    if (!voiceBtn) return;
    
    const isRecording = voiceBtn.classList.contains('recording');
    
    if (isRecording) {
        // Stop recording
        voiceBtn.classList.remove('recording');
        voiceBtn.style.background = 'rgba(34, 197, 94, 0.2)';
        voiceBtn.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        voiceBtn.innerHTML = '🎤';
    } else {
        // Start recording
        voiceBtn.classList.add('recording');
        voiceBtn.style.background = 'rgba(239, 68, 68, 0.2)';
        voiceBtn.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        voiceBtn.innerHTML = '⏹️';
        
        // Auto-stop after 30 seconds
        setTimeout(() => {
            if (voiceBtn.classList.contains('recording')) {
                toggleVoiceRecording();
            }
        }, 30000);
    }
}

function loadChatHistory(chatId) {
    // This would load chat history from storage/API
    console.log('Loading chat history for:', chatId);
    
    // For demo purposes, just show a sample message
    const messagesContainer = document.querySelector('.messages-container');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const chatArea = document.querySelector('.chat-area');
    
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (chatArea) chatArea.style.justifyContent = 'flex-start';
    
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
        const sampleMessage = createMessageElement('assistant', 'This is a sample message from your chat history.');
        messagesContainer.appendChild(sampleMessage);
    }
}

function showUpgradeModal() {
    // This would show an upgrade modal
    alert('Upgrade to Gauspel Pro for unlimited conversations and advanced features!');
}

// Add some utility functions for smooth interactions
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect styles dynamically
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(147, 51, 234, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
