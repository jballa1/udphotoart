import "server-only";
import { fetchFromWordPress, decodeHtmlEntities } from "./wordpress";

export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  description: string;
  collection: string;
}

interface WPProduct {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  acf?: {
    feature_image?: string;
    price?: string | number;
    collection?: string;
    category?: string;
  };
  _embedded?: {
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

function stripHtml(html: string): string {
  const withoutTags = html.replace(/<[^>]+>/g, "").trim();
  return decodeHtmlEntities(withoutTags);
}

function mapWPProductToProduct(product: WPProduct): Product {
  const acf = product.acf ?? {};

  const terms = product._embedded?.["wp:term"] ?? [];
  const flatTerms = terms.flat();

  const categoryTerm = flatTerms.find((t) => t.taxonomy === "category");
  const tagTerm = flatTerms.find((t) => t.taxonomy === "post_tag");

  const category =
    (typeof acf.category === "string" && acf.category.trim()) ||
    categoryTerm?.name ||
    "Prints";

  const collection =
    (typeof acf.collection === "string" && acf.collection.trim()) ||
    tagTerm?.name ||
    "";

  const image =
    (acf.feature_image && typeof acf.feature_image === "string"
      ? acf.feature_image
      : "") || "";

  const priceRaw = acf.price;
  const priceNumber =
    typeof priceRaw === "number"
      ? priceRaw
      : typeof priceRaw === "string"
        ? Number(priceRaw.replace(/[^0-9.]+/g, ""))
        : 0;

  const descriptionHtml =
    product.excerpt?.rendered || product.content?.rendered || "";

  return {
    id: product.slug,
    title: stripHtml(product.title.rendered),
    category,
    image,
    price: Number.isFinite(priceNumber) ? priceNumber : 0,
    description: stripHtml(descriptionHtml),
    collection,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const products = await fetchFromWordPress<WPProduct[]>(
    "/product?_embed&per_page=100",
  );
  return products.map(mapWPProductToProduct);
}
