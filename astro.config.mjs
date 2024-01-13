import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import remarkWikiLink from "remark-wiki-link";
import remarkBreaks from "remark-breaks";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

import rehypePrettyCode from "rehype-pretty-code";
import { rehypeCheckbox } from "./src/lib/rehype-checkbox.mjs";
import { remarkObsidianImg } from "./src/lib/remark-obsidian-image.mjs";
import { rehypeHashtags } from "./src/lib/rehype-hashtags.mjs";

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: {
    dark: "rose-pine",
    light: "rose-pine-dawn",
  },
  keepBackground: false,
};

// https://astro.build/config
export default defineConfig({
  site: "https://vault.rinyato.com",
  compressHTML: true,
  srcDir: "src",
  markdown: {
    gfm: true,
    syntaxHighlight: false,
    smartypants: true,
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      rehypeCheckbox,
      rehypeHashtags,
    ],
    remarkPlugins: [
      remarkObsidianImg,
      [
        remarkWikiLink,
        {
          hrefTemplate: (permalink) => "/" + permalink,
          aliasDivider: "|",
          pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
        },
      ],
      remarkBreaks,
      remarkReadingTime,
    ],
  },
  integrations: [mdx(), sitemap(), tailwind(), icon()],
});
