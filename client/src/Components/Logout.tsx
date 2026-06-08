import { logout } from "../supabase";
import { useNavigate } from "react-router";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error instanceof Error ? error.message : error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      Sign out
    </button>
  );
}
