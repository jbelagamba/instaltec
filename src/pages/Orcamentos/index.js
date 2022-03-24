import { Layout, PageHeader, Divider, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from './constants';
const { Content } = Layout;

function Orcamentos() {
  const data = [
    {
      key: '1',
      numero_orcamento: 10,
      cliente: 'Cliente A',
      representante: 'Representante A',
      titulo_orcamento: 'Orçamento A',
      data_envio: '16/08/2022',
      valor_proposta: 'R$1000,00',
      status: 'Enviado',
      forma_aceite: 'Email',
    },
    {
      key: '2',
      numero_orcamento: 20,
      cliente: 'Cliente A',
      representante: 'Representante B',
      titulo_orcamento: 'Orçamento B',
      data_envio: '16/08/2022',
      valor_proposta: 'R$2000,00',
      status: 'Reprovado',
      forma_aceite: 'Ordem de compra',
    },
    {
      key: '3',
      numero_orcamento: 30,
      cliente: 'Cliente C',
      representante: 'Representante C',
      titulo_orcamento: 'Orçamento C',
      data_envio: '16/08/2022',
      valor_proposta: 'R$3000,00',
      status: 'Revisado',
      forma_aceite: 'Verbal',
    },
    {
      key: '4',
      numero_orcamento: 10,
      cliente: 'Cliente A',
      representante: 'Representante A',
      titulo_orcamento: 'Orçamento A',
      data_envio: '16/08/2022',
      valor_proposta: 'R$1000,00',
      status: 'Enviado',
      forma_aceite: 'Email',
    },
    {
      key: '5',
      numero_orcamento: 20,
      cliente: 'Cliente A',
      representante: 'Representante B',
      titulo_orcamento: 'Orçamento B',
      data_envio: '16/08/2022',
      valor_proposta: 'R$2000,00',
      status: 'Reprovado',
      forma_aceite: 'Ordem de compra',
    },
    {
      key: '6',
      numero_orcamento: 30,
      cliente: 'Cliente C',
      representante: 'Representante C',
      titulo_orcamento: 'Orçamento C',
      data_envio: '16/08/2022',
      valor_proposta: 'R$3000,00',
      status: 'Revisado',
      forma_aceite: 'Verbal',
    },
    {
      key: '7',
      numero_orcamento: 10,
      cliente: 'Cliente A',
      representante: 'Representante A',
      titulo_orcamento: 'Orçamento A',
      data_envio: '16/08/2022',
      valor_proposta: 'R$1000,00',
      status: 'Enviado',
      forma_aceite: 'Email',
    },
    {
      key: '8',
      numero_orcamento: 20,
      cliente: 'Cliente A',
      representante: 'Representante B',
      titulo_orcamento: 'Orçamento B',
      data_envio: '16/08/2022',
      valor_proposta: 'R$2000,00',
      status: 'Reprovado',
      forma_aceite: 'Ordem de compra',
    },
    {
      key: '9',
      numero_orcamento: 30,
      cliente: 'Cliente C',
      representante: 'Representante C',
      titulo_orcamento: 'Orçamento C',
      data_envio: '16/08/2022',
      valor_proposta: 'R$3000,00',
      status: 'Revisado',
      forma_aceite: 'Verbal',
    },
  ];

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Orçamentos"
        className="pageHeader"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Cadastrar orçamento
          </Button>
        }
      />

      <Divider />

      <Table columns={columns} dataSource={data} />
    </Content>
  );
}
export default Orcamentos;
