import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import '../css/contact.css';

function Contact(props) {
  const { header } = props;
  const [copied, setCopied] = useState(false);

  const email = 'sanjaydn28@gmail.com';
  const linkedin = 'https://www.linkedin.com/in/sanjaydn/';
  const github = 'https://github.com/Sanjay006-28';

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Fade triggerOnce>
          <div className="contact-wrapper">
            <div className="contact-hero tile">
              <div className="contact-status-pill">
                <span className="contact-pulse-dot" />
                <span>Available for Internships & Full-time Roles</span>
              </div>
              <h2 className="contact-headline">Let&apos;s build something impactful together</h2>
              <p className="contact-subtext">
                Whether you have an internship opportunity, project collaboration, or just want to connect about Python, AI/ML, or Software Engineering — my inbox is always open!
              </p>

              <div className="contact-actions">
                <a
                  href={`mailto:${email}?subject=Hello%20from%20Portfolio`}
                  className="btn-pill btn-accent contact-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Send Direct Email</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn-pill btn-ghost contact-btn contact-copy-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>{copied ? '✓ Copied to clipboard!' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>

            <div className="contact-grid">
              <a
                href={`mailto:${email}`}
                className="tile tile--interactive contact-card"
              >
                <div className="contact-card__icon">✉</div>
                <div className="contact-card__label">Email</div>
                <div className="contact-card__value">{email}</div>
                <div className="contact-card__hint">Click to send an email ↗</div>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tile tile--interactive contact-card"
              >
                <div className="contact-card__icon">💼</div>
                <div className="contact-card__label">LinkedIn</div>
                <div className="contact-card__value">linkedin.com/in/sanjaydn</div>
                <div className="contact-card__hint">Connect & message on LinkedIn ↗</div>
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="tile tile--interactive contact-card"
              >
                <div className="contact-card__icon">💻</div>
                <div className="contact-card__label">GitHub</div>
                <div className="contact-card__value">github.com/Sanjay006-28</div>
                <div className="contact-card__hint">Explore open-source repositories ↗</div>
              </a>

              <a
                href="https://leetcode.com/u/sanjay006-28/"
                target="_blank"
                rel="noopener noreferrer"
                className="tile tile--interactive contact-card"
              >
                <div className="contact-card__icon">⚡</div>
                <div className="contact-card__label">LeetCode</div>
                <div className="contact-card__value">leetcode.com/u/sanjay006-28</div>
                <div className="contact-card__hint">View DSA & Problem Solving ↗</div>
              </a>

              <div className="tile contact-card contact-card--static">
                <div className="contact-card__icon">📍</div>
                <div className="contact-card__label">Location</div>
                <div className="contact-card__value">Bengaluru, Karnataka, India</div>
                <div className="contact-card__hint">Alliance University · Open to Relocate</div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
