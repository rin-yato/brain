import { capitalize } from "@/lib/utils";
import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const collectionEntries = await getCollection("obsidian");

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', description: '' } }]
// to { 'post.md': { title: 'Example', description: '' } }

async function getPages() {
  const pages = [];
  for (const entry of collectionEntries) {
    const data = await entry.render();
    pages.push([
      entry.slug,
      {
        title: capitalize(
          data.headings?.[0]?.text ??
            entry.slug.split("/").pop()?.replace(/-/g, " ") ??
            "",
        ),
        ...data.remarkPluginFrontmatter,
      },
    ]);
  }

  return Object.fromEntries(pages);
}

const pages = await getPages();

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  // A collection of pages to generate images for.
  // The keys of this object are used to generate the path for that image.
  // In this example, we generate one image at `/open-graph/example.png`.
  pages: pages,

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (path, page) => {
    const formattedDescription = page.description.slice(0, 60).concat("...");
    const description =
      page.description.length === 0 ? "" : formattedDescription;

    return {
      title: page.title,
      description: description,

      bgImage: {
        path: "./public/og-bg.png",
        fit: "cover",
        position: "center",
      },

      padding: 124,

      font: {
        title: {
          size: page.description.length === 0 ? 98 : 72,
          lineHeight: 1.3,
          families: ["iA Writer Duo"],
          weight: "Bold",
        },
        description: {
          size: 48,
          lineHeight: 1.3,
          families: ["iA Writer Duo"],
          weight: "Normal",
        },
      },
      fonts: ["./public/fonts/sans.ttf"],
    };
  },
});
