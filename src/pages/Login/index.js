import React, { useState } from 'react';
import axios from 'axios';

import { Form, Input, Button } from 'antd';

function Login() {
  const [loading, setLoading] = useState(false);

  const postLogin = async (values) => {
    console.log('Success:', values);

    const { email, senha } = values;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://br52.teste.website/~rodr8946/instaltec/php/server.php?service=login&email=${email}&password=${senha}`
      );

      sessionStorage.setItem('usuario', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={postLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Informe o email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[{ required: true, message: 'Informe a senha!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Login;
