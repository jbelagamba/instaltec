import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const colunasTabela = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    width: '10%',
    sorter: (a, b) => a.codigo.length - b.codigo.length,
  },
  {
    title: 'Título',
    dataIndex: 'titulo',
    width: '25%',
    key: 'titulo',
    sorter: (a, b) => a.titulo.length - b.titulo.length,
  },
  {
    title: 'Natureza',
    dataIndex: 'tipo',
    key: 'tipo',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
    width: '15%',
    render: ({ id_servico, selecionarTarefa, confirmeExclusaoTarefa }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          ghost
          shape="circle"
          icon={<EditOutlined />}
          style={{ margin: '0 10px' }}
          onClick={() => selecionarTarefa(id_servico, 'edicao')}
        />
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => confirmeExclusaoTarefa(id_servico)}
        />
      </div>
    ),
  },
];

export const camposFormulario = [
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
      { label: 'tipo1', value: 1 },
      { label: 'tipo2', value: 2 },
      { label: 'tipo3', value: 3 },
    ],
  },
  {
    type: 'text',
    label: 'titulo',
    name: 'titulo',
  },
  {
    type: 'textArea',
    label: 'descricao',
    name: 'descricao',
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
      { label: 'tipo1', value: 1 },
      { label: 'tipo2', value: 2 },
      { label: 'tipo3', value: 3 },
    ],
  },
  {
    type: 'text',
    label: 'titulo',
    name: 'titulo',
  },
];
