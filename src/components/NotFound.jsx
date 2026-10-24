import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="section-content-container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="tile" style={{ maxWidth: '520px', padding: '3rem 2rem', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          404 Error
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', margin: '0.75rem 0', fontWeight: '600' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
          The page you are looking for doesn&apos;t exist or has moved. Return to the homepage to explore Sanjay D N&apos;s portfolio.
        </p>
        <Link to="/" className="btn-pill btn-accent">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
