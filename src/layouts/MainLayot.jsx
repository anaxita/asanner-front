import { Outlet } from 'react-router-dom';

import { Footer } from '../pages/Footer';
import { Header } from '../pages/Header';

export const MainLayot = () => {
  return (
    <div className="main">
      <div className="container vh-100 d-flex justify-content-between flex-column">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
