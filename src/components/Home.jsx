import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Fade } from 'react-awesome-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Achievements from './Achievements';
import Contact from './Contact';
import '../css/home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return data ? (
    <div className="home-page-container">
      <Fade triggerOnce className="home-fade-container">
        <section id="home" className="hero">
          <div className="bento">
            {/* Main Intro Tile */}
            <div className="tile hero-intro span-4 rspan-2">
              {data?.status && (
                <span className="hero-eyebrow">{data.status}</span>
              )}
              {data?.headline && (
                <h1 className="hero-name">{data.headline}</h1>
              )}
              <div className="hero-roles">
                <span>I&apos;m&nbsp;</span>
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    strings: data?.roles,
                  }}
                />
              </div>
              {data?.tagline && <p className="hero-tagline">{data.tagline}</p>}
              <div className="hero-cta">
                <a
                  className="btn-pill btn-accent"
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
                >
                  Explore My Projects ↓
                </a>
                <a
                  className="btn-pill btn-ghost"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Preview Resume in new tab"
                >
                  Preview Resume ↗
                </a>
                <a
                  className="btn-pill btn-ghost"
                  href="/resume.pdf"
                  download="Sanjay_D_N_Resume.pdf"
                  title="Download Sanjay D N Resume PDF"
                >
                  Download PDF ⤓
                </a>
                <a
                  className="btn-pill btn-ghost"
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                >
                  Get in Touch ↓
                </a>
              </div>
            </div>

            {/* Upgraded Tech Profile Tile */}
            <div className="tile hero-card-tech span-2">
              <div className="hero-card-status">
                <span className="hero-status-pulse" />
                <span>Available for Work</span>
              </div>
              <div className="hero-card-profile">
                <div className="hero-avatar-glow">
                  <span className="hero-avatar-text">SD</span>
                </div>
                <div>
                  <h3 className="hero-card-name">{data?.name}</h3>
                  <span className="hero-card-role">Software & AI/ML Engineer</span>
                </div>
              </div>
              <div className="hero-card-pills">
                <span className="hero-card-pill">Python</span>
                <span className="hero-card-pill">FastAPI</span>
                <span className="hero-card-pill">AI/ML</span>
                <span className="hero-card-pill">React</span>
              </div>
            </div>

            {/* Social Tile */}
            <div className="tile hero-social span-2">
              <span className="tile-label">Connect & Socials</span>
              <Social />
              <div className="hero-subtitle">
                <span className="hero-subtitle-text">
                  Bengaluru, India · Alliance University · B.Tech AIML
                </span>
              </div>
            </div>

            {/* Quick Metrics / Stats Bar */}
            <div className="tile hero-stat-tile span-6">
              <div className="hero-stats-grid">
                <div className="hero-stat-item">
                  <div className="hero-stat-value">8.8</div>
                  <div className="hero-stat-label">CGPA · B.Tech AIML</div>
                  <div className="hero-stat-sub">Alliance University</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-value">Top 1%</div>
                  <div className="hero-stat-label">NPTEL Elite + Gold</div>
                  <div className="hero-stat-sub">Cloud Computing (88%)</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-value">4+</div>
                  <div className="hero-stat-label">Core Projects</div>
                  <div className="hero-stat-sub">AI, Security & Systems</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-value">1M1B</div>
                  <div className="hero-stat-label">AI Intern</div>
                  <div className="hero-stat-sub">IBM SkillsBuild Certified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Hint */}
          <div className="hero-scroll-hint">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="scroll-hint-link"
              aria-label="Scroll down to About section"
            >
              <span className="scroll-hint-text">Scroll to explore portfolio</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="scroll-hint-arrow">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>
          </div>
        </section>
      </Fade>

      {/* Sequential sections enabled for smooth scrolling from Home */}
      <section id="about" className="home-section-anchor">
        <About header="About" />
      </section>

      <section id="skills" className="home-section-anchor">
        <Skills header="Skills" />
      </section>

      <section id="projects" className="home-section-anchor">
        <Projects header="Projects" />
      </section>

      <section id="experience" className="home-section-anchor">
        <Experience header="Experience" />
      </section>

      <section id="education" className="home-section-anchor">
        <Education header="Education" />
      </section>

      <section id="achievements" className="home-section-anchor">
        <Achievements header="Achievements & Certifications" />
      </section>

      <section id="contact" className="home-section-anchor">
        <Contact header="Get In Touch" />
      </section>
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
