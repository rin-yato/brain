import { defineCollection, z } from "astro:content";

const obsidian = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({}).optional(),
});

export const collections = { obsidian };
