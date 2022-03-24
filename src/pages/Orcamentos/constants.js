import { Tag, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export const columns = [
  {
    title: 'Nº Orçamento',
    dataIndex: 'numero_orcamento',
    key: 'numero_orcamento',
  },
  {
    title: 'Cliente',
    dataIndex: 'cliente',
    key: 'cliente',
  },
  {
    title: 'Representante',
    dataIndex: 'representante',
    key: 'representante',
  },
  {
    title: 'Representante',
    dataIndex: 'representante',
    key: 'representante',
  },
  {
    title: 'Titulo orçamento',
    dataIndex: 'titulo_orcamento',
    key: 'titulo_orcamento',
  },
  {
    title: 'Data envio',
    dataIndex: 'data_envio',
    key: 'data_envio',
  },
  {
    title: 'Valor proposta',
    dataIndex: 'valor_proposta',
    key: 'valor_proposta',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (tag) => (
      <Tag
        color={
          tag === 'Enviado' ? 'green' : tag === 'Reprovado' ? 'red' : 'geekblue'
        }
        key={tag}
      >
        {tag}
      </Tag>
    ),
  },
  {
    title: 'Forma de aceite',
    dataIndex: 'forma_aceite',
    key: 'forma_aceite',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    width: '15%',
    render: () => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          style={{ marginRight: '10px' }}
          icon={<DeleteOutlined />}
        />
        <Button type="primary" ghost shape="round" icon={<PlusOutlined />}>
          Nova ordem de serviço
        </Button>
      </div>
    ),
  },
];

export const dados_orcamentos = [
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
