import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="pb-4 d-flex justify-content-between align-items-center">
      <Link to="/policy" className="text-decoration-none text-dark-emphasis">
        Политика конфиденциальности
      </Link>
      <p className=" text-dark-emphasis mb-0">© Asanner {new Date().getFullYear()}</p>
      <Link to="mailto:sales@site.com" className="text-decoration-none text-dark-emphasis">
        sales@site.com
      </Link>
      <Link to="mailto:support@site.com" className="text-decoration-none text-dark-emphasis">
        support@site.com
      </Link>
    </div>
  );
};
