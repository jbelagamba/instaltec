import { Routes, Route } from 'react-router-dom';
import './index.scss';

import Login from './pages/Login';
import Clientes from './pages/Clientes';

import { PageHeader, Layout } from 'antd';
const { Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <PageHeader className="pageReader" title="Instaltec" />

      <Content className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="clientes" element={<Clientes />} />
        </Routes>
      </Content>

      <Footer>Instaltec @2022</Footer>
    </Layout>
  );
}
export default App;
