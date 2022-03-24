import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

function Home() {
  return (
    <Content className="container whiteBox">
      <h1>Essa é a home</h1>
      <Link to="/clientes">Clientes</Link>
    </Content>
  );
}
export default Home;
