import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/achievements.css';

function Achievements(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.achievements, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            {/* Achievements */}
            <div className="ach-section-label">Achievements</div>
            <div className="ach-grid">
              {data.achievements?.map((item) => (
                <div
                  key={item.title}
                  className="tile tile--interactive ach-card"
                >
                  <div className="ach-icon">{item.icon}</div>
                  <div className="ach-card__body">
                    <h3 className="ach-card__title">{item.title}</h3>
                    <div className="ach-card__subtitle">{item.subtitle}</div>
                    {item.date && (
                      <div className="ach-card__date">{item.date}</div>
                    )}
                    <p className="ach-card__detail">{item.detail}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                        style={{ marginTop: '0.4rem', alignSelf: 'flex-start', fontSize: '0.74rem', padding: '0.2rem 0.65rem' }}
                      >
                        View Official Certificate PDF ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="ach-section-label ach-section-label--certs">Certifications</div>
            <div className="cert-grid">
              {data.certifications?.map((cert) => (
                <div
                  key={cert.title}
                  className="tile tile--interactive cert-card"
                >
                  <div className="cert-card__provider">{cert.provider}</div>
                  <h3 className="cert-card__title">{cert.title}</h3>
                  {cert.detail && (
                    <div className="cert-card__detail">{cert.detail}</div>
                  )}
                  <div className="cert-card__footer">
                    {cert.period && (
                      <span className="cert-card__period">{cert.period}</span>
                    )}
                    {cert.credentialId && (
                      <span className="cert-card__id">
                        ID: {cert.credentialId}
                      </span>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                        style={{ marginTop: '0.4rem', alignSelf: 'flex-start', fontSize: '0.74rem', padding: '0.2rem 0.65rem' }}
                      >
                        Verify Credential ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Achievements.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Achievements;
