import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Gallery.css';

const images = [
    { src: '/images/portrait/4CD06A5A-755A-4434-B7A9-8F5F1C760FA9_1_105_c.jpeg', title: 'Downtown CLT', description: 'Downtown CLT Living', thumbnail: '/images/portrait/4CD06A5A-755A-4434-B7A9-8F5F1C760FA9_1_105_c.jpeg', orientation: 'portrait' },
    { src: '/images/landscape/CA2AD2D0-CE44-4F4B-8D96-134ABC4A877B_1_105_c.jpeg', title: 'University Terrace', description: 'University CLT Living', thumbnail: '/images/landscape/CA2AD2D0-CE44-4F4B-8D96-134ABC4A877B_1_105_c.jpeg', orientation: 'landscape' },
    { src: '/images/landscape/82769399-93B4-4BD4-9100-EF04D304B907_1_105_c.jpeg', title: '17 Mile Drive', description: 'A California Attraction', thumbnail: '/images/landscape/82769399-93B4-4BD4-9100-EF04D304B907_1_105_c.jpeg', orientation: 'landscape' },
    { src: '/images/portrait/60751B4F-F7A2-4B9E-B205-028EA2F51B34_1_105_c.jpeg', title: 'Desert Fun', description: 'A Day at a Desert', thumbnail: '/images/portrait/60751B4F-F7A2-4B9E-B205-028EA2F51B34_1_105_c.jpeg', orientation: 'portrait' }
];

const Gallery = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className="gallery-container">
            <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            {['portrait', 'landscape'].map(orientation => (
                <div className="gallery-section" key={orientation}>
                    <h2>{orientation.charAt(0).toUpperCase() + orientation.slice(1)} Images</h2>
                    <ImageGallery
                        items={images.filter(image => image.orientation === orientation).map(image => ({
                            original: image.src,
                            thumbnail: image.thumbnail,
                            originalTitle: image.title,
                            description: image.description
                        }))}
                        showThumbnails={true}
                        showFullscreenButton={true}
                        showPlayButton={false}
                        thumbnailPosition="bottom"  // Ensure thumbnails appear at the bottom
                        thumbnailHeight={60}  // Set thumbnail height
                        thumbnailWidth={80}  // Set thumbnail width
                    />
                </div>
            ))}
        </div>
    );
};

export default Gallery;
