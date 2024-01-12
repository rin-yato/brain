import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from "remark-wiki-link";
import rehypePrettyCode from "rehype-pretty-code";
import remarkBreaks from "remark-breaks";
import { visit } from "unist-util-visit";

import icon from "astro-icon";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import { rehypeCheckbox } from "./src/lib/rehype-checkbox.mjs";

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
  site: "https://brain-nine.vercel.app",
  redirects: {
    "/": "/guide",
  },
  markdown: {
    gfm: true,
    syntaxHighlight: false,
    smartypants: true,
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      rehypeCheckbox,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figcaption") {
            if (!("data-rehype-pretty-code-title" in node.properties)) {
              return;
            }
            node.properties.class = ["flex", "items-center"];
            node.properties.style = "gap: 0.5rem; align-items: center;";
            node.children = [
              {
                type: "element",
                tagName: "div",
                children: [
                  {
                    type: "text",
                    value: node.children[0].value,
                  },
                ],
              },
            ];
          }
        });
      },
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
      remarkReadingTime,
    ],
  },
  integrations: [mdx(), sitemap(), tailwind(), icon()],
});
