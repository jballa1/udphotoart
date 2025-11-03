const fs = require('fs');
const path = require('path');

const unspokenDir = path.join(__dirname, '../public/images/unspoken');
const outputFile = path.join(__dirname, '../lib/unspoken-photos.json');

const categoryMap = {
  'Baby Photoshoot': { order: 1, description: 'Newborn innocence and first moments', icon: 'baby' },
  'Toddler': { order: 2, description: 'Early childhood personality and wonder', icon: 'child' },
  'Maternity': { order: 3, description: 'Anticipation and beauty of pregnancy', icon: 'heart' },
  'Portraits': { order: 4, description: 'Individual character and personality', icon: 'user' },
  'Senior Year': { order: 5, description: 'Coming of age milestone celebrations', icon: 'graduation' },
  'Shadows': { order: 6, description: 'Artistic interpretation through light and shadow', icon: 'moon' },
};

try {
  const categories = fs.readdirSync(unspokenDir)
    .filter(item => {
      const itemPath = path.join(unspokenDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

  const categoriesData = categories.map(category => {
    const categoryPath = path.join(unspokenDir, category);
    const photos = fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(photo => `/images/unspoken/${category}/${photo}`);

    const meta = categoryMap[category] || {
      order: 99,
      description: category,
      icon: 'image'
    };

    return {
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category,
      description: meta.description,
      icon: meta.icon,
      order: meta.order,
      photoCount: photos.length,
      hero: photos[0] || '',
      photos: photos
    };
  });

  // Sort by order
  categoriesData.sort((a, b) => a.order - b.order);

  fs.writeFileSync(outputFile, JSON.stringify(categoriesData, null, 2));
  console.log(`✓ Generated Unspoken data: ${categoriesData.length} categories, ${categoriesData.reduce((sum, cat) => sum + cat.photoCount, 0)} total photos`);
  console.log(`✓ Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating unspoken data:', error);
  process.exit(1);
}
