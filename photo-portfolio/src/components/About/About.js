import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="image-placeholder">
              <span>Your Photo Here</span>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="about-title">About Me</h2>
            <div className="about-text">
              <p>
                Welcome to my photography portfolio. I'm Aniruddha Oka, a passionate
                photographer dedicated to capturing life's most beautiful moments.
              </p>
              <p>
                With an eye for detail and a love for storytelling, I specialize in
                various photography styles including candid, landscape, portrait, and
                black & white photography. Each photograph tells a unique story, frozen
                in time.
              </p>
              <p>
                My goal is to create timeless images that evoke emotion and preserve
                memories for generations to come. Whether it's the grandeur of nature,
                the intimacy of a portrait, or the spontaneity of candid moments, I
                strive to capture the essence of every scene.
              </p>
            </div>

            <div className="skills">
              <div className="skill-item">
                <span className="skill-icon">📷</span>
                <h4>Photography</h4>
              </div>
              <div className="skill-item">
                <span className="skill-icon">✨</span>
                <h4>Photo Editing</h4>
              </div>
              <div className="skill-item">
                <span className="skill-icon">🎨</span>
                <h4>Creative Direction</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
