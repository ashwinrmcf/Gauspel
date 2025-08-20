const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Authentication
    authenticate: (credentials) => ipcRenderer.invoke('authenticate', credentials),
    registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
    resetPassword: (email) => ipcRenderer.invoke('reset-password', email),

    // Navigation
    navigateToDashboard: () => ipcRenderer.invoke('navigate-to-dashboard'),
    navigateToLogin: () => ipcRenderer.invoke('navigate-to-login'),
    navigateToSignup: () => ipcRenderer.invoke('navigate-to-signup'),
    navigateToForgotPassword: () => ipcRenderer.invoke('navigate-to-forgot-password'),

    // System info
    platform: process.platform
});
