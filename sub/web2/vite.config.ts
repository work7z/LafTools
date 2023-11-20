import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// set hmr
// https://vitejs.dev/guide/api-plugin.html#hmr

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      port: 5173,
    },
  },
});
