import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Clientes() {
  console.log('rota de clidente');
  return (
    <>
      <Button>Welcome Clientes</Button>
      <Link to="/">Login</Link>
    </>
  );
}
export default Clientes;
