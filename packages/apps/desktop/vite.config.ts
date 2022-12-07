import react from "@vitejs/plugin-react";
import { rmSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import electron from "vite-electron-plugin";
import renderer from "vite-plugin-electron-renderer";

import pkg from "./package.json";

rmSync(path.join(__dirname, "dist-electron"), { recursive: true, force: true });

export default defineConfig({
  resolve: {
    alias: {
      "@encontrei/@types": path.join(__dirname, "src", "@types"),
      "@encontrei/components": path.join(__dirname, "src", "components"),
      "@encontrei/contexts": path.join(__dirname, "src", "contexts"),
      "@encontrei/hooks": path.join(__dirname, "src", "hooks"),
      "@encontrei/lib": path.join(__dirname, "src", "lib"),
      "@encontrei/routes": path.join(__dirname, "src", "routes"),
      "@encontrei/screens": path.join(__dirname, "src", "screens"),
      "@encontrei/styles": path.join(__dirname, "src", "styles"),
      "@encontrei/utils": path.join(__dirname, "src", "utils"),
      "@encontrei/assets": path.join(__dirname, "src", "assets"),
    },
  },
  plugins: [
    react(),
    electron({
      include: [
        "electron/main/index.ts",
        "electron/bridge/index.ts",
        "electron/preload/index.ts",
      ],
      transformOptions: {
        sourcemap: Boolean(process.env.VSCODE_DEBUG),
        minify: process.argv.slice(2).includes("build"),
      },
    }),
    renderer({
      nodeIntegration: true,
    }),
  ],
  server: process.env.VSCODE_DEBUG
    ? (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: Number(url.port),
        };
      })()
    : undefined,
});
