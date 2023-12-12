import { useAppSelector } from "../../../app/redux/hooks";
import { HaveLogin, NotLogin } from "../../../features/links";

export const Navbar = () => {
  const isLogin = useAppSelector((state) => state.auth.isAuth);

  return (
    <nav>
      <ul className="navbar-links">{isLogin ? <HaveLogin /> : <NotLogin />}</ul>
    </nav>
  );
};
