import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Button>Welcome home</Button>
      <Link to="/clientes">Clientes</Link>
    </>
  );
}
export default Home;
