import { useNavigate } from "react-router";

const features = [
  {
    title: "Instant shortening",
    desc: "Paste any URL and get a clean short link in milliseconds.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Click analytics",
    desc: "Track every click by device, referrer, and day — in real time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Always available",
    desc: "Your links stay up — no expiry, no surprises, no downtime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col">
      <section className="hero-bg flex flex-1 flex-col items-center justify-center gap-10 px-6 py-20 text-center">

        {/* Badge */}
        <div className="badge fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Free URL Shortener
        </div>

        {/* Headline */}
        <div className="fade-in-up delay-1 flex max-w-2xl flex-col items-center gap-4">
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em' }}>
            Short links that{" "}
            <span className="gradient-text">mean business</span>
          </h1>
          <p className="max-w-sm text-lg" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Turn long, unwieldy URLs into clean shareable links — instantly. Track every click with real-time analytics.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-in-up delay-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary btn-lg"
          >
            Get started free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-secondary btn-lg"
          >
            Sign in
          </button>
        </div>

        {/* URL Demo Card */}
        <div className="card scale-in delay-3 w-full max-w-md p-4 text-left" style={{ boxShadow: 'var(--shadow-md)' }}>
          {/* Before */}
          <div
            className="flex items-center gap-3 rounded-lg px-4 py-3"
            style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="truncate text-sm" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              https://example.com/campaign/2025?utm_source=newsletter&ref=q8
            </span>
          </div>

          {/* Arrow */}
          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ color: 'var(--accent)', flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>

          {/* After */}
          <div
            className="flex items-center gap-3 rounded-lg px-4 py-3"
            style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ color: 'var(--accent)', flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="flex-1 text-sm font-semibold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              slink.io/xK4mP2
            </span>
            <span
              className="btn btn-sm"
              style={{ background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)', cursor: 'default' }}
            >
              Copy
            </span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="fade-in-up delay-4 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card card-lift flex flex-col items-center gap-3 p-5 text-center">
              <div className="feature-icon">{f.icon}</div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
