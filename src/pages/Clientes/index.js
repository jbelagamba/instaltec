import React, { useState } from 'react';
import {
  Layout,
  PageHeader,
  Divider,
  Table,
  Button,
  Modal,
  Form,
  Input,
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

    setTimeout(() => {
      setLoadingCadastro(false);
      setLoadingClientes(true);
      form.resetFields();
      setModalCadastro(false);
    }, 1000);

    setTimeout(() => {
      var novallista = clientes;
      novallista.push(values);
      setClientes(() => novallista);
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
            type="primary"
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

      <Modal
        title="Cadastro de cliente"
        visible={modalCadastro}
        footer={false}
        onCancel={() => setModalCadastro(false)}
      >
        <Form
          form={form}
          name="novoCliente"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="key"
            name="key"
            rules={[{ required: true, message: 'Informe o key!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Código cliente"
            name="codigo_cliente"
            rules={[{ required: true, message: 'Informe o Nome cliente!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nome cliente"
            name="nome"
            rules={[{ required: true, message: 'Informe o Nome cliente!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Representante"
            name="representante"
            rules={[{ required: true, message: 'Informe o Representante!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Informe o Email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[{ required: true, message: 'Informe o Telefone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loadingCadastro}>
              Cadastrar cliente
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
export default Clientes;
