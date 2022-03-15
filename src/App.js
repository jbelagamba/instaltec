import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Clientes from './pages/Clientes';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="clientes" element={<Clientes />} />
      </Routes>
    </div>
  );
}
export default App;
