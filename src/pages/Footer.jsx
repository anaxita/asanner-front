import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="pb-4 pt-2 d-flex justify-content-between align-items-center border-top">
      <Link to="/policy" className="text-decoration-none text-dark-emphasis">
        Пользовательское соглашение и политика конфиденциальности
      </Link>
      <p className=" text-dark-emphasis mb-0">© Asanner {new Date().getFullYear()}</p>
      <Link to="mailto:sales@anaxita.ru" className="text-decoration-none text-dark-emphasis">
        sales@anaxita.ru
      </Link>
      <Link to="mailto:support@anaxita.ru" className="text-decoration-none text-dark-emphasis">
        support@anaxita.ru
      </Link>
      <p>Костюченко Александр Дмитриевич. ИНН 232020805114</p>
    </div>
  );
};
