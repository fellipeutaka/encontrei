import { ipcRenderer } from "electron";
import type { MessageBoxOptions } from "electron/main";

type ShowMessageBoxProps = {
  options: MessageBoxOptions;
};

export const api = {
  showLog: (message: string) => {
    ipcRenderer.send("log", message);
  },
  showMessageBox: async ({ options }: ShowMessageBoxProps) => {
    const result: number = await ipcRenderer.invoke("messageBox", options);
    return result;
  },
  showError: (message: string) => {
    ipcRenderer.send("error", message);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  openExternal: (link: string) => {
    ipcRenderer.send("openExternal", link);
  },
  copyText: (text: string) => {
    ipcRenderer.send("copyText", text);
  },
};
