import { Layout, PageHeader, Divider, Tabs } from 'antd';

const { Content } = Layout;
const { TabPane } = Tabs;

const etapas = [
  {
    id: 1,
    titulo: 'Etapa 1',
    status: 1,
  },
  {
    id: 2,
    titulo: 'Etapa 3',
    status: 2,
  },
  {
    id: 3,
    titulo: 'Etapa 3',
    status: 3,
  },
];

function Pedido() {
  return (
    <Content className="container whiteBox">
      <PageHeader title="Pedido" className="pageHeader" />

      <Divider />

      <Tabs tabPosition="left">
        {etapas.map(({ id, titulo, status }) => (
          <TabPane tab={titulo} key={id}>
            Conteudo {titulo}
          </TabPane>
        ))}
      </Tabs>
    </Content>
  );
}
export default Pedido;
