import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base : "/Todo_list_App_/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
