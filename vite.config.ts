import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      styles: "/src/styles",
      components: "/src/components",
      pages: "/src/pages",
      assets: "/src/assets",
      services: "/src/services",
      utils: "/src/utils",
      hooks: "/src/hooks",
      interface: "/src/interface",
      store: "/src/store",
    },
  },
});
