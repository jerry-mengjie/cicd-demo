import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8090, // 启动端口号
    proxy: {
      "/api-user": {
        target: "http://localhost:8091",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api-news": {
        target: "http://localhost:8092",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
