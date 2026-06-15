import { useEffect, useState } from "react";
import "./App.css";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Dashboard } from "./Pages/Dashboard";
import { LinkStats } from "./Pages/LinkStats";
import { Main } from "./Pages/Main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { NotFound } from "./Pages/NotFound";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner" style={{ width: '24px', height: '24px' }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/links/:id/stats"
          element={
            <ProtectedRoute user={user}>
              <LinkStats />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
