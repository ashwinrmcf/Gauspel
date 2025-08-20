const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hiddenInset', // Modern look
        backgroundColor: '#0a0a1a',
        show: false, // Don't show until ready
        icon: path.join(__dirname, 'src/assets/icon.png')
    });

    // Load the login page
    mainWindow.loadFile('src/welcome.html');

    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Remove default menu in production
    if (process.env.NODE_ENV === 'production') {
        mainWindow.setMenuBarVisibility(false);
    }

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App event listeners
app.whenReady().then(() => {
    createWindow();

    // macOS specific behavior
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC handlers
// Add these IPC handlers to your existing main.js

ipcMain.handle('navigate-to-signup', async () => {
    mainWindow.loadFile('src/signup.html');
});
ipcMain.handle('navigate-to-welcome', async () => {
    mainWindow.loadFile('src/welcome.html');
});

ipcMain.handle('navigate-to-forgot-password', async () => {
    mainWindow.loadFile('src/forgot-password.html');
});

ipcMain.handle('register-user', async (event, userData) => {
    // Simulate user registration (replace with real logic)
    const { username, email, password } = userData;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation
    if (username && email && password) {
        return {
            success: true,
            user: {
                name: username,
                email: email
            }
        };
    }

    return { success: false, error: 'Registration failed' };
});

ipcMain.handle('reset-password', async (event, email) => {
    // Simulate password reset (replace with real logic)
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email && email.includes('@')) {
        return { success: true, message: 'Password reset link sent to your email' };
    }

    return { success: false, error: 'Invalid email address' };
});
ipcMain.handle('authenticate', async (event, credentials) => {
    // Simulate authentication (replace with real logic)
    const { username, password } = credentials;

    // Example authentication logic
    if (username && password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock successful authentication
        if (username.toLowerCase() !== 'admin' || password !== 'wrong') {
            return {
                success: true,
                user: {
                    name: username,
                    email: `${username}@example.com`
                }
            };
        }
    }

    return { success: false, error: 'Invalid credentials' };
});

ipcMain.handle('navigate-to-dashboard', async () => {
    mainWindow.loadFile('src/dashboard.html');
});

ipcMain.handle('navigate-to-login', async () => {
    mainWindow.loadFile('src/index.html');
});

