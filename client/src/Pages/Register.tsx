import { useState } from "react";
import { register } from "../supabase";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router";

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

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
    <div className="hero-bg flex flex-1 items-center justify-center px-4 py-12">
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
              Create an account
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Get started with Shortlink for free
            </p>
          </div>
        </div>

        {message ? (
          /* Success state */
          <div
            className="card scale-in flex flex-col items-center gap-4 p-8 text-center"
            style={{ borderColor: 'var(--success)', boxShadow: 'var(--shadow-md)' }}
          >
            <div
              className="feature-icon"
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--success)', marginBottom: '6px' }}>{message}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Once confirmed, you can{" "}
                <button
                  onClick={() => navigate("/login")}
                  style={{ color: 'var(--accent)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', textDecoration: 'underline' }}
                >
                  sign in
                </button>
                .
              </p>
            </div>
          </div>
        ) : (
          /* Form */
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
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>
          </div>
        )}

        {/* Footer link */}
        <p className="mt-5 text-center" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
