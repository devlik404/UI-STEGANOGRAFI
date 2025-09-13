"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  downloadFile: (url) => electron.ipcRenderer.send("download-file", url),
  onDownloadDone: (callback) => {
    const listener = (_e, path) => callback(path);
    electron.ipcRenderer.on("download-done", listener);
    return () => electron.ipcRenderer.removeListener("download-done", listener);
  },
  onDownloadFailed: (callback) => {
    const listener = (_e, err) => callback(err);
    electron.ipcRenderer.on("download-failed", listener);
    return () => electron.ipcRenderer.removeListener("download-failed", listener);
  }
});
