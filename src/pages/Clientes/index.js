import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

import FormFiltros from './components/FormFiltros';
import FormCliente from './components/FormCliente';

import {
  Layout,
  PageHeader,
  Divider,
  Table,
  Button,
  message,
  Drawer,
  Form,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { colunasTabela } from './constants';
const { Content } = Layout;

function Clientes() {
  const [formCliente] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const [filtros, setFiltros] = useState({});
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    total_paginas: 0,
  });

  const buscarClientes = async (
    filter = filtros,
    pagina = paginacao.pagina
  ) => {
    setLoadingClientes(true);
    try {
      const { data } = await axios.get(baseUrl, {
        params: {
          service: 'cliente',
          token: getToken(),
          filter,
          pagina,
        },
      });

      if (filter.id) {
        return data.data[0];
      } else {
        setClientes(() =>
          data.data?.map(
            (
              { codigo, nome_fantasia, cnpj, email, telefone, id_cliente },
              index
            ) => ({
              key: index,
              codigo,
              nome_fantasia,
              cnpj,
              email,
              telefone,
              acoes: {
                id_cliente,
                deletarCliente,
                selecionarClienteEdicao,
              },
            })
          )
        );

        setPaginacao({
          pagina: paginacao.pagina,
          total_paginas: data.paginacao,
        });
      }
    } catch (error) {
      message.error('Não foi possível carregar a lista de clientes!');
      setClientes([]);
    } finally {
      setLoadingClientes(false);
    }
  };

  const filtrar = (values) => {
    setFiltros(values);
    buscarClientes(values, paginacao.pagina);
  };

  const alterarPagina = (current) => {
    setPaginacao({ pagina: current, total_paginas: paginacao.total_paginas });
    buscarClientes(filtros, current);
  };

  const cadastrarCliente = async (values) => {
    setLoadingCadastro(true);

    try {
      await axios.post(baseUrl, {
        service: 'cliente_insert',
        token: getToken(),
        data: values,
      });

      message.success('Cliente cadastrado com sucesso!');
      formCliente.resetFields();
      buscarClientes();
    } catch (error) {
      message.error('Não foi possível cadastrar o cliente!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(false);
    }
  };

  const selecionarClienteEdicao = async (id_cliente) => {
    const cliente = await buscarClientes({ id: id_cliente });
    setClienteSelecionado(cliente);
    setModalCadastro(true);
    formCliente.setFieldsValue(cliente);
  };

  const editarCliente = async (values) => {
    setLoadingCadastro(true);
    const data = { id: clienteSelecionado.id_cliente, ...values };

    try {
      await axios.post(baseUrl, {
        service: 'cliente_update',
        token: getToken(),
        data,
      });

      message.success('Cliente altualizado com sucesso!');
      formCliente.resetFields();
      setClienteSelecionado(null);
      buscarClientes();
    } catch (error) {
      message.error('Não foi possível atualizar o cliente!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(false);
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

      message.success('Cliente deletado com sucesso!');
      buscarClientes();
    } catch (error) {
      message.error('Não foi possível deletar o cliente!');
    } finally {
      setLoadingClientes(false);
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

      <FormFiltros onFinish={filtrar} />

      <Divider />
      {clientes && (
        <Table
          columns={colunasTabela}
          dataSource={[...clientes]}
          loading={loadingClientes}
          pagination={{
            hideOnSinglePage: true,
            size: 2,
            total: paginacao.total_paginas,
            onChange: (current) => {
              alterarPagina(current);
            },
          }}
        />
      )}
      <Drawer
        title={clienteSelecionado ? 'Edição de cliente' : 'Cadastro de cliente'}
        visible={modalCadastro}
        placement="right"
        width="75%"
        onClose={() => setModalCadastro(false)}
      >
        <FormCliente
          form={formCliente}
          cliente={clienteSelecionado}
          cadastrar={cadastrarCliente}
          editar={editarCliente}
          loading={loadingCadastro}
        />
      </Drawer>
    </Content>
  );
}
export default Clientes;
