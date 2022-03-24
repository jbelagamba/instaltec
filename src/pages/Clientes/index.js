import { Layout, PageHeader, Divider, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from './constants';
const { Content } = Layout;

function Clientes() {
  const data = [
    {
      key: '1',
      codigo_cliente: 10,
      nome: 'Nome cliente A',
      representante: 'Representante do cliente A',
      email: 'clientea@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '2',
      codigo_cliente: 20,
      nome: 'Nome cliente B',
      representante: 'Representante do cliente B',
      email: 'clienteb@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '3',
      codigo_cliente: 30,
      nome: 'Nome cliente C',
      representante: 'Representante do cliente C',
      email: 'clientec@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '4',
      codigo_cliente: 40,
      nome: 'Nome cliente D',
      representante: 'Representante do cliente D',
      email: 'cliented@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '5',
      codigo_cliente: 50,
      nome: 'Nome cliente E',
      representante: 'Representante do cliente E',
      email: 'clientee@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '6',
      codigo_cliente: 60,
      nome: 'Nome cliente F',
      representante: 'Representante do cliente F',
      email: 'clientef@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '7',
      codigo_cliente: 70,
      nome: 'Nome cliente G',
      representante: 'Representante do cliente G',
      email: 'clienteg@gmail.com',
      telefone: '(51) 9999-99999',
    },
    {
      key: '8',
      codigo_cliente: 80,
      nome: 'Nome cliente H',
      representante: 'Representante do cliente H',
      email: 'clienteh@gmail.com',
      telefone: '(51) 9999-99999',
    },
  ];

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Clientes"
        className="pageHeader"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Cadastrar cliente
          </Button>
        }
      />

      <Divider />

      <Table columns={columns} dataSource={data} />
    </Content>
  );
}
export default Clientes;
