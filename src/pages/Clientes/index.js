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
import { columns, dados_cliente } from './constants';
const { Content } = Layout;

function Clientes() {
  const [form] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [clientes, setClientes] = useState(dados_cliente);

  const onFinish = (values) => {
    setLoadingCadastro(true);

    const dadosCadastrais = {
      ...values,
      key: Math.random(),
    };

    setTimeout(() => {
      setLoadingCadastro(false);
      setLoadingClientes(true);
      form.resetFields();
      setModalCadastro(false);
      message.success('Cliente cadastrado com sucesso!');
    }, 1000);

    setTimeout(() => {
      setClientes((clientes) => [...clientes, dadosCadastrais]);
      setLoadingClientes(false);
    }, 2000);
  };

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Clientes"
        className="pageHeader"
        extra={
          <Button
            type="danger"
            icon={<PlusOutlined />}
            onClick={() => setModalCadastro(true)}
          >
            Cadastrar cliente
          </Button>
        }
      />

      <Divider />

      {clientes && (
        <Table
          columns={columns}
          dataSource={[...clientes]}
          loading={loadingClientes}
        />
      )}

      <Drawer
        title="Cadastro de cliente"
        placement="right"
        onClose={() => setModalCadastro(false)}
        visible={modalCadastro}
        size="large"
      >
        <Form
          form={form}
          name="novoCliente"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Código do cliente"
            name="codigo_cliente"
            rules={[
              { required: true, message: 'Informe o código do cliente!' },
            ]}
          >
            <Input placeholder="Digite o código do cliente" />
          </Form.Item>
          <Form.Item
            label="Nome cliente"
            name="nome"
            rules={[{ required: true, message: 'Informe o nome cliente!' }]}
          >
            <Input placeholder="Digite o nome do cliente" />
          </Form.Item>
          <Form.Item
            label="Representante"
            name="representante"
            rules={[
              {
                required: true,
                message: 'Informe o representante do cliente!',
              },
            ]}
          >
            <Input placeholder="Digite o representante" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Informe o email do cliente!' }]}
          >
            <Input placeholder="Digite o email" />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[
              { required: true, message: 'Informe o telefone do cliente!' },
            ]}
          >
            <Input placeholder="Digite o telefone" />
          </Form.Item>
          <Form.Item>
            <Button type="danger" htmlType="submit" loading={loadingCadastro}>
              Cadastrar cliente
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Content>
  );
}
export default Clientes;
