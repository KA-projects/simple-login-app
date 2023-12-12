import { LoginForm } from "../../../widgets/forms/ui/LoginForm";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const Login = () => {
  useCheckAuth();

  return (
    <>
      <div className="title">Вход</div>
      <div className="login-container">
        <LoginForm />
      </div>
    </>
  );
};
