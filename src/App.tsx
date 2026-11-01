import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { AiChat } from './components/AiChat';
import { Contact } from './components/Contact';
import { Footer } from './components/FooterNew';

export default function App() {
  return (
    <div className="noise-overlay" style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <AiChat />
      <Contact />
      <Footer />
    </div>
  );
}
