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
                Welcome to my photography portfolio.
              </p>
              <p>
                I'm Aniruddha Oka, a passionate photographer who loves to capture life's most beautiful moments as I witness them.
              </p>
              <p>
                And this is the very reason that I have been shooting on my iPhone Pro off late, having practiced photography on an SLR with a set of lenses.
              </p>
              <p>
                With an eye for detail and a love for storytelling, I believe I have a collection of various photographs mostly including Natural Landscapes, Skies, Flowers & Fauna, Walking Trails and some interesting images and scenery that fascinated me. Mostly in colour and select few in Monotone – Black & White that is.
              </p>
              <p>
                To me, each photograph tells a story of a unique moment frozen in time that I cherish.
              </p>
              <p>
                And without being selfish, I wish to share the joy of witnessing these moments now with you. Be it grandeur of nature, the play of light & shadow, the spontaneity of candid moments or the interesting shapes & patterns.
              </p>
              <p>
                I hope you do like some of these and if you wish to have some printed or framed, do get in touch with me.
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
