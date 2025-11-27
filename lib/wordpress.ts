import "server-only";
import type { BlogPost } from "./blog-posts";

const DEFAULT_PER_PAGE = 100;

const API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.WORDPRESS_API_URL ??
  "";

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  acf?: {
    feature_image?: string;
    readtime?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, "-");
}

function htmlToMarkdownish(html: string): string {
  // Add line breaks at common block boundaries before stripping tags
  let text = html
    .replace(/<\/(p|div)>/gi, "</$1>\n\n")
    .replace(/<\/(h1|h2|h3|h4|h5|h6)>/gi, "</$1>\n\n")
    .replace(/<br\s*\/?>/gi, "\n");

  // Remove all tags
  text = text.replace(/<[^>]+>/g, "");

  // Decode HTML entities and normalise whitespace
  text = decodeHtmlEntities(text);
  text = text.replace(/\r/g, "");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, "").trim());
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function mapWPPostToBlogPost(post: WPPost): BlogPost {
  const featuredImage =
    (post.acf?.feature_image && typeof post.acf.feature_image === "string"
      ? post.acf.feature_image
      : undefined) ??
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    "";

  const terms = post._embedded?.["wp:term"] ?? [];
  const flatTerms = terms.flat();

  const categories = flatTerms.filter((t) => t.taxonomy === "category");
  const tags = flatTerms.filter((t) => t.taxonomy === "post_tag");

  const featured = tags.some(
    (tag) => tag.slug.toLowerCase() === "featured",
  );

  const primaryCategory = decodeHtmlEntities(
    categories[0]?.name ?? "Photography",
  );

  const plainContent = stripHtml(post.content.rendered);
  const contentMarkdown = htmlToMarkdownish(post.content.rendered);
  const excerptMarkdown =
    htmlToMarkdownish(post.excerpt.rendered) ||
    contentMarkdown.slice(0, 220);

  const readTimeFromAcf = post.acf?.readtime?.trim();

  return {
    id: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: excerptMarkdown,
    content: contentMarkdown,
    image: featuredImage,
    category: primaryCategory,
    author: "Rigo Gonzalez-Nossa",
    date: post.date,
    readTime:
      readTimeFromAcf && readTimeFromAcf.length > 0
        ? readTimeFromAcf
        : estimateReadTime(plainContent || contentMarkdown),
    featured,
  };
}

export async function fetchFromWordPress<T>(path: string): Promise<T> {
  if (!API_BASE) {
    throw new Error("WordPress API URL is not configured");
  }

  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const res = await fetch(url, {
    // Cache for 60 seconds by default
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error ${res.status}: ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchFromWordPress<WPPost[]>(
    `/posts?_embed&per_page=${DEFAULT_PER_PAGE}`,
  );
  return posts.map(mapWPPostToBlogPost);
}

export async function fetchBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const posts = await fetchFromWordPress<WPPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed`,
  );

  if (!posts.length) {
    return null;
  }

  return mapWPPostToBlogPost(posts[0]);
}
