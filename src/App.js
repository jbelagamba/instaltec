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
import Pedido from './pages/Pedido';

import { Layout } from 'antd';

import { ClientesStorage } from './context/Clientes';
import { TarefasStorage } from './context/Tarefas';

function App() {
  return (
    <Layout className="layout">
      <Header />

      <ClientesStorage>
        <TarefasStorage>
          <Routes>
            {isAuthenticated() ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/tarefas" element={<Tarefas />} />
                <Route path="/orcamentos" element={<Orcamentos />} />
                <Route path="/pedido" element={<Pedido />} />
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </TarefasStorage>
      </ClientesStorage>

      <Footer />
    </Layout>
  );
}
export default App;
