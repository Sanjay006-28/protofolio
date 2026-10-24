import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/timeline.css';

function Experience(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="bento">
              {/* Timeline Column */}
              <div className="span-4" style={{ width: '100%' }}>
                <div className="tl tl--experience" style={{ maxWidth: '100%', margin: 0 }}>
                  {data.map((item) => (
                    <div className="tl-item" key={item.title + item.dateText}>
                      <div className="tl-node--icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      </div>
                      <div className="tl-card">
                        <div className="tl-date">{item.dateText}</div>
                        <h3 className="tl-title">{item.title}</h3>
                        <div className="tl-subtitle">
                          <span className="accent">{item.subtitle}</span>
                          {item.workType ? ` · ${item.workType}` : ''}
                        </div>
                        <ul className="tl-list">
                          {item.workDescription.map((point) => (
                            <li key={point}>
                              <ReactMarkdown components={{ p: 'span' }}>
                                {point}
                              </ReactMarkdown>
                            </li>
                          ))}
                        </ul>
                        {item.certificateUrl && (
                          <div style={{ marginTop: 'var(--space-3)' }}>
                            <a
                              href={item.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proj-link"
                            >
                              View 1M1B Certificate ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Competency & Impact Card */}
              <div className="tile about-facts-tile span-2" style={{ height: 'fit-content' }}>
                <span className="tile-label">Internship Highlights</span>
                <div className="about-facts-list">
                  <div className="about-fact-item">
                    <span className="about-fact-key">Partner Program</span>
                    <span className="about-fact-val">IBM SkillsBuild × 1M1B</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Focus Area</span>
                    <span className="about-fact-val">Responsible AI & UN SDGs</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Core Concept</span>
                    <span className="about-fact-val about-fact-val--highlight">RAG Architecture</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Technologies</span>
                    <span className="about-fact-val">LLMs · Embeddings · Prompt Engineering</span>
                  </div>
                  <div className="about-fact-item">
                    <span className="about-fact-key">Credential ID</span>
                    <span className="about-fact-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                      a3ae9454-0498...
                    </span>
                  </div>
                </div>

                <div className="about-cta-box">
                  <a
                    href="https://drive.google.com/file/d/1W-5GE_SlLtwCTtJzvtpi-H6yGqOMekgq/view?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-accent about-resume-btn"
                  >
                    View 1M1B Certificate ↗
                  </a>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
