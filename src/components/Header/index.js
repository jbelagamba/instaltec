import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/auth';

import logo from '../../images/logo.jpg';

import {
  UserOutlined,
  HomeOutlined,
  ContactsOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import { PageHeader, Button, Menu } from 'antd';

function Header() {
  return (
    <>
      <PageHeader
        title={<img src={logo} width="200" />}
        className="header"
        extra={
          isAuthenticated() && (
            <Button danger type="text" onClick={() => logout()}>
              <UserOutlined /> Sair
            </Button>
          )
        }
      />

      {isAuthenticated() && (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={window.location.pathname}
          className="menuPrincipal"
        >
          <Menu.Item key="/" icon={<HomeOutlined />} type="danger">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/clientes" icon={<ContactsOutlined />}>
            <Link to="/clientes">Clientes</Link>
          </Menu.Item>
          {/*<Menu.Item key="/tarefas" icon={<CheckCircleOutlined />}>
            <Link to="/tarefas">Tarefas</Link>
          </Menu.Item>
          <Menu.Item key="/orcamentos" icon={<DollarCircleOutlined />}>
            <Link to="/orcamentos">Orçamentos</Link>
          </Menu.Item>
          <Menu.Item key="/pedido" icon={<DollarCircleOutlined />}>
            <Link to="/pedido">Pedido</Link>
          </Menu.Item>*/}
        </Menu>
      )}
    </>
  );
}
export default Header;
