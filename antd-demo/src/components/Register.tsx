import React from "react";
import { Button, Form, Input } from "antd";
import { createUser } from "../api";

import { useNavigate } from "react-router-dom";
import { UserType } from "../types/user";

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;

  email?: string;
};

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values: Required<FieldType>) => {
    const { email, username, password } = values;

    const res = (await createUser({ email, username, password })) as UserType;

    if (res.email) {
      navigate(`/user/${res.username}`);
    }

    console.log("Success:", values);
  };

  return (
    <>
      <div className="title">Регистрация</div>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите свой адрес электронной почты!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Имя пользователя"
            name="username"
            // labelCol={{ offset: 8, span: 16 }}
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
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
