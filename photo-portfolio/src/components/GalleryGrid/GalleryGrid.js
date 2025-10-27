import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import CategoryCard from '../CategoryCard/CategoryCard';
import { getGalleryData, GALLERY_CONFIG } from '../../utils/googleDrive';
import './GalleryGrid.css';

const GalleryGrid = ({ onImageClick }) => {
  const [galleries, setGalleries] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    setLoading(true);
    const data = await getGalleryData();
    setGalleries(data);
    setLoading(false);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    const images = galleries[categoryName] || [];

    // No need for size assignment with Masonry - it handles aspect ratios naturally
    setCurrentImages(images);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentImages([]);
  };

  // Masonry breakpoint columns for responsive layout
  const breakpointColumns = {
    default: 4,
    1400: 3,
    1000: 2,
    600: 1,
  };

  if (loading) {
    return (
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading galleries...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            {selectedCategory ? selectedCategory : 'Gallery'}
          </h2>
          <p className="section-subtitle">
            {selectedCategory
              ? `Explore ${currentImages.length} stunning photographs`
              : 'Browse through different categories of photography'}
          </p>
        </motion.div>

        {selectedCategory && (
          <button className="back-button" onClick={handleBackToCategories}>
            ← Back to Categories
          </button>
        )}

        {!selectedCategory ? (
          // Show category cards
          <div className="categories-grid">
            {GALLERY_CONFIG.categories.map((category, index) => {
              const categoryImages = galleries[category.name] || [];
              const thumbnail =
                categoryImages.length > 0
                  ? categoryImages[0].src
                  : 'https://picsum.photos/400/300';

              return (
                <CategoryCard
                  key={category.name}
                  category={category.name}
                  imageCount={categoryImages.length}
                  thumbnail={thumbnail}
                  onClick={() => handleCategoryClick(category.name)}
                />
              );
            })}
          </div>
        ) : (
          // Use Masonry layout for natural image aspect ratios
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {currentImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="masonry-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => onImageClick(image, currentImages)}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="masonry-image"
                  loading="lazy"
                />
                <div className="masonry-overlay">
                  <p className="image-name">{image.name}</p>
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
