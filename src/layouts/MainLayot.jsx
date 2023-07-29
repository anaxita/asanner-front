import { Outlet } from 'react-router-dom';

export const MainLayot = () => {
  return (
    <div className="main bg-secondary bg-gradient text-white">
      <div className="container">
          Main page2
        <Outlet />
      </div>
    </div>
  );
};
