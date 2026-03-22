import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://esender.me",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
