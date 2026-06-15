import { LinkList } from "../Components/LinkList";
import { LinkShortenerForm } from "../Components/LinkShortenerForm";
import { LogoutButton } from "../Components/Logout";

export function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <nav className="app-nav">
        <div className="flex items-center gap-2.5">
          <div
            className="feature-icon"
            style={{ width: '30px', height: '30px', borderRadius: '8px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Shortlink</span>
        </div>
        <LogoutButton />
      </nav>

      <main className="flex flex-1 flex-col items-center gap-10 px-4 py-12">
        <LinkShortenerForm />
        <LinkList />
      </main>
    </div>
  );
}
