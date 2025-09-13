import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { download } from "electron-dl";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  // listen dari preload/renderer
  ipcMain.on("download-file", async (event, url: string) => {
    const focusedWin = BrowserWindow.getFocusedWindow();
    if (!focusedWin) return;

    try {
      const dl = await download(focusedWin, url, {
        directory: app.getPath("downloads"), 
        saveAs: true, 
      });
    
      focusedWin.webContents.send("download-done", dl.getSavePath());
    } catch (err) {
      focusedWin.webContents.send("download-failed", String(err));
    }
  });
});
