import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import { GetStaticProps } from "next";
import { WordPressTemplateProps } from "../types";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "") + "/wp-json/wp/v2";

async function fetchAllItems(endpoint: string) {
  let page = 1;
  let allItems: any;
  let hasMore = true;
  while (hasMore) {
    try {
      const response = await fetch(`${endpoint}&page=${page}&per_page=100`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const items = await response.json();
      if (items.length === 0) {
        hasMore = false;
      } else {
        allItems = [...allItems, ...items];
        page++;
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      hasMore = false;
    }
  }
  return allItems;
}

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export async function getStaticPaths() {
  try {
    const posts = await fetchAllItems(`${WP_API_URL}/posts?_fields=slug`);
    const categories = await fetchAllItems(`${WP_API_URL}/categories?_fields=slug`);

    const staticPages = ['home-2', 'home-3-podcast', 'home-4-video', 'home-5-gallery', 'home-6'];
    const paths = [
      ...categories.map((category: any) => ({ params: { wordpressNode: [category.slug] } })),
      ...posts.map((post: any) => ({ params: { wordpressNode: [post.slug] } })),
      ...staticPages.map(page => ({ params: { wordpressNode: [page] } })),
      { params: { wordpressNode: ['search', 'posts'] } },
    ];

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const props = await getWordPressProps({ ctx, revalidate: 900 });
    return props;
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
};