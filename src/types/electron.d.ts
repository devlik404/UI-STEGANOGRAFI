export {};

declare global {
  interface Window {
    electron: {
      downloadFile: (url: string) => void;
      onDownloadDone: (callback: (path: string) => void) => () => void; // return cleanup
      onDownloadFailed: (callback: (err: string) => void) => () => void; // return cleanup
    };
  }
}
