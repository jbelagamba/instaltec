import { Layout, PageHeader, Divider, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from './constants';
const { Content } = Layout;

function Clientes() {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
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
