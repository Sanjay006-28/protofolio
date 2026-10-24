import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/skills.css';

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
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
            <div className="bento">
              {data.intro && (
                <div className="tile skills-intro-tile span-6">
                  <ReactMarkdown>{data.intro}</ReactMarkdown>
                </div>
              )}
              {data.skills?.map((category) => (
                <div
                  key={category.title}
                  className="tile tile--interactive skill-category-tile span-3"
                >
                  <h3 className="skill-category-title">{category.title}</h3>
                  <div className="skill-grid">
                    {category.items.map((item) => (
                      <div key={item.title} className="skill-item">
                        <img
                          src={item.icon}
                          alt={item.title}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Data Structures & Algorithms Problem Solving Showcase */}
              <div className="tile tile--interactive span-6 skills-dsa-tile">
                <div className="skills-dsa-header">
                  <div className="skills-dsa-title-group">
                    <div className="skills-dsa-icon">⚡</div>
                    <div>
                      <h3 className="skills-dsa-title">Data Structures & Algorithms</h3>
                      <p className="skills-dsa-subtitle">Continuous problem solving & algorithmic pattern mastery</p>
                    </div>
                  </div>
                  <a
                    href="https://leetcode.com/u/sanjay006-28/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-accent skills-dsa-btn"
                  >
                    <span>View LeetCode Profile</span>
                    <span>↗</span>
                  </a>
                </div>

                <div className="skills-dsa-grid">
                  <div className="skills-dsa-topic">
                    <span className="skills-dsa-dot" />
                    <span>Arrays & Two Pointers</span>
                  </div>
                  <div className="skills-dsa-topic">
                    <span className="skills-dsa-dot" />
                    <span>Hash Maps & Hash Sets</span>
                  </div>
                  <div className="skills-dsa-topic">
                    <span className="skills-dsa-dot" />
                    <span>String Manipulation & Sorting</span>
                  </div>
                  <div className="skills-dsa-topic">
                    <span className="skills-dsa-dot" />
                    <span>Binary Search</span>
                  </div>
                  <div className="skills-dsa-topic">
                    <span className="skills-dsa-dot" />
                    <span>Stack & Queues</span>
                  </div>
                  <div className="skills-dsa-topic">
                    <span className="skills-dsa-dot" />
                    <span>Big-O Time & Space Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
