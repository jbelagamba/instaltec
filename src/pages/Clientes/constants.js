import { Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export const columns = [
  {
    title: 'Código cliente',
    dataIndex: 'codigo_cliente',
    key: 'codigo_cliente',
    width: '10%',
    render: () => Math.floor(100000 + Math.random() * 900000),
  },
  {
    title: 'Nome cliente',
    dataIndex: 'nome',
    width: '25%',
    key: 'nome',
  },
  {
    title: 'Representante',
    dataIndex: 'representante',
    key: 'representante',
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
          Novo orçamento
        </Button>
      </div>
    ),
  },
];

export const dados_cliente = [
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente A',
    representante: 'Representante do cliente A',
    email: 'clientea@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente B',
    representante: 'Representante do cliente B',
    email: 'clienteb@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente C',
    representante: 'Representante do cliente C',
    email: 'clientec@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente D',
    representante: 'Representante do cliente D',
    email: 'cliented@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente E',
    representante: 'Representante do cliente E',
    email: 'clientee@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente F',
    representante: 'Representante do cliente F',
    email: 'clientef@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente G',
    representante: 'Representante do cliente G',
    email: 'clienteg@gmail.com',
    telefone: '(51) 9999-99999',
  },
  {
    key: Math.floor(100000 + Math.random() * 900000),
    nome: 'Nome cliente H',
    representante: 'Representante do cliente H',
    email: 'clienteh@gmail.com',
    telefone: '(51) 9999-99999',
  },
];
