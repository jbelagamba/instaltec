import { Routes, Route, Link } from 'react-router-dom';
import { isAuthenticated, logout } from './services/auth';
import './index.scss';

import Login from './pages/Login';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import {
  UserOutlined,
  HomeOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import { PageHeader, Layout, Button, Menu } from 'antd';
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

      {isAuthenticated() && (
        <Menu mode="horizontal" defaultSelectedKeys="home">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="clientes" icon={<ContactsOutlined />}>
            <Link to="/clientes">Clientes</Link>
          </Menu.Item>
        </Menu>
      )}

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
