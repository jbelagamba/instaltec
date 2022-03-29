import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const colunasTabela = [
  {
    title: 'Código cliente',
    dataIndex: 'id_cliente',
    key: 'id_cliente',
    width: '10%',
  },
  {
    title: 'Nome fantasia',
    dataIndex: 'nome_fantasia',
    width: '25%',
    key: 'nome_fantasia',
  },
  {
    title: 'CNPJ/CPF',
    dataIndex: 'cnpj',
    key: 'cnpj',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
    key: 'telefone',
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
    width: '15%',
    render: ({ id_cliente, deletarCliente, selecionarClienteEdicao }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          style={{ marginRight: '10px' }}
          icon={<DeleteOutlined />}
          onClick={() => deletarCliente(id_cliente)}
        />
        <Button
          type="primary"
          ghost
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => selecionarClienteEdicao(id_cliente)}
        />
      </div>
    ),
  },
];

export const camposFormulario = [
  {
    type: 'number',
    label: 'Código',
    name: 'codigo',
  },
  {
    type: 'select',
    label: 'Tipo cliente',
    name: 'tipo',
    options: [
      { label: 'Industria', value: 1 },
      { label: 'EAS', value: 2 },
      { label: 'Laboratório', value: 3 },
    ],
  },
  {
    type: 'text',
    label: 'Razão Social',
    name: 'razao_social',
  },
  {
    type: 'text',
    label: 'Nome fantasia',
    name: 'nome_fantasia',
  },
  {
    type: 'number',
    label: 'CNPJ/CPF',
    name: 'cnpj',
  },
  {
    type: 'text',
    label: 'Endereço',
    name: 'endereco',
  },
  {
    type: 'tel',
    label: 'Telefone empresa',
    name: 'telefone',
  },
  {
    type: 'text',
    label: 'Contato tecnico',
    name: 'tecnico',
  },
  {
    type: 'tel',
    label: 'Telefone do contato tecnico',
    name: 'tecnico_telefone',
  },
  {
    type: 'email',
    label: 'Email geral',
    name: 'email',
  },
  {
    type: 'email',
    label: 'Email do contato tecnico',
    name: 'tecnico_email',
  },
  {
    type: 'text',
    label: 'Contato financeiro:',
    name: 'financeiro',
  },
  {
    type: 'tel',
    label: 'Telefone do financeiro',
    name: 'financeiro_telefone',
  },
  {
    type: 'email',
    label: 'Email financeiro',
    name: 'financeiro_email',
  },
];

export const camposFiltro = [
  {
    type: 'text',
    label: 'Código',
    name: 'codigo',
  },
  {
    type: 'select',
    label: 'Tipo',
    name: 'tipo',
    options: [
      { label: 'Industria', value: 1 },
      { label: 'EAS', value: 2 },
      { label: 'Laboratório', value: 3 },
    ],
  },
  {
    type: 'text',
    label: 'Razão Social',
    name: 'razao_social',
  },
  {
    type: 'text',
    label: 'Nome fantasia',
    name: 'nome_fantasia',
  },
  {
    type: 'text',
    label: 'CNPJ/CPF',
    name: 'cnpj',
  },
  {
    type: 'text',
    label: 'Endereço',
    name: 'endereco',
  },
];
