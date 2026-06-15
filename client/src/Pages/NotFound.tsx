import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="hero-bg flex flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <div className="fade-in-up">
        <p
          className="gradient-text"
          style={{ fontSize: 'clamp(80px, 15vw, 140px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em' }}
        >
          404
        </p>
      </div>
      <div className="fade-in-up delay-1">
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
          Page not found
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <div className="fade-in-up delay-2">
        <Link to="/" className="btn btn-primary">
          Go home
        </Link>
      </div>
    </div>
  );
}
