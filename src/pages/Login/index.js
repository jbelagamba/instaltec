import React, { useState } from 'react';
import axios from 'axios';

import { Container, Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('rodrigo.bellagamba@gmail.com');
  const [senha, setSenha] = useState('rbm159753');

  const postLogin = async () => {
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
                disabled={loading}
                onClick={() => postLogin()}
              >
                {loading ? 'Carregando…' : 'Entrar'}
              </Button>
            </Form>
          </Card>
        </Row>
      </Container>
    </>
  );
}
export default Login;
