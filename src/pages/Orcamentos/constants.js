import { Tag } from 'antd';

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
];
