import { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteLink, getUserLinks, type UserLink } from "../api";

function EmptyState() {
  return (
    <div
      className="card flex flex-col items-center gap-3 py-14 text-center"
      style={{ borderStyle: 'dashed' }}
    >
      <div className="feature-icon" style={{ opacity: 0.5 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <div>
        <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>No links yet</p>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Shorten your first URL above to get started.
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="card"
          style={{ padding: '14px 16px', opacity: 1 - i * 0.2 }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ height: '12px', width: '120px', borderRadius: '6px', background: 'var(--surface-alt)' }} />
              <div style={{ height: '11px', width: '200px', borderRadius: '6px', background: 'var(--surface-alt)' }} />
            </div>
            <div style={{ height: '28px', width: '56px', borderRadius: '6px', background: 'var(--surface-alt)' }} />
            <div style={{ height: '28px', width: '56px', borderRadius: '6px', background: 'var(--surface-alt)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LinkList() {
  const [links, setLinks] = useState<UserLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    getUserLinks()
      .then((data) => {
        if (!cancelled) setLinks(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "An error occurred");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteLink(id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full max-w-lg">

      <div className="mb-4 flex items-center justify-between">
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Your links</h2>
        {links.length > 0 && (
          <span className="chip">{links.length} link{links.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {error && (
        <div
          className="mb-4 rounded-lg px-4 py-3 text-sm"
          style={{ background: 'var(--error-bg)', color: 'var(--error)' }}
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <LoadingSkeleton />
      ) : links.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="flex flex-col gap-2">
          {links.map((link, i) => (
            <li
              key={link.id}
              className="card card-hover fade-in-up"
              style={{ animationDelay: `${i * 40}ms`, padding: '12px 16px' }}
            >
              <div className="flex items-center gap-3">
                {/* Short code + original URL */}
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate"
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '2px',
                    }}
                  >
                    /{link.short_code}
                  </p>
                  <p
                    className="truncate"
                    style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}
                  >
                    {link.original_url}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <a
                    href={`${import.meta.env.VITE_API_URL}/${link.short_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '12px', padding: '5px 10px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    View
                  </a>
                  <Link
                    to={`/links/${link.id}/stats`}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '12px', padding: '5px 10px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    Stats
                  </Link>
                  <button
                    onClick={() => handleDelete(link.id)}
                    disabled={deletingId === link.id}
                    className="btn btn-danger btn-sm"
                  >
                    {deletingId === link.id ? (
                      <span className="spinner spinner-sm" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    )}
                    {deletingId === link.id ? "" : "Delete"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
