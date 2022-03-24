import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const columns = [
  {
    title: 'Código tarefa',
    dataIndex: 'codigo_tarefa',
    key: 'codigo_tarefa',
    width: '10%',
  },
  {
    title: 'Título',
    dataIndex: 'titulo',
    key: 'titulo',
    width: '25%',
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
    render: ({ id, deletarTarefa }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          style={{ marginRight: '10px' }}
          icon={<DeleteOutlined />}
          onClick={() => deletarTarefa(id)}
        />
      </div>
    ),
  },
];
