import React from 'react';
import { Link } from 'react-router-dom';
import Social from './Social';
import '../css/footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              Sanjay D N<span className="accent-dot">.</span>
            </Link>
            <p className="site-footer__tagline">
              Computer Science & Engineering · AI/ML · Backend Systems
            </p>
            <div className="site-footer__status">
              <span className="footer-status-dot" />
              <span>Available for internships & software engineering roles</span>
            </div>
          </div>

          <div className="site-footer__nav">
            <div className="footer-nav-col">
              <span className="footer-col-title">Navigation</span>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/skills" className="footer-link">Skills</Link>
              <Link to="/projects" className="footer-link">Projects</Link>
            </div>
            <div className="footer-nav-col">
              <span className="footer-col-title">Explore</span>
              <Link to="/experience" className="footer-link">Experience</Link>
              <Link to="/education" className="footer-link">Education</Link>
              <Link to="/achievements" className="footer-link">Achievements</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-nav-col">
              <span className="footer-col-title">Connect</span>
              <a href="https://github.com/Sanjay006-28" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/sanjaydn/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a>
              <a href="https://leetcode.com/u/sanjay006-28/" target="_blank" rel="noopener noreferrer" className="footer-link">LeetCode ↗</a>
              <a href="mailto:sanjaydn28@gmail.com" className="footer-link">Email ↗</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">Resume PDF ↗</a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__social">
            <Social />
          </div>
          <p className="site-footer__copyright">
            © {currentYear} Sanjay D N · CGPA 8.8 · Alliance University Bengaluru
          </p>
          <div className="site-footer__badge">
            Designed with Bento UI · React & Vite
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
