import { z, defineCollection } from "astro:content";

const companies = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    start_date: z.date(),
    end_date: z.date().optional(),
    position: z.string(),
    stack: z.array(z.string()),
    description: z.array(z.string()).optional(),
    points: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.union([z.literal("photography"), z.literal("development")]),
    published: z.boolean().optional().default(false),
  }),
});

export const collections = {
  "work-experience": companies,
  posts,
};
