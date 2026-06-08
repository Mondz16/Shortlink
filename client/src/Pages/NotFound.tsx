import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="text-8xl font-bold text-purple-200 dark:text-purple-900">404</p>
      <div className="-mt-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
      >
        Go home
      </Link>
    </div>
  );
}
