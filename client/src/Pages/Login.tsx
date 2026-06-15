import { useState } from "react";
import { login } from "../supabase";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router";

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="hero-bg flex flex-1 items-center justify-center px-4 py-12"
    >
      <div className="fade-in-up w-full max-w-sm">

        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div
            className="feature-icon"
            style={{ width: '48px', height: '48px', borderRadius: '14px' }}
          >
            <LinkIcon />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>
              Welcome back
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Sign in to your Shortlink account
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="card p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
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

            {error && (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={{ background: 'var(--error-bg)', color: 'var(--error)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
              style={{ marginTop: '4px', padding: '11px 20px' }}
            >
              {loading ? <span className="spinner spinner-sm" /> : null}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-5 text-center" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}
