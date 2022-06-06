import { Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';

export const colunasTabela = [
  {
    title: 'Código',
    dataIndex: 'id_cliente',
    key: 'id_cliente',
    width: '10%',
    sorter: (a, b) => a.id_cliente.length - b.id_cliente.length,
  },
  {
    title: 'Razão social',
    dataIndex: 'razao_social',
    width: '25%',
    key: 'razao_social',
    sorter: (a, b) => a.razao_social.length - b.razao_social.length,
  },
  {
    title: 'Nome fantasia',
    dataIndex: 'nome_fantasia',
    width: '25%',
    key: 'nome_fantasia',
    sorter: (a, b) => a.nome_fantasia.length - b.nome_fantasia.length,
  },
  {
    title: 'CNPJ/CPF',
    dataIndex: 'cnpj_cpf',
    key: 'cnpj_cpf',
  },
  {
    title: 'Contato técnico',
    dataIndex: 'tecnico',
    key: 'tecnico',
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
    width: '15%',
    render: ({ id_cliente, selecionarCliente, confirmeExclusaoCliente }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          ghost
          shape="circle"
          icon={<DollarCircleOutlined />}
          onClick={() => selecionarCliente(id_cliente, 'orcamento')}
        />
        <Button
          type="primary"
          ghost
          shape="circle"
          icon={<EditOutlined />}
          style={{ margin: '0 10px' }}
          onClick={() => selecionarCliente(id_cliente, 'edicao')}
        />
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => confirmeExclusaoCliente(id_cliente)}
        />
      </div>
    ),
  },
];

export const camposFormulario = [
  {
    type: 'text',
    label: 'Razão Social',
    name: 'razao_social',
    width: '85%',
  },
  {
    type: 'text',
    label: 'Nome fantasia',
    name: 'nome_fantasia',
    width: '100%',
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
    width: '50%',
  },
  {
    type: 'text',
    label: 'CNPJ/CPF',
    name: 'cnpj_cpf',
    width: '50%',
  },
  {
    type: 'tel',
    label: 'Telefone empresa',
    name: 'telefone',
    width: '50%',
  },
  {
    type: 'email',
    label: 'Email geral',
    name: 'email',
    width: '50%',
  },
  {
    type: 'text',
    label: 'Contato tecnico',
    name: 'tecnico',
    width: '33.333%',
  },
  {
    type: 'tel',
    label: 'Telefone do contato tecnico',
    name: 'tecnico_telefone',
    width: '33.333%',
  },
  {
    type: 'email',
    label: 'Email do contato tecnico',
    name: 'tecnico_email',
    width: '33.333%',
  },
  {
    type: 'text',
    label: 'Contato financeiro:',
    name: 'financeiro',
    width: '33.333%',
  },
  {
    type: 'tel',
    label: 'Telefone do financeiro',
    name: 'financeiro_telefone',
    width: '33.333%',
  },
  {
    type: 'email',
    label: 'Email financeiro',
    name: 'financeiro_email',
    width: '33.333%',
  },
  {
    type: 'number',
    label: 'CEP',
    name: 'cep',
    width: '25%',
  },
  {
    type: 'text',
    label: 'Rua',
    name: 'rua',
    width: '75%',
  },
  {
    type: 'number',
    label: 'Número',
    name: 'numero',
    width: '25%',
  },
  {
    type: 'text',
    label: 'Complemento',
    name: 'complemento',
    width: '75%',
  },
  {
    type: 'text',
    label: 'Bairro',
    name: 'bairro',
    width: '33.333%',
  },
  {
    type: 'select',
    label: 'Cidade',
    name: 'cidade',
    width: '33.333%',
  },
  {
    type: 'select',
    label: 'Estado',
    name: 'estado',
    width: '33.333%',
  },
  {
    type: 'textarea',
    label: 'Observações',
    name: 'observacoes',
    width: '100%',
  },
];

export const camposFiltro = [
  {
    type: 'text',
    label: 'Código',
    name: 'id_cliente',
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
    name: 'cnpj_cpf',
  },
  {
    type: 'text',
    label: 'Cidade',
    name: 'cidade',
  },
];
