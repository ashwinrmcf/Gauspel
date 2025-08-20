class LoginApp {
    constructor() {
        this.isLoading = false;
        this.initializeEventListeners();
        this.checkRememberedUser();
    }

    initializeEventListeners() {
        // Form submission
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', this.handleLogin.bind(this));

        // Password toggle
        const togglePassword = document.getElementById('togglePassword');
        togglePassword.addEventListener('click', this.togglePasswordVisibility.bind(this));

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', this.handleSocialLogin.bind(this));
        });

        // Enter key support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isLoading) {
                const form = document.getElementById('loginForm');
                form.dispatchEvent(new Event('submit'));
            }
        });

        // Input focus effects
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });
    }

    async handleLogin(e) {
        e.preventDefault();

        if (this.isLoading) return;

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!username || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        this.setLoadingState(true);

        try {
            const result = await window.electronAPI.authenticate({
                username,
                password,
                remember
            });

            if (result.success) {
                this.showNotification('Login successful! Redirecting...', 'success');

                // Store user data if remember is checked
                if (remember) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Navigate to dashboard after short delay
                setTimeout(async () => {
                    await window.electronAPI.navigateToDashboard();
                }, 1500);
            } else {
                this.showNotification(result.error || 'Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    }

    handleSocialLogin(e) {
        const provider = e.currentTarget.dataset.provider;

        this.showNotification(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`, 'error');

        // TODO: Implement OAuth flow
        console.log(`Social login with ${provider}`);
    }

    handleInputFocus(e) {
        e.target.parentElement.classList.add('focused');
    }

    handleInputBlur(e) {
        e.target.parentElement.classList.remove('focused');
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        const loginBtn = document.getElementById('loginBtn');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (loading) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span class="spinner"></span> Logging in...';
            usernameInput.disabled = true;
            passwordInput.disabled = true;
        } else {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login';
            usernameInput.disabled = false;
            passwordInput.disabled = false;
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');

        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 3000);
    }

    checkRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            document.getElementById('username').value = rememberedUser;
            document.getElementById('remember').checked = true;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginApp();

    // Add some nice entrance animations
    setTimeout(() => {
        document.querySelector('.login-card').style.opacity = '1';
    }, 500);
});
// Add these event listeners to your existing LoginApp class constructor
// Add after existing event listeners:

// Signup link
const signupLink = document.getElementById('signupLink');
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.electronAPI.navigateToSignup();
});

// Forgot password link
const forgotPasswordLink = document.querySelector('.forgot-password');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.electronAPI.navigateToForgotPassword();
});
// Add to existing event listeners in each page
const backToWelcome = () => {
    window.electronAPI.navigateToWelcome();
};

// Optional: Add a "Back to Welcome" button or link in your existing pages

// Add CSS for input focus states
const style = document.createElement('style');
style.textContent = `
    .input-group.focused input {
        border-color: #6366f1 !important;
        background: rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
    }
`;
document.head.appendChild(style);
