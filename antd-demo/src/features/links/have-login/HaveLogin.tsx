import { notAuth } from "../../../app/redux/authSlice";
import { useAppDispatch } from "../../../app/redux/hooks";
import AuthService from "../../../widgets/forms/api/AuthService";
import { Link } from "react-router-dom";

export const HaveLogin = () => {
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

