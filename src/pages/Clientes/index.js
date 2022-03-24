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

  const deletarCliente = (id_cliente) => {
    setClientes((clientes) =>
      clientes.filter((cliente) => cliente.codigo_cliente !== id_cliente)
    );
  };

  const gerarOrcamento = (id_cliente) => {
    console.log('gerarOrcamento', id_cliente);
  };

  const cadastrarCliente = (values) => {
    setLoadingCadastro(true);
    const id = Math.floor(100000 + Math.random() * 900000);

    const dadosCadastrais = {
      ...values,
      key: id,
      codigo_cliente: id,
      acoes: {
        id,
        deletarCliente,
        gerarOrcamento,
      },
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

  const getClientes = async () => {
    setLoadingClientes(true);
    try {
      const { data } = await axios.get(
        `http://br52.teste.website/~rodr8946/instaltec/php/server.php?service=cliente&token=${getToken()}`
      );

      setClientes(() =>
        data.map(({ id_client, name, cpf_cnpj, email, phone }) => ({
          key: id_client,
          codigo_cliente: id_client,
          nome: name,
          cnpj_cpf: cpf_cnpj,
          email: email,
          telefone: phone,
          acoes: {
            id: id_client,
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

  useEffect(() => {
    getClientes();
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
            label="Nome cliente"
            name="nome"
            rules={[{ required: true, message: 'Informe o nome cliente!' }]}
          >
            <Input placeholder="Digite o nome do cliente" />
          </Form.Item>
          <Form.Item
            label="CNPJ/CPF"
            name="cnpj_cpf"
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
