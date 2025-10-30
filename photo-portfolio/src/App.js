import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import GalleryGrid from './components/GalleryGrid/GalleryGrid';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Lightbox from './components/Lightbox/Lightbox';

function App() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image, images) => {
    const index = images.findIndex((img) => img.id === image.id);
    setCurrentIndex(index);
    setLightboxImage(image);
    setLightboxImages(images);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
    setLightboxImages([]);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % lightboxImages.length;
    setCurrentIndex(nextIndex);
    setLightboxImage(lightboxImages[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex =
      currentIndex === 0 ? lightboxImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setLightboxImage(lightboxImages[prevIndex]);
  };

  return (
    <div className="App">
      <Navigation />
      <Hero />
      <GalleryGrid onImageClick={handleImageClick} />
      <About />
      <Contact />

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          images={lightboxImages}
          onClose={handleCloseLightbox}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
        />
      )}

      {/* Developer credit - subtle */}
      <div className="developer-credit">
        Developed by Omkar Nene
      </div>
    </div>
  );
}

export default App;
