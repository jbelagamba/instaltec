import { Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import './index.scss';

import Login from './pages/Login';
import Home from './pages/Home';
import Clientes from './pages/Clientes';

import { PageHeader, Layout } from 'antd';
const { Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <PageHeader className="pageReader" title="Instaltec" />

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
