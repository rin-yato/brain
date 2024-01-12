import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from "remark-wiki-link";
import remarkBreaks from "remark-breaks";
import { visit } from "unist-util-visit";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://brain-nine.vercel.app",
  redirects: {
    "/": "/guide",
  },
  markdown: {
    gfm: true,
    syntaxHighlight: "shiki",
    smartypants: true,
    rehypePlugins: [
      () => (tree) =>
        visit(tree, (node) => {
          if (
            node.type === "element" &&
            node.properties &&
            node.properties.disabled
          ) {
            node.properties.disabled = false;
            node.properties.class = "pointer-events-none";
          }
        }),
    ],
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          hrefTemplate: (permalink) => "/" + permalink,
          aliasDivider: "|",
          pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
        },
      ],
      remarkBreaks,
    ],
  },
  integrations: [mdx(), sitemap(), tailwind(), icon()],
});
