import { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteLink, getUserLinks, type UserLink } from "../api";

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

  if (isLoading) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading your links...</p>;
  }

  return (
    <div className="w-full max-w-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Your links</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {links.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">You haven&apos;t shortened any links yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-purple-700 dark:text-purple-300">{link.short_code}</p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{link.original_url}</p>
              </div>
              <Link
                to={`/links/${link.id}/stats`}
                className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-purple-600 transition hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
              >
                Stats
              </Link>
              <button
                onClick={() => handleDelete(link.id)}
                disabled={deletingId === link.id}
                className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                {deletingId === link.id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
