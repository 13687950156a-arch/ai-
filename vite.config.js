import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "Chrome >= 49"],
      modernPolyfills: true,
    }),
  ],
  base:
    command === "build"
      ? "https://yousen-ai-portfolio.oss-cn-hangzhou.aliyuncs.com/site/"
      : "/ai-/",
}));
