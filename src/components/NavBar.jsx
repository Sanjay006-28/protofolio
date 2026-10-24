import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
};

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled(Link)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
  &.active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

const BrandMonogram = styled.a`
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.color} !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4em;

  &:hover {
    color: ${(props) => props.theme.accentColor} !important;
    text-decoration: none;
  }

  .brand-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => props.theme.accentColor};
    display: inline-block;
    flex-shrink: 0;
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const sectionIds = [
      { id: 'contact', href: '/contact' },
      { id: 'achievements', href: '/achievements' },
      { id: 'education', href: '/education' },
      { id: 'experience', href: '/experience' },
      { id: 'projects', href: '/projects' },
      { id: 'skills', href: '/skills' },
      { id: 'about', href: '/about' },
      { id: 'home', href: '/' },
    ];

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }

      if (window.scrollY < 160) {
        setActiveSection('/');
        return;
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
        setActiveSection('/contact');
        return;
      }

      const scrollPosition = window.scrollY + 220;
      for (let i = 0; i < sectionIds.length; i += 1) {
        const { id, href } = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(href);
            return;
          }
        }
      }
      setActiveSection('/');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, section) => {
    setExpanded(false);
    if (section.href && section.href.startsWith('/')) {
      const sectionId = section.href === '/' ? 'home' : section.href.replace('/', '');
      if (location.pathname === '/') {
        e.preventDefault();
        if (section.href === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('/');
          return;
        }
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(section.href);
        }
      }
    }
  };

  return (
    <Navbar
      fixed="top"
      expand="md"
      variant={theme.bsPrimaryVariant}
      className="navbar-custom"
      expanded={expanded}
    >
      <div
        className="navbar-scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />
      <Container>
        <BrandMonogram
          href="/"
          theme={theme}
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('/');
            }
          }}
        >
          <span className="brand-dot" />
          Sanjay D N
        </BrandMonogram>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="navbar-nav-links">
            {data
              && data.sections?.map((section) => {
                const isLinkActive = location.pathname === '/'
                  ? section.href === activeSection
                  : location.pathname === section.href;

                return section?.type === 'link' ? (
                  <ExternalNavLink
                    key={section.title}
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    theme={theme}
                  >
                    {section.title}
                  </ExternalNavLink>
                ) : (
                  <InternalNavLink
                    key={section.title}
                    onClick={(e) => handleNavClick(e, section)}
                    className={`navbar__link ${isLinkActive ? 'active' : ''}`}
                    to={section.href}
                    theme={theme}
                  >
                    {section.title}
                  </InternalNavLink>
                );
              })}
          </Nav>
          <ThemeToggler
            onClick={() => setExpanded(false)}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
