import { Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import './index.scss';

import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/Login';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Tarefas from './pages/Tarefas';
import Orcamentos from './pages/Orcamentos';

import { Layout } from 'antd';

function App() {
  return (
    <Layout className="layout">
      <Header />

      <Routes>
        {isAuthenticated() ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/orcamentos" element={<Orcamentos />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>

      <Footer />
    </Layout>
  );
}
export default App;
