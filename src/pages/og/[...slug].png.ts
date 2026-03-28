import { getCollection } from "astro:content";
import { formatDateShort, isVisiblePost } from "@utils/date";
import { renderOGImage } from "@utils/og-image";
import type { APIRoute } from "astro";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("posts", isVisiblePost);
  return posts.map((entry) => ({
    params: { slug: entry.id },
    props: {
      title: entry.data.title,
      category: entry.data.category,
      date: formatDateShort(entry.data.date),
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOGImage({
    title: props.title as string,
    category: props.category as string,
    date: props.date as string,
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
