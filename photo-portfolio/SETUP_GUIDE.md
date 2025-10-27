# Photo Portfolio - Setup Guide

## Overview
This is a modern, professional photography portfolio built with React featuring Google Drive integration for easy image management.

## Features
- Beautiful hero section with animations
- Category-based gallery system
- Google Drive integration (automatic image loading)
- Masonry layout with proper aspect ratios
- Lightbox for full-size image viewing
- Dark mode support
- Fully responsive design
- Smooth animations and transitions
- About and Contact sections

## Current Status
The portfolio is currently running with **mock data** (placeholder images from Lorem Picsum). To connect to your real Google Drive folders, follow the setup instructions below.

## Google Drive Setup

### Step 1: Create Folder Structure
1. Go to Google Drive
2. Create a main folder (e.g., "Portfolio Photos")
3. Inside this folder, create category subfolders:
   - Featured
   - Candid
   - Landscape
   - Portraits
   - Black & White
   - (Add more categories as needed)

### Step 2: Make Folders Public
For each category folder:
1. Right-click the folder → Share
2. Click "Change to anyone with the link"
3. Make sure it's set to "Viewer" access
4. Click "Done"

### Step 3: Get Folder IDs
For each folder:
1. Open the folder in Google Drive
2. Look at the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Copy the `FOLDER_ID_HERE` part
4. Save it for the next step

### Step 4: Configure the App

#### Option A: Using Google Drive API (Recommended for production)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google Drive API
4. Create credentials (API Key)
5. Copy your API key

Edit `src/utils/googleDrive.js`:
```javascript
// Replace 'YOUR_GOOGLE_API_KEY' with your actual API key
const apiKey = 'YOUR_ACTUAL_API_KEY_HERE';

// Update folder IDs in GALLERY_CONFIG
export const GALLERY_CONFIG = {
  categories: [
    {
      name: 'Featured',
      folderId: 'YOUR_ACTUAL_FEATURED_FOLDER_ID',
      description: 'My best work',
      autoFeatured: true,
    },
    {
      name: 'Candid',
      folderId: 'YOUR_ACTUAL_CANDID_FOLDER_ID',
      description: 'Spontaneous moments captured naturally',
    },
    // ... update all other categories
  ],
};
```

#### Option B: Public Folder Direct Links (Simpler, but limited)
If you just want to get started quickly, you can:
1. Make all folders public
2. Update only the `folderId` values in `src/utils/googleDrive.js`
3. The app will automatically fetch images from those folders

### Step 5: Upload Photos
1. Simply drag and drop photos into the appropriate category folders
2. The website will automatically display them!
3. No code changes needed after initial setup

## Running the Application

### Development Mode
```bash
cd photo-portfolio
npm start
```
Opens on `http://localhost:3000` (or `http://localhost:3001` if 3000 is busy)

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

## Customization

### Update Personal Information

#### About Section
Edit `src/components/About/About.js`:
- Update the photographer name
- Change the bio text
- Add a profile photo (replace the placeholder)

#### Contact Information
Edit `src/components/Contact/Contact.js`:
- Update email address
- Update phone number
- Update location
- Add real social media links

#### Hero Section
Edit `src/components/Hero/Hero.js`:
- Change the name
- Update subtitle/tagline

### Color Scheme
The main colors are defined in CSS files using gradients:
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (purple)

To change colors, search for these hex codes in:
- `src/components/Hero/Hero.css`
- `src/components/Navigation/Navigation.css`
- `src/App.css`

### Add More Categories
Edit `src/utils/googleDrive.js`:
```javascript
{
  name: 'Your New Category',
  folderId: 'FOLDER_ID_HERE',
  description: 'Category description',
}
```

## Image Guidelines

### Recommended Image Specs
- **Format:** JPG or PNG
- **Resolution:** At least 1920px on the longest side
- **File Size:** Under 5MB per image (for faster loading)
- **Aspect Ratio:** Any (the masonry layout handles all ratios)

### iPhone Photos
All iPhone photos work perfectly! The portfolio:
- Preserves original aspect ratios
- Never crops or stretches images
- Handles both portrait and landscape orientations
- Optimizes display for all screen sizes

## Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect React and deploy
5. Your site will be live at `yourproject.vercel.app`

### Deploy to Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `build`

## Features Breakdown

### Hero Section
- Full-screen landing with gradient background
- Animated text entrance
- Smooth scroll indicator
- Call-to-action button

### Gallery
- Category cards with hover effects
- Click to view category
- Masonry grid layout (images maintain aspect ratio)
- Lazy loading for performance
- Click image to open lightbox

### Lightbox
- Full-size image viewing
- Navigate with arrow keys or buttons
- Close with ESC key or X button
- Smooth animations

### Dark Mode
- Toggle in navigation bar
- Automatically applies to all sections
- Smooth color transitions

### Responsive Design
- Works on all devices (mobile, tablet, desktop)
- Touch-friendly navigation
- Optimized layouts for each screen size

## Troubleshooting

### Images not loading from Google Drive
- Verify folders are set to "Anyone with the link can view"
- Check that folder IDs are correct
- Ensure API key is valid (if using API method)
- Check browser console for error messages

### Port 3000 already in use
```bash
PORT=3001 npm start
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

## Support

For questions or issues:
1. Check browser console for errors
2. Verify Google Drive folder permissions
3. Ensure all dependencies are installed (`npm install`)

## Next Steps

1. Set up Google Drive folders
2. Upload your photos
3. Configure `googleDrive.js` with folder IDs
4. Customize personal information
5. Update social media links
6. Deploy to production!

---

**Note:** The app is currently showing mock/placeholder images. Once you configure Google Drive, real images will appear automatically!
