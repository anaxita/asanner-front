import { Link } from 'react-router-dom';

import './index.css';

export const Footer = () => {
  return (
    <div className="pb-4 pt-2 d-flex justify-content-between align-items-center border-top">
      <div className="d-flex flex-column">
        <Link to="/policy" className="text-decoration-none text-primary ">
          Политика конфиденциальности
        </Link>
        <Link to="/terms" className="text-decoration-none text-primary">
          Пользовательское соглашение
        </Link>
      </div>
      <div className="d-flex flex-column">
        <Link to="mailto:sales@anaxita.ru" className="text-decoration-none ">
          sales@anaxita.ru
        </Link>
        <Link to="mailto:support@anaxita.ru" className="text-decoration-none">
          support@anaxita.ru
        </Link>
      </div>
      <div className="d-flex flex-column">
        <span>Костюченко Александр Дмитриевич</span>
        <span>ИНН 232020805114</span>
      </div>
    </div>
  );
};
