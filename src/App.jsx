import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { MainLayot } from './layouts/MainLayot';
import { Header } from './pages/Header';
import { Login } from './pages/Login';
import { OAuth } from './pages/OAuth';
import { Payment } from './pages/Payment';
import { Pricing } from './pages/Pricing';
import { Project } from './pages/Project';
import { Projects } from './pages/Projects';

export const App = () => {
  return (
    <Routes>
      {/*<Route path="/" element={<MainLayot/>}/>*/}
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="oauth/callback" element={<OAuth />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:id" element={<Project />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="payment" element={<Payment />} />
    </Routes>
  );
};
