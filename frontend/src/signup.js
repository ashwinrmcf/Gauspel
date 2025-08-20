class SignupApp {
    constructor() {
        this.isLoading = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Form submission
        const form = document.getElementById('signupForm');
        form.addEventListener('submit', this.handleSignup.bind(this));

        // Password toggles
        const togglePassword = document.getElementById('togglePassword');
        const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
        togglePassword.addEventListener('click', () => this.togglePasswordVisibility('password'));
        toggleConfirmPassword.addEventListener('click', () => this.togglePasswordVisibility('confirmPassword'));

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', this.handleSocialLogin.bind(this));
        });

        // Login link
        const loginLink = document.getElementById('loginLink');
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.electronAPI.navigateToLogin();
        });

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('input', this.checkPasswordStrength.bind(this));

        // Real-time password match validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        confirmPasswordInput.addEventListener('input', this.validatePasswordMatch.bind(this));

        // Input focus effects
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });
    }

    async handleSignup(e) {
        e.preventDefault();

        if (this.isLoading) return;

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!this.validateForm(username, email, password, confirmPassword)) {
            return;
        }

        this.setLoadingState(true);

        try {
            const result = await window.electronAPI.registerUser({
                username,
                email,
                password
            });

            if (result.success) {
                this.showNotification('Account created successfully! Redirecting to login...', 'success');

                setTimeout(async () => {
                    await window.electronAPI.navigateToLogin();
                }, 2000);
            } else {
                this.showNotification(result.error || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showNotification('Registration failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(username, email, password, confirmPassword) {
        if (!username || !email || !password || !confirmPassword) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }

        if (username.length < 3) {
            this.showNotification('Username must be at least 3 characters long', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return false;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    checkPasswordStrength() {
        const password = document.getElementById('password').value;
        const passwordGroup = document.getElementById('password').parentElement;

        // Remove existing strength indicator
        const existingIndicator = passwordGroup.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        if (password.length === 0) return;

        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';

        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            strengthIndicator.classList.add('weak');
        } else if (strength <= 4) {
            strengthIndicator.classList.add('medium');
        } else {
            strengthIndicator.classList.add('strong');
        }

        passwordGroup.appendChild(strengthIndicator);
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (confirmPassword.length === 0) {
            confirmPasswordInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            return;
        }

        if (password === confirmPassword) {
            confirmPasswordInput.style.borderColor = '#10b981';
        } else {
            confirmPasswordInput.style.borderColor = '#ef4444';
        }
    }

    togglePasswordVisibility(inputId) {
        const passwordInput = document.getElementById(inputId);
        const toggleBtn = document.getElementById(inputId === 'password' ? 'togglePassword' : 'toggleConfirmPassword');

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
        this.showNotification(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup coming soon!`, 'error');
    }

    handleInputFocus(e) {
        e.target.parentElement.classList.add('focused');
    }

    handleInputBlur(e) {
        e.target.parentElement.classList.remove('focused');
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        const signupBtn = document.getElementById('signupBtn');
        const inputs = document.querySelectorAll('input');

        if (loading) {
            signupBtn.disabled = true;
            signupBtn.innerHTML = '<span class="spinner"></span> Creating Account...';
            inputs.forEach(input => input.disabled = true);
        } else {
            signupBtn.disabled = false;
            signupBtn.textContent = 'Signup';
            inputs.forEach(input => input.disabled = false);
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
    new SignupApp();
});

const style = document.createElement('style');
style.textContent = `
    .input-group.focused input {
        border-color: #6366f1 !important;
        background: rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
    }
`;
document.head.appendChild(style);
