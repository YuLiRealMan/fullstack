import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from "path"; // Required for resolving paths
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Maps @ to the src directory
    },
  },
});
