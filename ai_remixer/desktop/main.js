const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn, execSync } = require('child_process');

let mainWindow;
let flaskProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true, // Hides the default menu bar
        webPreferences: {
            nodeIntegration: false
        }
    });

    // Wait 3 seconds for the Flask backend to start before loading
    setTimeout(() => {
        mainWindow.loadURL('http://127.0.0.1:5000');
    }, 3000);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function startFlask() {
    const backendDir = path.join(__dirname, '..');
    const pythonExe = path.join(backendDir, 'venv', 'Scripts', 'python.exe');
    const appPy = path.join(backendDir, 'app.py');

    console.log(`Starting Flask: ${pythonExe} ${appPy}`);
    
    flaskProcess = spawn(pythonExe, [appPy], {
        cwd: backendDir
    });

    flaskProcess.stdout.on('data', (data) => {
        console.log(`Flask: ${data}`);
    });

    flaskProcess.stderr.on('data', (data) => {
        console.error(`Flask Error: ${data}`);
    });

    flaskProcess.on('close', (code) => {
        console.log(`Flask process exited with code ${code}`);
    });
}

app.whenReady().then(() => {
    startFlask();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Kill Flask process tree when the Electron app closes
app.on('will-quit', () => {
    if (flaskProcess && flaskProcess.pid) {
        console.log(`Killing Flask process tree (PID: ${flaskProcess.pid})...`);
        try {
            execSync(`taskkill /pid ${flaskProcess.pid} /T /F`);
        } catch (err) {
            console.error('Failed to kill Flask process tree:', err.message);
        }
    }
});
