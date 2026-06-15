import { useState } from "react";
import { shortenLinkUrl } from "../api";

export function LinkShortenerForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!url) return;
    try {
      setIsLoading(true);
      setError("");
      setResult(null);
      const data = await shortenLinkUrl(url);
      setUrl("");
      setResult(data.data.updated);
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in-up w-full max-w-lg">

      {/* Section header */}
      <div className="mb-5 text-center">
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>
          Shorten a URL
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Paste your long URL and get a clean short link.
        </p>
      </div>

      {/* Input row */}
      <div
        className="card flex items-center gap-2 p-2"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="https://example.com/your-very-long-url"
          className="input"
          style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '8px 12px', flex: 1 }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !url}
          className="btn btn-primary"
          style={{ flexShrink: 0, padding: '9px 18px' }}
        >
          {isLoading ? (
            <span className="spinner spinner-sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
          ) : null}
          {isLoading ? "Shortening…" : "Shorten"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="mt-3 rounded-lg px-4 py-3 text-sm"
          style={{ background: 'var(--error-bg)', color: 'var(--error)' }}
        >
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className="scale-in card mt-3 flex items-center gap-3 px-4 py-3"
          style={{ borderColor: 'var(--accent-border)', background: 'var(--accent-light)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ color: 'var(--accent)', flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <a
            href={result}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-sm font-semibold"
            style={{ color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {result}
          </a>
          <button
            onClick={handleCopy}
            className="btn btn-sm"
            style={{
              background: copied ? 'var(--success)' : 'var(--accent)',
              color: '#fff',
              borderColor: 'transparent',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Copied!
              </>
            ) : (
              "Copy"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
