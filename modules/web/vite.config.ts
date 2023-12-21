import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// set hmr
// https://vitejs.dev/guide/api-plugin.html#hmr




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // jsxRuntime: 'classic',
    include: ['**/*.tsx', '**/*.scss'] // it's unnecessary and cause the page full-reload
  })],
  server: {
    hmr: {
      port: 25173,
    },
  },
});
