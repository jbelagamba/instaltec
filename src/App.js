import { Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import './index.scss';

import Login from './pages/Login';
import Clientes from './pages/Clientes';

import { PageHeader, Layout } from 'antd';
const { Footer } = Layout;

console.log('isAuthenticated()', isAuthenticated());

function App() {
  return (
    <Layout className="layout">
      <PageHeader className="pageReader" title="Instaltec" />

      <Routes>
        {isAuthenticated() ? (
          <Route path="/" element={<Clientes />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>

      <Footer>Instaltec @2022</Footer>
    </Layout>
  );
}
export default App;
