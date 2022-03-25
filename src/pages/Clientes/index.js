import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/auth';
import axios from 'axios';
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

function Clientes() {
  const [form] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [clientes, setClientes] = useState([]);

  const buscarClientes = async () => {
    setLoadingClientes(true);
    try {
      const { data } = await axios.get(
        `http://br52.teste.website/~rodr8946/instaltec/php/server.php?service=cliente&token=${getToken()}`
      );

      setClientes(() =>
        data.map(({ id_client, name, cpf_cnpj, email, phone }) => ({
          key: id_client,
          id_client,
          name,
          cpf_cnpj,
          email,
          phone,
          acoes: {
            id_client,
            deletarCliente,
            gerarOrcamento,
          },
        }))
      );
    } catch (error) {
      message.error('Não foi possível carregar a lista de clientes!');
    } finally {
      setLoadingClientes(false);
    }
  };

  const deletarCliente = async (id_cliente) => {
    try {
      await axios.post(
        'http://br52.teste.website/~rodr8946/instaltec/php/server.php/',
        {
          service: 'cliente_delete',
          token: getToken(),
          id: id_cliente,
        }
      );

      buscarClientes();
      message.success('Cliente deletado com sucesso!');
    } catch (error) {
      message.error('Não foi possível deletar o cliente!');
    }
  };

  const cadastrarCliente = async (values) => {
    const { name, cpf_cnpj, email, phone } = values;

    setLoadingCadastro(true);
    try {
      await axios.post(
        'http://br52.teste.website/~rodr8946/instaltec/php/server.php/',
        {
          service: 'cliente_insert',
          token: getToken(),
          data: {
            name,
            cpf_cnpj,
            email,
            phone,
          },
        }
      );

      buscarClientes();
      form.resetFields();
      setModalCadastro(false);
      message.success('Cliente cadastrado com sucesso!');
    } catch (error) {
      message.error('Não foi possível cadastrar o cliente!');
    } finally {
      setLoadingCadastro(false);
    }
  };

  const gerarOrcamento = (id_cliente) => {
    console.log('gerarOrcamento', id_cliente);
  };

  useEffect(() => {
    buscarClientes();
  }, []);

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
          onFinish={cadastrarCliente}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="name cliente"
            name="name"
            rules={[{ required: true, message: 'Informe o name cliente!' }]}
          >
            <Input placeholder="Digite o name do cliente" />
          </Form.Item>
          <Form.Item
            label="CNPJ/CPF"
            name="cpf_cnpj"
            rules={[
              {
                required: true,
                message: 'Informe o cnpj/cpf do cliente!',
              },
            ]}
          >
            <Input placeholder="Digite o CNPJ/CPF" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Informe o email do cliente!' }]}
          >
            <Input placeholder="Digite o email" />
          </Form.Item>
          <Form.Item
            label="phone"
            name="phone"
            rules={[{ required: true, message: 'Informe o phone do cliente!' }]}
          >
            <Input placeholder="Digite o phone" />
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
