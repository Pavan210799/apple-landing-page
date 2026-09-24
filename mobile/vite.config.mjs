import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function imageRequires() {
  return {
    name: "image-requires",
    transform(code, id) {
      if (!id.endsWith("/src/media.js")) return null;
      const next = code.replace(
        /require\((['"])([^'"]+)\1\)/g,
        (_, quote, file) => `({ uri: new URL(${quote}${file}${quote}, import.meta.url).href })`,
      );
      return { code: next, map: null };
    },
  };
}

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/mobile/" : "/",
  build: {
    outDir: "../dist/mobile",
    emptyOutDir: true,
  },
  plugins: [react({ include: /\.[jt]sx?$/ }), imageRequires()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
  server: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
    fs: {
      allow: [".."],
    },
  },
}));
