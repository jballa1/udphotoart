import "server-only";
import { fetchFromWordPress, decodeHtmlEntities } from "./wordpress";

export interface WPGallery {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  acf?: {
    feature_image?: string;
    region?: string;
    state?: string;
    country?: string;
    description?: string;
    theme?: string;
    icon?: string;
    order?: number | string;
    signature_collection?: boolean | string | number;
    dashboard_position?: number | string;
  };
  photos?: string[];
  class_list?: string[];
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  acf?: {
    feature_image?: string;
    subtitle?: string;
    kicker?: string;
    secondary_label?: string;
    dashboard_description?: string;
    featured?: boolean | string | number;
    category?: string;
    position?: number | string;
    icon?: string;
    location_based?: boolean | string | number;
  };
  _links?: {
    "wp:post_type"?: Array<{
      href: string;
    }>;
  };
}

export interface GalleryCollection {
  id: string;
  name: string;
  group: string;
  region?: string;
  state?: string;
  country?: string;
  description?: string;
  hero: string;
  photos: string[];
  photoCount: number;
  theme?: string;
  icon?: string;
  order?: number;
   // Home "Signature Collections" section
  signatureCollection?: boolean;
  dashboardPosition?: number;
}

export interface GalleryGroupMeta {
  slug: string;
  name: string;
  description: string;
  featureImage: string;
  subtitle?: string;
  kicker?: string;
  secondaryLabel?: string;
  galleryCount: number;
  dashboardDescription?: string;
  featured: boolean;
  categoryType: string;
  position?: number;
  icon?: string;
  locationBased?: boolean;
}

function parseBoolFlag(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "1" || v === "true" || v === "yes" || v === "on";
  }
  return false;
}

function getGroupFromClassList(
  classList: string[] | undefined,
): string | null {
  if (!classList) return null;
  for (const cls of classList) {
    if (cls.startsWith("category-")) {
      const slug = cls.replace(/^category-/, "");
      if (slug) return slug;
    }
  }
  return null;
}

function normaliseTitle(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, "").trim());
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (!Number.isNaN(n)) return n;
  }
  return undefined;
}

function mapWPGalleryToCollection(
  wpGallery: WPGallery,
): GalleryCollection | null {
  const group = getGroupFromClassList(wpGallery.class_list);
  if (!group) return null;

  const acf = wpGallery.acf ?? {};
  const hero =
    (acf.feature_image && typeof acf.feature_image === "string"
      ? acf.feature_image
      : "") || "";

  const photos = Array.isArray(wpGallery.photos)
    ? wpGallery.photos.filter((p): p is string => typeof p === "string")
    : [];

  const order = toNumber(acf.order);
  const signatureCollection = parseBoolFlag(acf.signature_collection);
  const dashboardPosition = toNumber(acf.dashboard_position);

  return {
    id: wpGallery.slug,
    name: normaliseTitle(wpGallery.title.rendered),
    group,
    region:
      typeof acf.region === "string" && acf.region.trim()
        ? acf.region
        : undefined,
    state:
      typeof acf.state === "string" && acf.state.trim()
        ? acf.state
        : undefined,
    country:
      typeof acf.country === "string" && acf.country.trim()
        ? acf.country
        : undefined,
    description:
      typeof acf.description === "string" && acf.description.trim()
        ? acf.description
        : undefined,
    hero,
    photos,
    photoCount: photos.length,
    theme:
      typeof acf.theme === "string" && acf.theme.trim()
        ? acf.theme
        : undefined,
    icon:
      typeof acf.icon === "string" && acf.icon.trim() ? acf.icon : undefined,
    order,
    signatureCollection,
    dashboardPosition,
  };
}

export async function fetchAllGalleryCollections(): Promise<
  GalleryCollection[]
> {
  const galleries = await fetchFromWordPress<WPGallery[]>(
    "/gallery?per_page=100",
  );

  return galleries
    .map(mapWPGalleryToCollection)
    .filter((g): g is GalleryCollection => g !== null);
}

export async function fetchGalleryCollectionsByGroup(
  group: string,
): Promise<GalleryCollection[]> {
  const all = await fetchAllGalleryCollections();
  const filtered = all.filter((g) => g.group === group);

  // Sort by order if present, then by name
  filtered.sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

  return filtered;
}

export async function fetchGalleryCollectionBySlug(
  slug: string,
): Promise<GalleryCollection | null> {
  const galleries = await fetchFromWordPress<WPGallery[]>(
    `/gallery?slug=${encodeURIComponent(slug)}&per_page=1`,
  );

  if (!galleries.length) return null;

  const mapped = mapWPGalleryToCollection(galleries[0]);
  return mapped ?? null;
}

export async function fetchGalleryGroupsMeta(): Promise<GalleryGroupMeta[]> {
  const categories = await fetchFromWordPress<WPCategory[]>(
    "/categories?per_page=100",
  );

  // Only categories explicitly marked for dashboard use
  const dashboardCategories = categories.filter(
    (cat) =>
      typeof cat.acf?.category === "string" &&
      cat.acf.category.trim().length > 0,
  );

  return dashboardCategories.map((cat) => {
    const acf = cat.acf ?? {};
    const featureImage =
      (acf.feature_image && typeof acf.feature_image === "string"
        ? acf.feature_image
        : "") || "";

    const rawCategoryType =
      typeof acf.category === "string" && acf.category.trim()
        ? acf.category.trim()
        : "";
    const categoryType = rawCategoryType
      ? decodeHtmlEntities(rawCategoryType)
      : "";

    const dashboardDescription =
      typeof acf.dashboard_description === "string" &&
      acf.dashboard_description.trim()
        ? decodeHtmlEntities(acf.dashboard_description.trim())
        : undefined;

    const featured = parseBoolFlag(acf.featured);
    const position = toNumber(acf.position);
    const icon =
      typeof acf.icon === "string" && acf.icon.trim()
        ? acf.icon.trim()
        : undefined;

    const descriptionText =
      typeof cat.description === "string"
        ? cat.description.replace(/<[^>]+>/g, "").trim()
        : "";

    return {
      slug: cat.slug,
      name: decodeHtmlEntities(cat.name),
      description: decodeHtmlEntities(descriptionText),
      featureImage,
      subtitle:
        typeof acf.subtitle === "string" && acf.subtitle.trim()
          ? decodeHtmlEntities(acf.subtitle.trim())
          : undefined,
      kicker:
        typeof acf.kicker === "string" && acf.kicker.trim()
          ? decodeHtmlEntities(acf.kicker.trim())
          : undefined,
      secondaryLabel:
        typeof acf.secondary_label === "string" &&
        acf.secondary_label.trim()
          ? decodeHtmlEntities(acf.secondary_label.trim())
          : undefined,
      galleryCount: cat.count ?? 0,
      dashboardDescription,
      featured,
      categoryType,
      position,
      icon,
      locationBased: parseBoolFlag(acf.location_based),
    };
  });
}
