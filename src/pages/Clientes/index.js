import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

function Clientes() {
  return (
    <Content className="container whiteBox">
      <h1>Essa é a pagina de clientes</h1>
      <Link to="/">Home</Link>
    </Content>
  );
}
export default Clientes;
