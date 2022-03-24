import { Routes, Route } from 'react-router-dom';
import { isAuthenticated, logout } from './services/auth';
import './index.scss';

import Login from './pages/Login';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import { UserOutlined } from '@ant-design/icons';

import { PageHeader, Layout, Button } from 'antd';
const { Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <PageHeader
        title="Instaltec"
        className="pageReader"
        extra={
          isAuthenticated() && (
            <Button onClick={() => logout()}>
              <UserOutlined /> Sair
            </Button>
          )
        }
      />

      <Routes>
        {isAuthenticated() ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>

      <Footer>Instaltec @2022</Footer>
    </Layout>
  );
}
export default App;
