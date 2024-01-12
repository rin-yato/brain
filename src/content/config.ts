import { defineCollection, z } from "astro:content";

const obsidian = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // status: z.string().default("#status/unprocessed"),
    // date: z.date({ coerce: true }).optional(),
    // area: z.string().optional(),
    // type: z.string().optional(),
    // keyword: z.string().optional(),
  }),
});

export const collections = { obsidian };
