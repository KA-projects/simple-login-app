import { Link } from "react-router-dom";
import AuthService from "../api/services/AuthService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { notAuth } from "../redux/authSlice";

const HaveLogin = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      dispatch(notAuth());
      await AuthService.logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <li onClick={logout}>
        <Link to={`/login`}>Выйти</Link>
      </li>
    </>
  );
};

const NotLogin = () => {
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

const Navbar = () => {
  const isLogin = useAppSelector((state) => state.auth.isAuth);

  return (
    <nav>
      <ul className="navbar-links">{isLogin ? <HaveLogin /> : <NotLogin />}</ul>
    </nav>
  );
};

export default Navbar;
