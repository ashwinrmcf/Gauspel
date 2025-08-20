const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Authentication
    authenticate: (credentials) => ipcRenderer.invoke('authenticate', credentials),

    // Navigation
    navigateToDashboard: () => ipcRenderer.invoke('navigate-to-dashboard'),
    navigateToLogin: () => ipcRenderer.invoke('navigate-to-login'),

    // System info
    platform: process.platform,

    // Window controls
    minimize: () => ipcRenderer.invoke('minimize-window'),
    maximize: () => ipcRenderer.invoke('maximize-window'),
    close: () => ipcRenderer.invoke('close-window')
});
