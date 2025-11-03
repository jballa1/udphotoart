const fs = require('fs');
const path = require('path');

const revelationsDir = path.join(__dirname, '../public/images/revelations');
const outputFile = path.join(__dirname, '../lib/revelations-photos.json');

const regionMap = {
  'Prague - Czech Republic': { region: 'Europe', country: 'Czech Republic', name: 'Prague', description: 'Romantic fairytale city with golden hour magic' },
  'Oslo, Norway': { region: 'Europe', country: 'Norway', name: 'Oslo', description: 'Nordic minimalism and seasonal contrasts' },
  'Boleslawiec, Poland': { region: 'Europe', country: 'Poland', name: 'Boleslawiec', description: 'Artistic whimsy meets traditional European charm' },
  'Bucharest, Romania': { region: 'Europe', country: 'Romania', name: 'Bucharest', description: 'Historic grandeur meets modern Europe' },
  'Constanța, Romania': { region: 'Europe', country: 'Romania', name: 'Constanța', description: 'Historic Black Sea port city charm' },
  'Pune, Maharashtra, India': { region: 'Asia', country: 'India', name: 'Pune', description: 'Cultural authenticity and vibrant street life' },
  'Dallas, Texas': { region: 'Americas', country: 'United States', name: 'Dallas', description: 'Modern American architecture' },
  'Palms Springs, California': { region: 'Americas', country: 'United States', name: 'Palm Springs', description: 'Desert modernism and natural beauty' },
  'Valle de Guadalupe, Mexico': { region: 'Americas', country: 'Mexico', name: 'Valle de Guadalupe', description: 'Baja wine country natural beauty' },
};

try {
  const locations = fs.readdirSync(revelationsDir)
    .filter(item => {
      const itemPath = path.join(revelationsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

  const locationsData = locations.map(location => {
    const locationPath = path.join(revelationsDir, location);
    const photos = fs.readdirSync(locationPath)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(photo => `/images/revelations/${location}/${photo}`);

    const meta = regionMap[location] || {
      region: 'Unknown',
      country: 'Unknown',
      name: location,
      description: location
    };

    return {
      id: meta.name.toLowerCase().replace(/\s+/g, '-'),
      name: meta.name,
      region: meta.region,
      country: meta.country,
      description: meta.description,
      photoCount: photos.length,
      hero: photos[0] || '',
      photos: photos
    };
  });

  // Sort by photo count descending
  locationsData.sort((a, b) => b.photoCount - a.photoCount);

  fs.writeFileSync(outputFile, JSON.stringify(locationsData, null, 2));
  console.log(`✓ Generated revelations data: ${locationsData.length} locations, ${locationsData.reduce((sum, loc) => sum + loc.photoCount, 0)} total photos`);
  console.log(`✓ Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating revelations data:', error);
  process.exit(1);
}
