import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

function Clientes() {
  return (
    <Layout>
      <Button>Welcome Clientes</Button>
      <Link to="/">Home</Link>
    </Layout>
  );
}
export default Clientes;
