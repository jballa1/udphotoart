import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog-posts";

const WP_API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.WORDPRESS_API_URL ??
  "";

const WP_USER = process.env.WORDPRESS_USER;
const WP_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

function requireConfig() {
  if (!WP_API_BASE || !WP_USER || !WP_APP_PASSWORD) {
    throw new Error(
      "Missing WordPress config. Set NEXT_PUBLIC_WORDPRESS_API_URL, WORDPRESS_USER and WORDPRESS_APP_PASSWORD in your env.",
    );
  }
}

function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function wpFetch(path: string, init: RequestInit = {}) {
  requireConfig();

  const url = `${WP_API_BASE!.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const auth =
    "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
      ...(init.headers ?? {}),
    },
  });

  return res;
}

async function ensureCategoryId(
  name: string,
  cache: Map<string, number>,
): Promise<number> {
  const cached = cache.get(name);
  if (cached) return cached;

  const slug = slugifyCategory(name);

  // Try to find existing category
  const existingRes = await wpFetch(
    `/categories?slug=${encodeURIComponent(slug)}&per_page=1`,
  );
  if (!existingRes.ok) {
    throw new Error(
      `Failed to query category "${name}": ${existingRes.status} ${existingRes.statusText}`,
    );
  }
  const existing = (await existingRes.json()) as Array<{ id: number }>;
  if (existing.length > 0) {
    cache.set(name, existing[0].id);
    return existing[0].id;
  }

  // Create new category
  const createRes = await wpFetch("/categories", {
    method: "POST",
    body: JSON.stringify({ name, slug }),
  });
  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(
      `Failed to create category "${name}": ${createRes.status} ${createRes.statusText} - ${text}`,
    );
  }
  const created = (await createRes.json()) as { id: number };
  cache.set(name, created.id);
  return created.id;
}

async function ensureFeaturedTagId(cache: Map<string, number>): Promise<number> {
  const KEY = "featured";
  const cached = cache.get(KEY);
  if (cached) return cached;

  // Try to find existing tag
  const existingRes = await wpFetch(
    `/tags?slug=${encodeURIComponent(KEY)}&per_page=1`,
  );
  if (!existingRes.ok) {
    throw new Error(
      `Failed to query featured tag: ${existingRes.status} ${existingRes.statusText}`,
    );
  }
  const existing = (await existingRes.json()) as Array<{ id: number }>;
  if (existing.length > 0) {
    cache.set(KEY, existing[0].id);
    return existing[0].id;
  }

  // Create tag
  const createRes = await wpFetch("/tags", {
    method: "POST",
    body: JSON.stringify({ name: "Featured", slug: KEY }),
  });
  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(
      `Failed to create featured tag: ${createRes.status} ${createRes.statusText} - ${text}`,
    );
  }
  const created = (await createRes.json()) as { id: number };
  cache.set(KEY, created.id);
  return created.id;
}

export async function GET() {
  try {
    requireConfig();
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }

  const categoryCache = new Map<string, number>();
  const tagCache = new Map<string, number>();

  const created: Array<{ slug: string; id: number }> = [];
  const skipped: string[] = [];
  const errors: Array<{ slug: string; error: string }> = [];

  for (const post of blogPosts) {
    const slug = post.id;
    try {
      // Check if post already exists in WordPress
      const existingRes = await wpFetch(
        `/posts?slug=${encodeURIComponent(slug)}&per_page=1`,
      );
      if (!existingRes.ok) {
        throw new Error(
          `Failed to query existing post: ${existingRes.status} ${existingRes.statusText}`,
        );
      }
      const existing = (await existingRes.json()) as Array<{ id: number }>;
      if (existing.length > 0) {
        skipped.push(slug);
        continue;
      }

      const categoryId = await ensureCategoryId(
        post.category,
        categoryCache,
      );

      let tagIds: number[] = [];
      if (post.featured) {
        const featuredTagId = await ensureFeaturedTagId(tagCache);
        tagIds = [featuredTagId];
      }

      const wpPostBody: Record<string, unknown> = {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug,
        status: "publish",
        categories: [categoryId],
        tags: tagIds,
      };

      if (post.date) {
        const parsed = new Date(post.date);
        if (!Number.isNaN(parsed.getTime())) {
          wpPostBody.date = parsed.toISOString();
        }
      }

      const createRes = await wpFetch("/posts", {
        method: "POST",
        body: JSON.stringify(wpPostBody),
      });

      if (!createRes.ok) {
        const text = await createRes.text();
        throw new Error(
          `Failed to create post: ${createRes.status} ${createRes.statusText} - ${text}`,
        );
      }

      const createdPost = (await createRes.json()) as { id: number };
      created.push({ slug, id: createdPost.id });
    } catch (error) {
      errors.push({ slug, error: (error as Error).message });
    }
  }

  return NextResponse.json({ created, skipped, errors });
}

