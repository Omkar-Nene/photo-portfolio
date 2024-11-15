import React from 'react';
import './App.css';
import Gallery from './Gallery';

const images = [
  { src: '/images/4CD06A5A-755A-4434-B7A9-8F5F1C760FA9_1_105_c.jpeg', title: 'University Terrace' ,description: 'University CLT Living', thumbnail:'/images/4CD06A5A-755A-4434-B7A9-8F5F1C760FA9_1_105_c.jpeg' },
  { src: '/images/CA2AD2D0-CE44-4F4B-8D96-134ABC4A877B_1_105_c.jpeg', title: 'Downtown CLT' ,description: 'Downtown CLT Living', thumbnail:'/images/CA2AD2D0-CE44-4F4B-8D96-134ABC4A877B_1_105_c.jpeg' }
  // Add more photos here
];

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>My Photo Portfolio</h1>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#about">About Me</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main id="home">
                <section id="gallery">
                    <h2>Gallery</h2>
                    <Gallery images={images} />
                </section>
                <section id="about">
                    <h2>About Me</h2>
                    <p>This is where you can write about yourself.</p>
                </section>
                <section id="contact">
                    <h2>Contact</h2>
                    <p>Get in touch via email@example.com.</p>
                </section>
            </main>
        </div>
    );
}

export default App;
