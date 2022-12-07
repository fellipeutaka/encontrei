import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  screen,
  clipboard,
  dialog,
} from "electron";
import { release } from "os";
import { join } from "path";

process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

if (release().startsWith("6.1")) {
  app.disableHardwareAcceleration();
}

if (process.platform === "win32") {
  app.setAppUserModelId(app.getName());
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    title: "Encontrei",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    width,
    height,
    minWidth: 1280,
    minHeight: 720,
    backgroundColor: "#181A20",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload,
      devTools: !app.isPackaged,
    },
  });

  win.maximize();
  win.focus();

  if (app.isPackaged) {
    void win.loadFile(indexHtml);
  } else {
    void win.loadURL(url);
  }
}

async function registerListeners() {
  ipcMain.on("log", (_, message) => {
    console.warn(message);
  });
  ipcMain.handle("messageBox", async (_, options) => {
    if (win) {
      const { response } = await dialog.showMessageBox(win, options);
      return response;
    }
  });
  ipcMain.on("error", (_, message) => {
    dialog.showErrorBox("Erro", message);
  });
  ipcMain.on("openExternal", (_, link) => {
    void shell.openExternal(link);
  });
  ipcMain.on("copyText", (_, text) => {
    clipboard.writeText(text);
  });
}

void app.whenReady().then(createWindow).then(registerListeners);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    void createWindow();
  }
});

ipcMain.handle("open-win", (event, arg: string) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload,
    },
  });

  if (app.isPackaged) {
    void childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    void childWindow.loadURL(`${url}#${arg}`);
  }
});
