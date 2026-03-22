import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const companies = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml}",
    base: "./src/content/work-experience",
  }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["photography", "development"]),
    published: z.boolean().optional().default(false),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  "work-experience": companies,
  posts,
};
