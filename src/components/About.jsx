import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        {data ? (
          <Fade triggerOnce>
            <div className="bento">
              {/* Main Bio Card */}
              <div className="tile about-bio-tile span-4">
                <div className="about-bio-header">
                  <span className="about-bio-label">Background & Philosophy</span>
                  <h2 className="about-bio-title">Engineering AI Systems with Purpose</h2>
                </div>
                <div className="about-bio-content">
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </div>
              </div>

              {/* Quick Facts Card */}
              <div className="tile about-facts-tile span-2">
                <span className="tile-label">Quick Profile</span>
                <div className="about-facts-list">
                  <div className="about-fact-item">
                    <span className="about-fact-key">Education</span>
                    <span className="about-fact-val">B.Tech in CSE (AIML)</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">University</span>
                    <span className="about-fact-val">Alliance University, Bengaluru</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Academic CGPA</span>
                    <span className="about-fact-val about-fact-val--highlight">8.8 / 10.0</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Graduation</span>
                    <span className="about-fact-val">July 2027</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Core Focus</span>
                    <span className="about-fact-val">Python · AI/ML · FastAPI · LLMs</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Location</span>
                    <span className="about-fact-val">Bengaluru, Karnataka, India</span>
                  </div>
                </div>

                <div className="about-cta-box" style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-pill btn-accent about-resume-btn">
                    Preview Resume ↗
                  </a>
                  <a href="/resume.pdf" download="Sanjay_D_N_Resume.pdf" className="btn-pill btn-ghost about-resume-btn" title="Download Sanjay D N Resume PDF">
                    Download ⤓
                  </a>
                </div>
              </div>
            </div>
          </Fade>
        ) : <FallbackSpinner />}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
