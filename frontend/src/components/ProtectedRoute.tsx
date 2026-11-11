import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ROLE_HIERARCHY: Record<string, number> = {
  ADMIN_PRINCIPAL: 4,
  ADMIN: 3,
  ENCARGADO: 2,
  RESIDENT: 1,
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userLevel = ROLE_HIERARCHY[user.role] ?? 0;
    const minLevel = Math.min(...allowedRoles.map((r) => ROLE_HIERARCHY[r] ?? 0));
    if (userLevel < minLevel) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
