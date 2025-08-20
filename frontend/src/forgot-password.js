class ForgotPasswordApp {
    constructor() {
        this.isLoading = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Form submission
        const form = document.getElementById('forgotForm');
        form.addEventListener('submit', this.handlePasswordReset.bind(this));

        // Signup link
        const signupLink = document.getElementById('signupLink');
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.electronAPI.navigateToSignup();
        });

        // Skip section click (back to login)
        const skipSection = document.querySelector('.skip-section');
        skipSection.addEventListener('click', () => {
            window.electronAPI.navigateToLogin();
        });

        // Input focus effects
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });

        // Enter key support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isLoading) {
                const form = document.getElementById('forgotForm');
                form.dispatchEvent(new Event('submit'));
            }
        });
    }

    async handlePasswordReset(e) {
        e.preventDefault();

        if (this.isLoading) return;

        const email = document.getElementById('email').value.trim();

        if (!this.validateForm(email)) {
            return;
        }

        this.setLoadingState(true);

        try {
            const result = await window.electronAPI.resetPassword(email);

            if (result.success) {
                this.showNotification(result.message || 'Password reset instructions sent to your email!', 'success');

                // Clear form
                document.getElementById('email').value = '';

                // Navigate back to login after delay
                setTimeout(async () => {
                    await window.electronAPI.navigateToLogin();
                }, 3000);
            } else {
                this.showNotification(result.error || 'Failed to send reset instructions', 'error');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            this.showNotification('Failed to send reset instructions. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(email) {
        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleInputFocus(e) {
        e.target.parentElement.classList.add('focused');
    }

    handleInputBlur(e) {
        e.target.parentElement.classList.remove('focused');
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        const resetBtn = document.getElementById('resetBtn');
        const emailInput = document.getElementById('email');

        if (loading) {
            resetBtn.disabled = true;
            resetBtn.innerHTML = '<span class="spinner"></span> Sending...';
            emailInput.disabled = true;
        } else {
            resetBtn.disabled = false;
            resetBtn.textContent = 'Reset Password';
            emailInput.disabled = false;
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
        }, 4000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new ForgotPasswordApp();
});

// Add CSS for input focus states
const style = document.createElement('style');
style.textContent = `
    .input-group.focused input {
        border-color: #d946ef !important;
        background: rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 0 0 3px rgba(217, 70, 239, 0.1) !important;
    }
`;
document.head.appendChild(style);
