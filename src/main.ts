import { createContext } from "@src/shared/context";
import { appRouter } from "@src/shared/routers/_app";
import { BrowserWindow, app, screen } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { join } from "node:path";

app.setName("F1-Desktop");

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    width: width - 900,
    height: height - 400,
    // resizable: false,
    x: width - 470,
    y: height - 760,
    webPreferences: {
      sandbox: false,
      preload: join(__dirname, "../preload/preload.js"),
    },
  });

  createIPCHandler({
    router: appRouter,
    windows: [mainWindow],
    createContext,
  });

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.show;
  });

  if (import.meta.env.DEV) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());
