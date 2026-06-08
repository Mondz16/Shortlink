import { LinkList } from "../Components/LinkList";
import { LinkShortenerForm } from "../Components/LinkShortenerForm";
import { LogoutButton } from "../Components/Logout";

export function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Shortlink</span>
        </div>
        <LogoutButton />
      </header>

      <main className="flex flex-1 flex-col items-center gap-12 px-4 py-12">
        <LinkShortenerForm />
        <LinkList />
      </main>
    </div>
  );
}
