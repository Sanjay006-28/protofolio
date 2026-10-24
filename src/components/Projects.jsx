import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import '../css/projects.css';

const Projects = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const categories = ['All', 'AI & NLP', 'Cybersecurity', 'Full-Stack & Systems'];

  const filterProject = (project) => {
    let matchesCategory = true;
    if (selectedCategory !== 'All') {
      const cat = (project.category || '').toLowerCase();
      const tags = (project.tags || []).map((t) => t.toLowerCase());

      if (selectedCategory === 'AI & NLP') {
        matchesCategory = cat.includes('ai') || cat.includes('nlp') || tags.includes('google gemini api') || tags.includes('sentence transformers');
      } else if (selectedCategory === 'Cybersecurity') {
        matchesCategory = cat.includes('cybersecurity') || cat.includes('malware') || tags.includes('chrome extension') || tags.includes('shap');
      } else if (selectedCategory === 'Full-Stack & Systems') {
        matchesCategory = tags.includes('fastapi') || tags.includes('react') || cat.includes('recon') || tags.includes('sqlalchemy');
      }
    }

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const title = (project.title || '').toLowerCase();
    const cat = (project.category || '').toLowerCase();
    const body = (project.bodyText || '').toLowerCase();
    const tags = (project.tags || []).map((t) => t.toLowerCase()).join(' ');

    return title.includes(q) || cat.includes(q) || body.includes(q) || tags.includes(q);
  };

  const filteredProjects = data?.projects?.filter(filterProject) || [];
  const numberOfItems = showMore ? filteredProjects.length : 6;

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="projects-controls">
              <div className="projects-search-wrap">
                <span className="projects-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search projects by tech (e.g. FastAPI, Python, Gemini)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="projects-search-input"
                  aria-label="Search projects by technology"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="projects-search-clear"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="projects-filter-bar">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`projects-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowMore(false);
                    }}
                  >
                    {category}
                    {category !== 'All' && (
                      <span className="projects-filter-count">
                        {data.projects?.filter((p) => {
                          const cat = (p.category || '').toLowerCase();
                          const tags = (p.tags || []).map((t) => t.toLowerCase());
                          if (category === 'AI & NLP') return cat.includes('ai') || cat.includes('nlp') || tags.includes('google gemini api') || tags.includes('sentence transformers');
                          if (category === 'Cybersecurity') return cat.includes('cybersecurity') || cat.includes('malware') || tags.includes('chrome extension') || tags.includes('shap');
                          if (category === 'Full-Stack & Systems') return tags.includes('fastapi') || tags.includes('react') || cat.includes('recon') || tags.includes('sqlalchemy');
                          return true;
                        }).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="tile projects-empty-state">
                <div className="projects-empty-icon">🔍</div>
                <h3 className="projects-empty-title">No projects match &ldquo;{searchQuery}&rdquo;</h3>
                <p className="projects-empty-sub">Try searching for another technology or reset your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="btn-pill btn-accent"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="bento">
                {filteredProjects.slice(0, numberOfItems).map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    featured={selectedCategory === 'All' && !searchQuery.trim() && index === 0}
                  />
                ))}
              </div>
            )}
          </Fade>

          {!showMore && filteredProjects.length > numberOfItems && (
            <div className="projects-more">
              <button
                type="button"
                className="btn-pill btn-ghost"
                onClick={() => setShowMore(true)}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
