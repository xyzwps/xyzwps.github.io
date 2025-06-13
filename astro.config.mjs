import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import tailwindcss from "@tailwindcss/vite";

import d2 from "astro-d2";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: {
        type: "shiki",
      },
      shikiConfig: {
        theme: "one-dark-pro"
      }
    }),
    react(),
    d2({
      output: "gen/d2",
      theme: {
        default: "6",
        dark: false,
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
