import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use a relative path for local serving
  base: "/Todo_list_App/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});