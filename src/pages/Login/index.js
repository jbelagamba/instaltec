import React, { useState } from 'react';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Layout, Avatar, Form, Input, Button } from 'antd';
const { Content } = Layout;

function Login() {
  const [loading, setLoading] = useState(false);

  const postLogin = async (values) => {
    const { email, senha } = values;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://br52.teste.website/~rodr8946/instaltec/php/server.php?service=login&email=${email}&password=${senha}`
      );

      sessionStorage.setItem('usuario', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content className="container">
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={postLogin}
        className="whiteBox formLogin"
      >
        <Avatar size={100} icon={<UserOutlined />} className="avatar" />
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Informe o email!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Digite seu email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[{ required: true, message: 'Informe a senha!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Digite sua senha"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
export default Login;
