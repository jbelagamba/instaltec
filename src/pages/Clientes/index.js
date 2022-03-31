import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

import FormFiltros from './components/FormFiltros';
import FormCliente from './components/FormCliente';
import FormOrcamento from '../Orcamentos/components/FormOrcamento';
import { ClienteContext } from '../../context/Clientes';

import {
  Layout,
  PageHeader,
  Divider,
  Table,
  Button,
  message,
  Drawer,
  Form,
  Modal,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { colunasTabela } from './constants';
const { Content } = Layout;
const { confirm } = Modal;

function Clientes() {
  const { buscarClientes, buscaCliente } = useContext(ClienteContext);
  const [formCliente] = Form.useForm();
  const [formOrcamento] = Form.useForm();
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

  const listarClientes = async (
    filter = filtros,
    pagina = paginacao.pagina
  ) => {
    setLoadingClientes(true);
    try {
      const data = await buscarClientes(filter, pagina);

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
                confirmeExclusaoCliente,
                selecionarCliente,
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
    listarClientes(values, paginacao.pagina);
  };

  const alterarPagina = (current) => {
    setPaginacao({ pagina: current, total_paginas: paginacao.total_paginas });
    listarClientes(filtros, current);
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
      listarClientes();
    } catch (error) {
      message.error('Não foi possível cadastrar o cliente!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const selecionarCliente = async (id_cliente, acao) => {
    const cliente = await buscaCliente(id_cliente);

    setClienteSelecionado(cliente[0]);
    setModalCadastro(acao);

    if (acao === 'edicao') {
      formCliente.setFieldsValue(
        cliente?.map((cliente) => ({
          ...cliente,
          tipo:
            cliente.tipo === 1
              ? 'Industria'
              : cliente.tipo === 2
              ? 'EAS'
              : 'Laboratório',
        }))[0]
      );
    } else if (acao === 'orcamento') {
      formOrcamento.setFieldsValue({
        cliente: cliente?.nome_fantasia,
        local: cliente?.endereco,
      });
    }
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
      listarClientes();
    } catch (error) {
      message.error('Não foi possível atualizar o cliente!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const confirmeExclusaoCliente = (id_cliente) => {
    confirm({
      title: 'Excluir cliente?',
      content: 'Tem certeza que deseja excluir este cliente?',
      onOk() {
        excluirCliente(id_cliente);
      },
    });
  };

  const excluirCliente = async (id_cliente) => {
    setLoadingClientes(true);
    try {
      await axios.post(baseUrl, {
        service: 'cliente_delete',
        token: getToken(),
        id: id_cliente,
      });

      message.success('Cliente excluído com sucesso!');
      listarClientes();
    } catch (error) {
      message.error('Não foi possível excluir o cliente!');
    } finally {
      setLoadingClientes(false);
    }
  };

  const cadastrarOrcamento = (values) => {
    console.log('testecadastro', values);
  };

  useEffect(() => {
    listarClientes();
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
            onClick={() => {
              formCliente.resetFields();
              setModalCadastro('cadastroCliente');
            }}
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
        title={
          modalCadastro === 'orcamento'
            ? 'Cadastro de orçamento'
            : modalCadastro === 'edicao'
            ? 'Edição de cliente'
            : 'Cadastro de cliente'
        }
        visible={modalCadastro}
        placement="right"
        width="75%"
        onClose={() => setModalCadastro(null)}
      >
        {modalCadastro === 'orcamento' ? (
          <FormOrcamento
            form={formOrcamento}
            cliente={clienteSelecionado}
            cadastrar={cadastrarOrcamento}
            loading={loadingCadastro}
          />
        ) : (
          <FormCliente
            form={formCliente}
            acao={modalCadastro}
            cadastrar={cadastrarCliente}
            editar={editarCliente}
            loading={loadingCadastro}
          />
        )}
      </Drawer>
    </Content>
  );
}
export default Clientes;
