import React from 'react';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import Projects from './sections/Projects';
import Labs from './sections/Labs';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="portfolio-app">
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Labs />
        <Experience />
        <Certifications />
        <Education />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
