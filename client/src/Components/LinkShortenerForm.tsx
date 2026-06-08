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
      setError(err.message);
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
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shorten a URL</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Paste your long URL below and get a clean short link.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="https://example.com/your-very-long-url"
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !url}
          className="shrink-0 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Shorten"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 dark:border-purple-800 dark:bg-purple-900/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="shrink-0 text-purple-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <a
            href={result}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-sm font-medium text-purple-700 hover:underline dark:text-purple-300"
          >
            {result}
          </a>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-purple-600 transition hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
