const fs = require('fs');
const path = require('path');

const worldLensDir = path.join(__dirname, '../public/images/world-lens');
const outputFile = path.join(__dirname, '../lib/world-lens-photos.json');

const regionMap = {
  'Balloon Fiesta, New Mexico': { region: 'Southwest', state: 'New Mexico', description: 'Vibrant hot air balloons against perfect blue skies' },
  'Bandera, Texas': { region: 'Southwest', state: 'Texas', description: 'Cowboy capital of the world' },
  'Big Bear Lake, California': { region: 'West Coast', state: 'California', description: 'Mountain lake serenity' },
  'Big Bend National Park, Texas': { region: 'Southwest', state: 'Texas', description: 'Dramatic desert landscapes and wild horses' },
  'Bosque del Apache, New Mexico': { region: 'Southwest', state: 'New Mexico', description: 'Wildlife and bird photography excellence' },
  'Cusco, Peru': { region: 'Peru', state: 'Peru', description: 'Ancient Incan capital heritage' },
  'El Paso, Texas': { region: 'Southwest', state: 'Texas', description: 'Border city landscapes' },
  'Hatcher Pass, Alaska': { region: 'Alaska', state: 'Alaska', description: 'Alpine wilderness beauty' },
  'Holland, Michigan': { region: 'Midwest', state: 'Michigan', description: 'Dutch heritage and lakefront' },
  'Iditarod, Alaska': { region: 'Alaska', state: 'Alaska', description: 'Legendary dog sled race action' },
  'Machu Pichu': { region: 'Peru', state: 'Peru', description: 'Lost city of the Incas' },
  'Marfa, Texas': { region: 'Southwest', state: 'Texas', description: 'Artistic minimalism in the desert' },
  'Monahans Desert, Texas': { region: 'Southwest', state: 'Texas', description: 'Sand dunes and desert beauty' },
  'Sacred Valley, Peru': { region: 'Peru', state: 'Peru', description: 'Heart of the Incan empire' },
  'Sierra Vista Trail, New Mexico': { region: 'Southwest', state: 'New Mexico', description: 'High desert hiking trails' },
  'Talkeetna, Alaska': { region: 'Alaska', state: 'Alaska', description: 'Gateway to Denali' },
  'Terlingua, Texas': { region: 'Southwest', state: 'Texas', description: 'Ghost town character' },
  'Wasilla, Alaska': { region: 'Alaska', state: 'Alaska', description: 'Frontier lifestyle' },
  'West Texas': { region: 'Southwest', state: 'Texas', description: 'Wide open spaces' },
  'White Sands National Park, New Mexico': { region: 'Southwest', state: 'New Mexico', description: 'Stunning white gypsum dunes' },
};

try {
  const locations = fs.readdirSync(worldLensDir)
    .filter(item => {
      const itemPath = path.join(worldLensDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

  const locationsData = locations.map(location => {
    const locationPath = path.join(worldLensDir, location);
    const photos = fs.readdirSync(locationPath)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(photo => `/images/world-lens/${location}/${photo}`);

    const meta = regionMap[location] || {
      region: 'Other',
      state: location,
      description: location
    };

    return {
      id: location.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: location,
      region: meta.region,
      state: meta.state,
      description: meta.description,
      photoCount: photos.length,
      hero: photos[0] || '',
      photos: photos
    };
  });

  // Sort by photo count descending
  locationsData.sort((a, b) => b.photoCount - a.photoCount);

  fs.writeFileSync(outputFile, JSON.stringify(locationsData, null, 2));
  console.log(`✓ Generated World Through My Lens data: ${locationsData.length} locations, ${locationsData.reduce((sum, loc) => sum + loc.photoCount, 0)} total photos`);
  console.log(`✓ Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating world lens data:', error);
  process.exit(1);
}
