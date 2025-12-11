import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/images": "http://localhost:3000"
    }
  },
//   build: {
//     outDir: "dist",
//     rollupOptions: {
//       input: {
//         main: resolve(process.cwd(), "index.html"),
//         login: resolve(process.cwd(), "login.html") 
//       }
//     }
//   }
});
