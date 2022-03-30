import { Tag, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export const colunasTabela = [
  {
    title: 'Nº Orçamento',
    dataIndex: 'numero_orcamento',
    key: 'numero_orcamento',
    width: '10%',
    render: () => Math.floor(100000 + Math.random() * 900000),
  },
  {
    title: 'Cliente',
    dataIndex: 'cliente',
    key: 'cliente',
    width: '15%',
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
    filters: [
      {
        text: 'Enviado',
        value: 'Enviado',
      },
      {
        text: 'Reprovado',
        value: 'Reprovado',
      },
      {
        text: 'Revisado',
        value: 'Revisado',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Forma de aceite',
    dataIndex: 'forma_aceite',
    key: 'forma_aceite',
    filters: [
      {
        text: 'Email',
        value: 'Email',
      },
      {
        text: 'Ordem de compra',
        value: 'Ordem de compra',
      },
      {
        text: 'Verbal',
        value: 'Verbal',
      },
    ],
    onFilter: (value, record) => record.forma_aceite.indexOf(value) === 0,
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
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
          Novo pedido
        </Button>
      </div>
    ),
  },
];

export const dados_orcamentos = [
  {
    key: Math.floor(100000 + Math.random() * 900000),
    cliente: 'Cliente A',
    representante: 'Representante A',
    titulo_orcamento: 'Orçamento A',
    data_envio: '16/08/2022',
    valor_proposta: 'R$1000,00',
    status: 'Enviado',
    forma_aceite: 'Email',
  },
];

export const camposFormulario = [
  {
    type: 'text',
    label: 'Código',
    name: 'codigo',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Cliente',
    name: 'cliente',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Local de instalação / Obra',
    name: 'local',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Tarefas',
    name: 'tarefas',
    mode: 'multiple',
    options: [
      { label: 'tarefa1', value: 'tarefa_id_1' },
      { label: 'tarefa2', value: 'tarefa_id_2' },
      { label: 'tarefa3', value: 'tarefa_id_3' },
    ],
  },
  {
    type: 'textArea',
    label: 'Descrição',
    name: 'descricao',
  },

  {
    type: 'text',
    label: 'Prazo começo',
    name: 'prazo_comeco',
    style: {
      display: 'inline-flex',
      width: 'calc(50% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Prazo execução',
    name: 'prazo_execucao',
    style: {
      display: 'inline-flex',
      width: 'calc(50% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Valor R$',
    name: 'valor',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Prazo pagamento',
    name: 'prazo_pagamento',
    mode: 'tags',
    options: [
      { label: 'À vista', value: 'À vista' },
      { label: '15 dias', value: '15 dias' },
      { label: '30 dias', value: '30 dias' },
      { label: '28/42 dias', value: '28/42 dias' },
      { label: '28/56 dias', value: '28/56 dias' },
      { label: '28/28/56/84 dias', value: '28/28/56/84 dias' },
    ],
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Validade',
    name: 'validade',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'textArea',
    label: 'Forma de pagamento',
    name: 'forma_pagamento',
  },
  {
    type: 'textArea',
    label: 'Do inadimplemento',
    name: 'inadimplemento',
  },
];
