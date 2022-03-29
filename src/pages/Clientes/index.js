import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

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
  Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { colunasTabela, camposFormulario } from './constants';
const { Content } = Layout;
const { Option } = Select;

function Clientes() {
  const [form] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});

  const buscarClientes = async (id_cliente) => {
    setLoadingClientes(true);
    try {
      const { data } = await axios.post(baseUrl, {
        service: 'cliente_insert',
        token: getToken(),
        id: id_cliente,
      });

      if (id_cliente) {
        return data;
      } else {
        if (data)
          setClientes(() =>
            data?.map(({ id_cliente, nome, cnpj, email, telefone }, index) => ({
              key: index,
              id_cliente,
              nome,
              cnpj,
              email,
              telefone,
              acoes: {
                id_cliente,
                deletarCliente,
                selecionarClienteEdicao,
              },
            }))
          );
      }
    } catch (error) {
      message.error('Não foi possível carregar a lista de clientes!');
    } finally {
      setLoadingClientes(false);
    }
  };

  const cadastrarCliente = async (values) => {
    setLoadingCadastro(true);
    try {
      await axios.post(baseUrl, {
        service: 'cliente_insert',
        token: getToken(),
        data: values,
      });

      message.error('Cliente cadastrado com sucesso!');
      form.setFieldsValue();
    } catch (error) {
      message.error('Não foi possível cadastrar o cliente!');
    } finally {
      setLoadingCadastro(false);
    }
  };

  const deletarCliente = async (id_cliente) => {
    setLoadingClientes(true);
    try {
      await axios.post(baseUrl, {
        service: 'cliente_delete',
        token: getToken(),
        id: id_cliente,
      });

      buscarClientes();
      message.success('Cliente deletado com sucesso!');
    } catch (error) {
      message.error('Não foi possível deletar o cliente!');
    } finally {
      setLoadingClientes(false);
    }
  };

  const selecionarClienteEdicao = async (id_cliente) => {
    const cliente = await buscarClientes(id_cliente);
    setClienteSelecionado({ id: id_cliente, ...cliente });
    setModalCadastro(true);
    form.setFieldsValue(cliente);
  };

  const editarCliente = async (values) => {
    setLoadingCadastro(true);

    try {
      await axios.post(baseUrl, {
        service: 'cliente_update',
        token: getToken(),
        id: clienteSelecionado.id,
        data: values,
      });

      message.error('Cliente cadastrado com sucesso!');
      form.setFieldsValue();
    } catch (error) {
      message.error('Não foi possível cadastrar o cliente!');
    } finally {
      setLoadingCadastro(false);
    }
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
          columns={colunasTabela}
          dataSource={[...clientes]}
          loading={loadingClientes}
        />
      )}

      <Drawer
        title={clienteSelecionado ? 'Edição de cliente' : 'Cadastro de cliente'}
        placement="right"
        onClose={() => setModalCadastro(false)}
        visible={modalCadastro}
        width="75%"
      >
        <Form
          form={form}
          name="novoCliente"
          onFinish={clienteSelecionado ? cadastrarCliente : editarCliente}
          layout="vertical"
        >
          {camposFormulario.map(({ type, label, name, options }, index) => (
            <Form.Item
              key={index}
              label={label}
              name={name}
              rules={[{ required: true, message: 'Campo obrigatório' }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 10px)',
                margin: '5px',
              }}
            >
              {type === 'select' ? (
                <Select placeholder="Selecione">
                  {options.map(({ label, value }, index) => (
                    <Option value={value} key={index}>
                      {label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input placeholder={label} />
              )}
            </Form.Item>
          ))}

          <Divider />

          <Form.Item style={{ width: '100%', margin: '5px' }}>
            <Button type="danger" htmlType="submit" loading={loadingCadastro}>
              {clienteSelecionado ? 'Salvar alterações' : 'Cadastrar cliente'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Content>
  );
}
export default Clientes;
