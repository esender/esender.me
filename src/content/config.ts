// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
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
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  "work-experience": companies,
};
