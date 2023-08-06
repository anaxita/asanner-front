import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { MainLayot } from './layouts/MainLayot';
import { Login } from './pages/Login';
import { OAuth } from './pages/OAuth';
import { Payment } from './pages/Payment';
import { Pricing } from './pages/Pricing';
import { Project } from './pages/Project';
import { Projects } from './pages/Projects';
import { SuccessfulPayment } from './pages/SuccessfulPayment';
import { UnsuccessfulPayment } from './pages/UnsuccessfulPayment';

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="oauth/callback" element={<OAuth />} />
      <Route path="" element={<Login />} />
      <Route path="/" element={<MainLayot />}>
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<Project />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="payment" element={<Payment />} />
        <Route path="payments/success" element={<SuccessfulPayment />} />
        <Route path="payments/cancel" element={<UnsuccessfulPayment />} />
      </Route>
    </Routes>
  );
};
