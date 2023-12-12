import { RegisterForm } from "../../../widgets/forms/ui/RegisterForm";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const Register = () => {
  useCheckAuth();

  return (
    <>
      <div className="title">Регистрация</div>
      <div className="login-container">
        <RegisterForm />
      </div>
    </>
  );
};
