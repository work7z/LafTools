import { defineConfig } from "vite";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import react from "@vitejs/plugin-react";

// set hmr
// https://vitejs.dev/guide/api-plugin.html#hmr

import builtins from "rollup-plugin-node-builtins";

const builtinsPlugin = builtins({ crypto: true });
builtinsPlugin.name = "builtins";

// import wasm from "vite-plugin-wasm";
// import topLevelAwait from "vite-plugin-top-level-await";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dynamicImportVars({
      // options
      include: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"],
    }),
    commonjs(),
    builtinsPlugin,
    // wasm(),
    // topLevelAwait(),
    react({
      // jsxRuntime: 'classic',
      include: ["**/*.tsx", "**/*.scss"], // it's unnecessary and cause the page full-reload
    }),
  ],
  build: {
    commonjsOptions: {
      exclude: ["zlibjs/*"],
    },
  },
  server: {
    hmr: {
      port: 25173,
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".mjs"],
    alias: {
      // "buffer": require.resolve("buffer/"),
      // "stream": require.resolve("stream-browserify"),
      // "zlib": require.resolve("browserify-zlib"),
      // path: 'path-browserify',
      crypto: "crypto-browserify",
      path: "path/",
    },
  },
  optimizeDeps: {
    exclude: ["crypto-api"],
  },
});
