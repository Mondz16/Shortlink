import { useState } from "react";
import { register } from "../supabase";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      setMessage("Check your email to confirm your account.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create an account</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started with Shortlink for free</p>
          </div>
        </div>

        {message ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-800 dark:bg-green-900/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-green-800 dark:text-green-300">{message}</p>
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                Once confirmed, you can{" "}
                <button onClick={() => navigate("/login")} className="underline font-medium">
                  sign in
                </button>
                .
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-purple-600 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
