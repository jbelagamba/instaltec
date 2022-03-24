import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export const columns = [
  {
    title: 'Código cliente',
    dataIndex: 'codigo_cliente',
    key: 'codigo_cliente',
    width: '10%',
  },
  {
    title: 'Nome cliente',
    dataIndex: 'nome',
    width: '25%',
    key: 'nome',
  },
  {
    title: 'CNPJ/CPF',
    dataIndex: 'cnpj_cpf',
    key: 'cnpj_cpf',
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
    render: ({ id, deletarCliente, gerarOrcamento }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          style={{ marginRight: '10px' }}
          icon={<DeleteOutlined />}
          onClick={() => deletarCliente(id)}
        />
        <Button
          type="primary"
          ghost
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => gerarOrcamento(id)}
        >
          Novo orçamento
        </Button>
      </div>
    ),
  },
];
