const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hiddenInset', // Modern look
        backgroundColor: '#1a1a1a',
        show: false, // Don't show until ready
        icon: path.join(__dirname, 'src/assets/icon.png')
    });

    // Load the login page
    mainWindow.loadFile('src/index.html');

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

