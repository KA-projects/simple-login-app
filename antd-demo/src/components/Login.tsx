import React from "react";
import { Button, Form, Input } from "antd";
import { getUser } from "../api";

import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: Required<FieldType>) => {
    const { username } = values;

    const res = await getUser(username);

    if (res) {
    
      navigate(`/user/${res.username}`);
    }
    console.log("Success:", values);
  };

  return (
    <>
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
            name="username"
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
