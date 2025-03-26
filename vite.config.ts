
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { resolve } from 'path';
import { writeFileSync, copyFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-extension-files',
      closeBundle() {
        try {
          // Copy manifest.json to dist
          copyFileSync('public/manifest.json', 'dist/manifest.json');
          
          // Copy content.js to dist
          copyFileSync('public/content.js', 'dist/content.js');
          
          // Copy background.js to dist
          copyFileSync('public/background.js', 'dist/background.js');
          
          // Copy icon files to dist
          copyFileSync('public/icon16.png', 'dist/icon16.png');
          copyFileSync('public/icon48.png', 'dist/icon48.png');
          copyFileSync('public/icon128.png', 'dist/icon128.png');
          
          console.log('Extension files copied to dist folder');
        } catch (error) {
          console.error('Error copying extension files:', error);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  }
}));
