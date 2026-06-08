import { useNavigate } from "react-router";

export function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-3">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Shortlink
        </h1>
        <p className="max-w-sm text-lg text-gray-500 dark:text-gray-400">
          Turn long, unwieldy URLs into clean shareable links — instantly.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/signup")}
          className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 active:bg-purple-800"
        >
          Get started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
