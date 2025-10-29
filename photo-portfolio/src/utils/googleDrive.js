/**
 * Google Drive Integration Utility
 *
 * This utility handles fetching images from public Google Drive folders.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a main folder in Google Drive for your portfolio
 * 2. Create category subfolders (e.g., Candid, Landscape, Portraits, etc.)
 * 3. Make each folder publicly accessible:
 *    - Right-click folder → Share → Change to "Anyone with the link"
 * 4. Get the folder ID from the URL:
 *    - URL format: https://drive.google.com/drive/folders/FOLDER_ID_HERE
 * 5. Add folder IDs to the config below
 */

// Configuration: Map category names to Google Drive folder IDs
export const GALLERY_CONFIG = {
  categories: [
    {
      name: 'Featured',
      folderId: '1rx2WrBjmEK3Kh1BxkOBQT__UsU6sO1QW',
      description: 'My best work',
      autoFeatured: true, // Auto-populate from other categories
    },
    {
      name: 'Flora & Fauna',
      folderId: '1sieqlrFxB5BhDqNinC2BRFLw2mW83PtM',
      description: 'Nature\'s beauty in flowers and wildlife',
    },
    {
      name: 'Landscape',
      folderId: '12m3SZ1nShD3GHrWqW2dyYWRfGsJmmNwp',
      description: 'Beautiful scenery and natural vistas',
    },
    {
      name: 'Portraits',
      folderId: '14zCAp_kx73TUQm1Zo4jcBmaPH0ewSehC',
      description: 'Professional portrait photography',
    },
    {
      name: 'Black & White',
      folderId: '1LC9cZEEHTY4NjbgpxyWjDY4GvpwPfQD7',
      description: 'Timeless monochrome photography',
    },
  ],
};

/**
 * Fetches images from a public Google Drive folder
 * @param {string} folderId - The Google Drive folder ID
 * @returns {Promise<Array>} Array of image objects
 */
export const fetchImagesFromFolder = async (folderId) => {
  try {
    // Google Drive API endpoint for listing files in a folder
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error('Google API key not configured. Please add REACT_APP_GOOGLE_API_KEY to your .env file');
    }

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,imageMediaMetadata)`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter only image files and format them
    const images = data.files
      .filter(file => file.mimeType.startsWith('image/'))
      .map(file => {
        // Determine orientation from image metadata if available
        let orientation = 'landscape'; // default
        if (file.imageMediaMetadata) {
          const { width, height } = file.imageMediaMetadata;
          orientation = height > width ? 'portrait' : 'landscape';
        }

        return {
          id: file.id,
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension from display name
          thumbnail: file.thumbnailLink,
          // Google Content Delivery URL - works great for JPEG images
          src: `https://lh3.googleusercontent.com/d/${file.id}=s2000`,
          downloadUrl: file.webContentLink,
          orientation: orientation,
        };
      });

    return images;
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    return [];
  }
};

/**
 * Fetches all images organized by category
 * @returns {Promise<Object>} Object with categories as keys and image arrays as values
 */
export const fetchAllGalleries = async () => {
  const galleries = {};

  for (const category of GALLERY_CONFIG.categories) {
    if (category.autoFeatured) {
      // For Featured category, we'll handle it differently (auto-select from all categories)
      galleries[category.name] = [];
      continue;
    }

    galleries[category.name] = await fetchImagesFromFolder(category.folderId);
  }

  // Auto-populate Featured category with random/recent images from other categories
  const featuredCategory = GALLERY_CONFIG.categories.find(cat => cat.autoFeatured);
  if (featuredCategory) {
    const allImages = Object.values(galleries).flat();
    // Get 12 random images for featured section
    galleries[featuredCategory.name] = allImages
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }

  return galleries;
};

/**
 * MOCK DATA - For testing before Google Drive is set up
 * Remove this once you have real Google Drive folders configured
 */
export const getMockGalleries = () => {
  // Helper to generate mock images with proper aspect ratios
  const mockImages = (category, count, orientation = 'mixed') => {
    return Array.from({ length: count }, (_, i) => {
      let width, height;

      // Determine dimensions based on orientation
      if (orientation === 'portrait') {
        width = 800;
        height = 1200; // 2:3 ratio (portrait)
      } else if (orientation === 'landscape') {
        width = 1200;
        height = 800; // 3:2 ratio (landscape)
      } else {
        // Mixed orientation - alternate between portrait and landscape
        if (i % 2 === 0) {
          width = 1200;
          height = 800; // landscape
        } else {
          width = 800;
          height = 1200; // portrait
        }
      }

      return {
        id: `${category}-${i}`,
        name: `${category} Photo ${i + 1}`,
        thumbnail: `https://picsum.photos/${width}/${height}?random=${category}-${i}`,
        src: `https://picsum.photos/${width}/${height}?random=${category}-${i}`,
        orientation: width > height ? 'landscape' : 'portrait',
      };
    });
  };

  // Create featured with mix of both orientations
  const candid = mockImages('candid', 8, 'mixed');
  const landscape = mockImages('landscape', 10, 'landscape');
  const portraits = mockImages('portraits', 6, 'portrait');
  const bw = mockImages('bw', 7, 'mixed');

  // Featured is a mix from all categories
  const allImages = [...candid, ...landscape, ...portraits, ...bw];
  const featured = allImages
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return {
    Featured: featured,
    Candid: candid,
    Landscape: landscape,
    Portraits: portraits,
    'Black & White': bw,
  };
};

/**
 * Main function to get gallery data
 * Uses mock data if Google Drive is not configured
 * @returns {Promise<Object>} Gallery data organized by category
 */
export const getGalleryData = async () => {
  // Check if Google Drive is configured
  const isConfigured = GALLERY_CONFIG.categories.some(
    cat => cat.folderId && !cat.folderId.startsWith('YOUR_')
  );

  if (isConfigured) {
    return await fetchAllGalleries();
  } else {
    // Return mock data for development
    console.warn('Google Drive not configured. Using mock data.');
    return getMockGalleries();
  }
};
