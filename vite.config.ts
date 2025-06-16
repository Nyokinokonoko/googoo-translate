import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and React DOM
          react: ['react', 'react-dom'],
          // Separate MUI components (largest dependency)
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          // Separate OpenAI SDK
          openai: ['openai'],
        },
      },
    },
  },
});
