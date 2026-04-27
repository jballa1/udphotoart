// /lib/blog-posts.ts

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL!;
const AZURE_BASE_URL = process.env.AZURE_BASE_URL!;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string | null;
};

async function fetchGraphQL(query: string, variables: any = {}) {
  const res = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store", // 🔥 IMPORTANT: prevents stale Vercel cache
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error("Failed to fetch GraphQL data");
  }

  return json.data;
}

// ✅ GET ALL POSTS (BLOG LIST PAGE)
export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchGraphQL(`
    query GetPosts {
      posts {
        nodes {
          id
          title
          slug
          content
          blogImageSettings {
            imageName
          }
        }
      }
    }
  `);

  return data.posts.nodes.map((post: any) => {
    const imageName = post.blogImageSettings?.imageName || null;

    const image =
      imageName && AZURE_BASE_URL
        ? `${AZURE_BASE_URL}/${imageName}`
        : null;

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      image,
    };
  });
}

// ✅ GET SINGLE POST (BLOG DETAIL PAGE)
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const data = await fetchGraphQL(
    `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        blogImageSettings {
          imageName
        }
      }
    }
  `,
    { slug }
  );

  const post = data.post;

  if (!post) return null;

  const imageName = post.blogImageSettings?.imageName || null;

  const image =
    imageName && AZURE_BASE_URL
      ? `${AZURE_BASE_URL}/${imageName}`
      : null;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    image,
  };
}