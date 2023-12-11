import React from "react";
import { Button, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";
import { RegisterUserType } from "../types";
import AuthService from "../api/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useCheckAuth } from "../utils/useCheckAuth";
import { haveAuth } from "../redux/authSlice";
import { useAppDispatch } from "../redux/hooks";
import axios from "axios";

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  useCheckAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 6,
    });
  };

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
            console.log(error);

            const errorMessage = error.response?.data as string;
            const startIndex = errorMessage.match(/Error:/)?.index;
            const endIndex = errorMessage.match(/<br>/)?.index;
           

            if (startIndex && endIndex) {
              const filteredMsg = errorMessage
                .slice(startIndex + 6, endIndex)
                .trim();
              

              warning(filteredMsg);
            }
          }
        },
      }
    );
  };

  return (
    <>
      {contextHolder}
      <div className="title">Вход</div>
      <div className="login-container">
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
            label="Имя пользователя"
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
      </div>
    </>
  );
};

export default Login;
