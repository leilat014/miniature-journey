import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      // Proxy API requests to your Express server
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      // Proxy auth requests to your Express server
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});