import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  downloadFile: (url: string) => ipcRenderer.send("download-file", url),

  onDownloadDone: (callback: (path: string) => void) => {
    const listener = (_e: any, path: string) => callback(path);
    ipcRenderer.on("download-done", listener);
    return () => ipcRenderer.removeListener("download-done", listener); // cleanup
  },

  onDownloadFailed: (callback: (err: string) => void) => {
    const listener = (_e: any, err: string) => callback(err);
    ipcRenderer.on("download-failed", listener);
    return () => ipcRenderer.removeListener("download-failed", listener); // cleanup
  },
});
