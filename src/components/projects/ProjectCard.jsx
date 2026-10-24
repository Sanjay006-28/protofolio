import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const ProjectCard = ({ project, featured = false }) => {
  const parseBodyText = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  return (
    <article
      className={`tile tile--interactive project-card ${
        featured ? 'span-4 project-card--featured' : 'span-2'
      }`}
    >
      {project?.image ? (
        <div className="project-card__media">
          <img src={project.image} alt={project.title} />
        </div>
      ) : (
        <div className="project-card__banner">
          <div className="project-banner__dots">
            <span className="banner-dot dot-red" />
            <span className="banner-dot dot-yellow" />
            <span className="banner-dot dot-green" />
            <span className="banner-title">{project.title.split('—')[0].trim()}</span>
          </div>
          <div className="project-banner__preview">
            <span className="banner-code-comment">// System Architecture</span>
            <span className="banner-code-flow">
              {project.category || 'Python · AI/ML System'}
            </span>
          </div>
        </div>
      )}

      <div className="project-card__body">
        {project?.category && (
          <div className="project-card__category-bar">
            <span className="project-card__category">{project.category}</span>
            {featured && <span className="project-card__badge-featured">Featured</span>}
          </div>
        )}
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__text">{parseBodyText(project.bodyText)}</div>
      </div>

      <div className="project-card__footer">
        <div className="project-card__links">
          {project?.links?.length > 0 ? (
            project.links.map((link) => (
              <a
                key={link.href}
                className="proj-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
                {' '}
                ↗
              </a>
            ))
          ) : (
            <span className="proj-link proj-link--research">
              🔒 Research & Academic Codebase
            </span>
          )}
        </div>
        {project?.tags?.length > 0 && (
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  featured: PropTypes.bool,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
