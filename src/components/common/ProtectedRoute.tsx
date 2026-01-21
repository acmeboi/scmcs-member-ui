import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { ROUTES } from '@/config/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = storage.getToken();

  if (!token) {
    // Redirect to login with return url
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

