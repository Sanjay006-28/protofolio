import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const SECTION_EYEBROWS = {
  About: '// 01 · BACKGROUND & PHILOSOPHY',
  Skills: '// 02 · TECHNICAL STACK & PROBLEM SOLVING',
  Projects: '// 03 · FEATURED SYSTEMS & REPOSITORIES',
  Experience: '// 04 · INDUSTRY & INTERNSHIP EXPERIENCE',
  Education: '// 05 · ACADEMIC FOUNDATION & COURSEWORK',
  'Achievements & Certifications': '// 06 · HONORS & VERIFIED CREDENTIALS',
  Achievements: '// 06 · HONORS & VERIFIED CREDENTIALS',
  'Get In Touch': '// 07 · CONNECT & COLLABORATE',
  Contact: '// 07 · CONNECT & COLLABORATE',
};

const SECTION_ANCHORS = {
  About: 'about',
  Skills: 'skills',
  Projects: 'projects',
  Experience: 'experience',
  Education: 'education',
  'Achievements & Certifications': 'achievements',
  Achievements: 'achievements',
  'Get In Touch': 'contact',
  Contact: 'contact',
};

function Header(props) {
  const { title } = props;
  const [copied, setCopied] = useState(false);
  const eyebrow = SECTION_EYEBROWS[title] || '// SECTION';
  const anchorId = SECTION_ANCHORS[title];

  const copyAnchor = (e) => {
    e.preventDefault();
    if (!anchorId) return;
    const url = `${window.location.origin}/#${anchorId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="section-header-wrap">
      {eyebrow && <span className="section-header-eyebrow">{eyebrow}</span>}
      <h2 className="header">
        {title}
        {anchorId && (
          <button
            type="button"
            onClick={copyAnchor}
            className="section-anchor-btn"
            title={`Copy direct link to #${anchorId}`}
            aria-label={`Copy link to ${title}`}
          >
            {copied ? '✓' : '#'}
          </button>
        )}
      </h2>
      {copied && <span className="section-copied-toast">Link copied to clipboard!</span>}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
