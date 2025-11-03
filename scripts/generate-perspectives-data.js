const fs = require('fs');
const path = require('path');

const perspectivesDir = path.join(__dirname, '../public/images/perspectives');
const outputFile = path.join(__dirname, '../lib/perspectives-photos.json');

const categoryMap = {
  'Black&White': { order: 1, description: 'Timeless artistry and dramatic contrast', theme: 'monochrome' },
  'Expressions': { order: 2, description: 'Wildlife portraits and behavioral moments', theme: 'wildlife' },
  'Nature': { order: 3, description: 'Natural world documentation and beauty', theme: 'nature' },
  'Oil Country': { order: 4, description: 'Industrial landscapes and Texas oil fields', theme: 'industrial' },
  'LandScape': { order: 5, description: 'Sweeping vistas and natural grandeur', theme: 'landscape' },
};

try {
  const categories = fs.readdirSync(perspectivesDir)
    .filter(item => {
      const itemPath = path.join(perspectivesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

  const categoriesData = categories.map(category => {
    const categoryPath = path.join(perspectivesDir, category);
    const photos = fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(photo => `/images/perspectives/${category}/${photo}`);

    const meta = categoryMap[category] || {
      order: 99,
      description: category,
      theme: 'other'
    };

    return {
      id: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: category === 'Black&White' ? 'Black & White' : category,
      description: meta.description,
      theme: meta.theme,
      order: meta.order,
      photoCount: photos.length,
      hero: photos[0] || '',
      photos: photos
    };
  });

  // Sort by order
  categoriesData.sort((a, b) => a.order - b.order);

  fs.writeFileSync(outputFile, JSON.stringify(categoriesData, null, 2));
  console.log(`✓ Generated Captured Perspectives data: ${categoriesData.length} categories, ${categoriesData.reduce((sum, cat) => sum + cat.photoCount, 0)} total photos`);
  console.log(`✓ Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating perspectives data:', error);
  process.exit(1);
}
