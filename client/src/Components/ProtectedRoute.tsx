import { Navigate } from 'react-router';
import type { User } from '@supabase/supabase-js';

export function ProtectedRoute({ user, children }: { user: User | null; children: React.ReactNode }) {
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
