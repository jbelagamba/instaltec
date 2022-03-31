import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

import { TarefaContext } from '../../context/Tarefas';
import FormTarefa from './components/FormTarefa';
import FormFiltros from './components/FormFiltros';

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

function Tarefas() {
  const { buscarTarefas, buscaTarefa } = useContext(TarefaContext);
  const [formTarefa] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingTarefas, setLoadingTarefas] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [tarefas, setTarefas] = useState([]);

  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const [filtros, setFiltros] = useState({});
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    total_paginas: 0,
  });

  const listarTarefas = async (filter = filtros, pagina = paginacao.pagina) => {
    setLoadingTarefas(true);
    try {
      const data = await buscarTarefas(filter, pagina);

      const teste = data?.map((tarefa, index) => ({
        ...tarefa,
        key: index,
        acoes: {
          id_servico: tarefa.id_servico,
          confirmeExclusaoTarefa,
          selecionarTarefa,
        },
      }));

      setTarefas(teste);
    } catch (error) {
    } finally {
      setLoadingTarefas(false);
    }
  };

  const filtrar = (values) => {
    setFiltros(values);
    listarTarefas(values, paginacao.pagina);
  };

  const alterarPagina = (current) => {
    setPaginacao({ pagina: current, total_paginas: paginacao.total_paginas });
    listarTarefas(filtros, current);
  };

  const cadastrarTarefa = async (values) => {
    setLoadingCadastro(true);

    try {
      await axios.post(baseUrl, {
        service: 'servico_insert',
        token: getToken(),
        data: values,
      });

      message.success('Tarefa cadastrada com sucesso!');
      formTarefa.resetFields();
      listarTarefas();
    } catch (error) {
      message.error('Não foi possível cadastrar a tarefa!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const selecionarTarefa = async (id_servico, acao) => {
    const tarefa = await buscaTarefa(id_servico);

    setTarefaSelecionada(tarefa[0]);
    setModalCadastro(acao);

    if (acao === 'edicao') {
      formTarefa.setFieldsValue(tarefa[0]);
    }
  };

  const editarTarefa = async (values) => {
    setLoadingCadastro(true);

    const data = { id: tarefaSelecionada.id_servico, ...values };

    try {
      await axios.post(baseUrl, {
        service: 'servico_update',
        token: getToken(),
        data,
      });

      message.success('Tarefa altualizada com sucesso!');
      formTarefa.resetFields();
      setTarefaSelecionada(null);
      listarTarefas();
    } catch (error) {
      message.error('Não foi possível atualizar a tarefa!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const confirmeExclusaoTarefa = (id_servico) => {
    confirm({
      title: 'Excluir tarefa?',
      content: 'Tem certeza que deseja excluir esta tarefa?',
      onOk() {
        excluirTarefa(id_servico);
      },
    });
  };

  const excluirTarefa = async (id_servico) => {
    setLoadingTarefas(true);
    try {
      await axios.post(baseUrl, {
        service: 'servico_delete',
        token: getToken(),
        id: id_servico,
      });

      message.success('Tarefa excluída com sucesso!');
      listarTarefas();
    } catch (error) {
      message.error('Não foi possível excluir a tarefa!');
    } finally {
      setLoadingTarefas(false);
    }
  };

  useEffect(() => {
    listarTarefas();
  }, []);

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Tarefas"
        className="pageHeader"
        extra={
          <Button
            type="danger"
            icon={<PlusOutlined />}
            onClick={() => {
              formTarefa.resetFields();
              setModalCadastro('cadastroTarefa');
            }}
          >
            Cadastrar cliente
          </Button>
        }
      />
      <Divider />

      <FormFiltros onFinish={filtrar} />

      <Divider />

      {tarefas && (
        <Table
          columns={colunasTabela}
          dataSource={[...tarefas]}
          loading={loadingTarefas}
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
          modalCadastro === 'edicao' ? 'Edição de tarefa' : 'Cadastro de tarefa'
        }
        visible={modalCadastro}
        placement="right"
        width="75%"
        onClose={() => setModalCadastro(null)}
      >
        <FormTarefa
          form={formTarefa}
          acao={modalCadastro}
          cadastrar={cadastrarTarefa}
          editar={editarTarefa}
          loading={loadingCadastro}
        />
      </Drawer>
    </Content>
  );
}
export default Tarefas;
