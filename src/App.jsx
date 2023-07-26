import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { MainLayot } from './layouts/MainLayot';
import { Login } from './pages/Login';
import { Projects } from './pages/Projects';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayot />}>
        <Route path="login" element={<Login />} />
        <Route path="projects" element={<Projects />} />
      </Route>
    </Routes>
  );
};
