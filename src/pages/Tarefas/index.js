import React, { useState } from 'react';
import {
  Layout,
  PageHeader,
  Divider,
  Table,
  Button,
  Form,
  Input,
  message,
  Drawer,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from './constants';
const { Content } = Layout;

function Tarefas() {
  const [form] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingTarefas, setLoadingTarefas] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [tarefas, setTarefas] = useState([]);

  const deletarTarefa = (id_tarefa) => {
    setTarefas((tarefas) =>
      tarefas.filter((tarefa) => tarefa.codigo_tarefa !== id_tarefa)
    );
  };

  const cadastrarTarefa = (values) => {
    setLoadingCadastro(true);

    const dadosCadastrais = {
      ...values,
      acoes: {
        id: values.codigo_tarefa,
        deletarTarefa,
      },
    };

    setTimeout(() => {
      setLoadingCadastro(false);
      setLoadingTarefas(true);
      form.resetFields();
      setModalCadastro(false);
      message.success('Tarefa cadastrada com sucesso!');
    }, 1000);

    setTimeout(() => {
      setTarefas((tarefas) => [...tarefas, dadosCadastrais]);
      setLoadingTarefas(false);
    }, 2000);
  };

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Tarefas"
        className="pageHeader"
        extra={
          <Button
            type="danger"
            icon={<PlusOutlined />}
            onClick={() => setModalCadastro(true)}
          >
            Cadastrar tarefa
          </Button>
        }
      />

      <Divider />

      {tarefas && (
        <Table
          columns={columns}
          dataSource={[...tarefas]}
          loading={loadingTarefas}
        />
      )}

      <Drawer
        title="Cadastro de tarefa"
        placement="right"
        onClose={() => setModalCadastro(false)}
        visible={modalCadastro}
        size="large"
      >
        <Form
          form={form}
          name="novoTarefa"
          onFinish={cadastrarTarefa}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Código tarefa"
            name="codigo_tarefa"
            rules={[{ required: true, message: 'Informe o código da tarefa!' }]}
          >
            <Input placeholder="Digite o código da tarefa" />
          </Form.Item>
          <Form.Item
            label="Título"
            name="titulo"
            rules={[
              {
                required: true,
                message: 'Informe o titulo da tarefa!',
              },
            ]}
          >
            <Input placeholder="Digite o titulo" />
          </Form.Item>
          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[
              { required: true, message: 'Informe a descrição da tarefa!' },
            ]}
          >
            <Input placeholder="Digite a descrição" />
          </Form.Item>
          <Form.Item>
            <Button type="danger" htmlType="submit" loading={loadingCadastro}>
              Cadastrar tarefa
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Content>
  );
}
export default Tarefas;
