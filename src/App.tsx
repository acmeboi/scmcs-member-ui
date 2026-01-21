import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config/routes';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Lazy load views
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Login = lazy(() => import('./views/auth/Login'));
const SignUp = lazy(() => import('./views/auth/SignUp'));
const PasswordReset = lazy(() => import('./views/auth/PasswordReset'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));
const Loans = lazy(() => import('./views/dashboard/Loans'));
const Deductions = lazy(() => import('./views/dashboard/Deductions'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
          
          {/* Protected routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.LOANS}
            element={
              <ProtectedRoute>
                <Loans />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DEDUCTIONS}
            element={
              <ProtectedRoute>
                <Deductions />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
