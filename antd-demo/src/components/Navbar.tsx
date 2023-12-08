import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-links">
        <li>
          <Link to={`/`}>Регистрация</Link>
        </li>
        <li>
          <Link to={`/login`}>Вход</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
