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
    gallery_photos?: unknown;
  };
  photos?: string[];
  class_list?: string[];
}

export interface GalleryPhoto {
  id: number;
  image: string;
  forSale: boolean;
  pictimeUrl?: string;
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
  photos: GalleryPhoto[];
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

function normaliseIdArray(value: unknown): number[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((v) => {
        if (typeof v === "number") return v;
        if (typeof v === "string" && v.trim() !== "") {
          const n = Number(v);
          if (!Number.isNaN(n)) return n;
        }
        return undefined;
      })
      .filter((v): v is number => typeof v === "number");
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return [value];
  }
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isNaN(n) ? [] : [n];
  }
  return [];
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

  const galleryPhotoIds = normaliseIdArray(acf.gallery_photos);

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
    // For collection lists we only need the count; the detail API
    // will populate the photos array from the photo post type.
    photos: [] as GalleryPhoto[],
    photoCount: galleryPhotoIds.length,
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

  const wpGallery = galleries[0];
  const mapped = mapWPGalleryToCollection(wpGallery);
  if (!mapped) return null;

  // Populate photos for this single gallery from the related photo posts
  const acf = wpGallery.acf ?? {};
  const galleryPhotoIds = normaliseIdArray(acf.gallery_photos);

  if (galleryPhotoIds.length === 0) {
    return mapped;
  }

  // Fetch the related photo posts by ID and map to image URLs.
  // We use the include= query to keep it to this gallery's photos.
  const includeParam = galleryPhotoIds.join(",");
  const photoPosts = await fetchFromWordPress<
    Array<{
      id: number;
      acf?: {
        image_url?: string;
        for_sale?: boolean | string | number;
        pictime_url?: string;
      };
    }>
  >(`/photo?include=${includeParam}&per_page=${galleryPhotoIds.length}`);

  // Build a map of id -> GalleryPhoto to preserve the order defined in ACF.
  const photoById = new Map<number, GalleryPhoto>();
  for (const photo of photoPosts) {
    const urlRaw =
      typeof photo.acf?.image_url === "string"
        ? photo.acf.image_url.trim()
        : "";
    if (!urlRaw) continue;

    const pictimeUrl =
      typeof photo.acf?.pictime_url === "string" &&
      photo.acf.pictime_url.trim()
        ? photo.acf.pictime_url.trim()
        : undefined;

    const forSale = !!pictimeUrl;

    photoById.set(photo.id, {
      id: photo.id,
      image: urlRaw,
      forSale,
      pictimeUrl,
    });
  }

  const photos: GalleryPhoto[] = [];
  for (const id of galleryPhotoIds) {
    const meta = photoById.get(id);
    if (meta) {
      photos.push(meta);
    }
  }

  return {
    ...mapped,
    photos,
    photoCount: photos.length,
  };
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
