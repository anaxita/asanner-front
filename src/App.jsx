import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { RequireAuth } from './components/RequireAuth';
import { MainLayot } from './layouts/MainLayot';
import { Login } from './pages/Login';
import { OAuth } from './pages/OAuth';
import { Payment } from './pages/Payment';
import { Policy } from './pages/Policy';
import { Pricing } from './pages/Pricing';
import { Project } from './pages/projects/Project';
import { Projects } from './pages/projects/Projects';
import { SuccessfulPayment } from './pages/SuccessfulPayment';
import { Support } from './pages/Support';
import { Terms } from './pages/Terms';
import { UnsuccessfulPayment } from './pages/UnsuccessfulPayment';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token && (location.pathname === '/login' || location.pathname === '/')) {
      navigate('/projects', { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="oauth/callback" element={<OAuth />} />
      <Route path="" element={<Login />} />
      <Route path="/" element={<MainLayot />}>
        <Route
          path="projects"
          element={
            <RequireAuth>
              <Projects />
            </RequireAuth>
          }
        />
        <Route
          path="projects/:id"
          element={
            <RequireAuth>
              <Project />
            </RequireAuth>
          }
        />
        <Route path="pricing" element={<Pricing />} />
        <Route
          path="payment"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path="payments/success"
          element={
            <RequireAuth>
              <SuccessfulPayment />
            </RequireAuth>
          }
        />
        <Route
          path="payments/cancel"
          element={
            <RequireAuth>
              <UnsuccessfulPayment />
            </RequireAuth>
          }
        />
        <Route path="policy" element={<Policy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="support" element={<Support />} />
      </Route>
    </Routes>
  );
};
