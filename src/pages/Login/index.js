import React, { useState } from 'react';
import axios from 'axios';

import { Container, Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const postLogin = () => {
    axios
      .post('/teste/login', {
        email: email,
        senha: senha,
      })
      .then((response) => {
        console.log(email, senha);
        sessionStorage.setItem('tokenLogin', response.token);
      })
      .catch((error) => {
        console.log('deu ruim', error);
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Card className="w-50 shadow-lg p-3 mb-5 bg-white rounded">
            <Form>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginSenha">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => postLogin()}
              >
                Entrar
              </Button>
            </Form>
          </Card>
        </Row>
      </Container>
    </>
  );
}
export default Login;
