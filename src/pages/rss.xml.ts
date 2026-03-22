import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { sortByDateDesc } from "@utils/date";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => data.published);

  posts.sort(sortByDateDesc);

  return rss({
    title: "Marat Abdulin",
    description:
      "Software engineer in Berlin. Writing about development and photography.",
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
  });
}
