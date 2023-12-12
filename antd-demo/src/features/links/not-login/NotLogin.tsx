import { Link } from "react-router-dom";

export const NotLogin = () => {
  return (
    <>
      <li>
        <Link to={`/`}>Регистрация</Link>
      </li>
      <li>
        <Link to={`/login`}>Вход</Link>
      </li>
    </>
  );
};
