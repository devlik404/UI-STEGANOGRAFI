import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { download } from "electron-dl";
import { ChildProcess, spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


let win: BrowserWindow | null = null;
let backendProcess: ChildProcess | null = null;

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
  const devJarPath = path.join(__dirname, "resources", "backend", "steganoapp-0.0.1-SNAPSHOT.jar");

  // 🔹 Path JAR untuk PROD (sudah dibundle di installer)
  const prodJarPath = path.join(process.resourcesPath, "backend", "steganoapp-0.0.1-SNAPSHOT.jar");

  // 🔹 Pilih sesuai mode
  const jarPath = app.isPackaged ? prodJarPath : devJarPath;

  backendProcess = spawn("java", ["-jar", jarPath]);

  console.log("Running JAR at:", jarPath);
  console.log("Running JAR dev at:", devJarPath);



  backendProcess.stdout?.on("data", (data) => {
    console.log(`Spring Boot: ${data}`);
  });

  backendProcess.stderr?.on("data", (data) => {
    console.error(`Spring Boot Error: ${data}`);
  });

  backendProcess.on("close", (code) => {
    console.log(`Spring Boot stopped with code ${code}`);
  });


  createWindow();

  // listen dari preload/renderer
  ipcMain.on("download-file", async (_, url: string) => {
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
app.on("quit", () => {
  if (backendProcess) backendProcess.kill();
});
