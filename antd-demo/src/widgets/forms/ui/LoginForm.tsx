import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/redux/hooks";
import { useMutation } from "@tanstack/react-query";
import {
  BackendError,
  FieldType,
  RegisterUserType,
} from "../../../pages/auth/types";
import AuthService from "../api/AuthService";
import { haveAuth } from "../../../app/redux/authSlice";
import axios from "axios";
import { warning } from "../../../features/message/warning";

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation({
    mutationFn: ({ email, password }: Omit<RegisterUserType, "username">) =>
      AuthService.login(email, password),
  });

  const onFinish = async (values: Required<FieldType>) => {
    const { email, password } = values;

    mutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.data.accessToken);
          dispatch(haveAuth());
          navigate(`/user/${response.data.user.username}`);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data as BackendError;

            warning(errorMessage.message, messageApi);
          }
        },
      }
    );
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 420, width: "100%" }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите имя пользователя!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Пожалуйста, придумайте свой пароль!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
