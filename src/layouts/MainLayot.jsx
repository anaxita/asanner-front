import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { makeHttpRequest } from '../api/makeHttpRequest';
import { Footer } from '../pages/Footer';
import { Header } from '../pages/Header';

export const MainLayot = () => {
  useEffect(() => {
    makeHttpRequest('GET', '/profile').then((r) => {
      const { data, err } = r;
      if (err) {
        console.log(err);
      } else {
        localStorage.setItem('profile', JSON.stringify(data));
      }
    });
  }, []);

  return (
    <div className="main bg-light">
      <div className="container vh-100 d-flex justify-content-between flex-column">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
