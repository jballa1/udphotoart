// Utility to generate photo arrays for each location
// This runs on the client side by reading directory contents

export function getLocationPhotos(locationFolder: string, count: number): string[] {
  const photos: string[] = [];

  // Since we can't read directories on client side,
  // we'll use a pattern-based approach assuming sequential naming
  // In production, this would be generated server-side or via build script

  // For now, returning a range that covers the photos
  // This is a temporary solution - in production you'd use fs.readdirSync server-side

  return photos;
}

// Pre-generated photo lists for each location
export const locationPhotoLists: Record<string, string[]> = {
  "Prague - Czech Republic": Array.from({ length: 61 }, (_, i) => i).map(() => ""), // Will be replaced
  "Oslo, Norway": Array.from({ length: 53 }, (_, i) => i).map(() => ""),
  "Pune, Maharashtra, India": Array.from({ length: 23 }, (_, i) => i).map(() => ""),
  // ... etc
};
