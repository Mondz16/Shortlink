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
    <button onClick={handleLogout} className="btn btn-ghost btn-sm">
      Sign out
    </button>
  );
}
