import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Layout>
      <Button>Welcome home</Button>
      <Link to="/clientes">Clientes</Link>
    </Layout>
  );
}
export default Home;
