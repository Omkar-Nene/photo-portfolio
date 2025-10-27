import React from 'react';
import { motion } from 'framer-motion';
import './CategoryCard.css';

const CategoryCard = ({ category, imageCount, thumbnail, onClick }) => {
  return (
    <motion.div
      className="category-card"
      onClick={onClick}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="category-image-container">
        <img src={thumbnail} alt={category} className="category-image" />
        <div className="category-overlay">
          <div className="category-info">
            <h3 className="category-name">{category}</h3>
            <p className="category-count">{imageCount} Photos</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
