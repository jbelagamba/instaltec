import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

import FormOrcamento from './components/FormOrcamento';

import {
  Layout,
  PageHeader,
  Divider,
  Table,
  Button,
  Form,
  Drawer,
  message,
  Modal,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { colunasTabela, orcamentoDefault } from './constants';
const { Content } = Layout;
const { confirm } = Modal;

function Orcamentos() {
  const [formOrcamento] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingOrcamentos, setLoadingOrcamentos] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

  const [filtros, setFiltros] = useState({});
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    total_paginas: 0,
  });

  const listarOrcamentos = async (
    filter = filtros,
    pagina = paginacao.pagina
  ) => {
    setLoadingOrcamentos(true);
    try {
      const { data } = await axios.get(baseUrl, {
        params: {
          service: 'orcamento',
          token: getToken(),
          filter: filter,
          pagina,
        },
      });

      if (filter.id) {
        return data.data[0];
      } else {
        setOrcamentos(() =>
          data.data?.map(
            (
              { id_orcamento, codigo, titulo, cliente, valor, status },
              index
            ) => ({
              key: index,
              codigo: codigo,
              titulo: titulo,
              nome_cliente: cliente?.nome_fantasia,
              valor: valor,
              status: { id: status?.id_orcamento_status, nome: status?.nome },
              acoes: {
                id_orcamento,
                confirmeExclusaoOrcamento,
                selecionarOrcamento,
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
      message.error('Não foi possível carregar a lista de orçamentos!');
      setOrcamentos([]);
    } finally {
      setLoadingOrcamentos(false);
    }
  };

  const cadastrarOrcamento = async ({
    titulo,
    id_orcamento_status,
    codigo,
    id_cliente,
    id_obra,
    descricao,
    prazo_comeco,
    prazo_execucao,
    valor,
    prazo_pagamento,
    validade,
    forma_pagamento,
    inadimplento,
  }) => {
    setLoadingCadastro(true);
    try {
      await axios.post(baseUrl, {
        service: 'orcamento_insert',
        token: getToken(),
        data: {
          titulo,
          id_orcamento_status,
          codigo,
          id_cliente,
          id_obra,
          descricao,
          prazo_comeco,
          prazo_execucao,
          valor,
          prazo_pagamento: prazo_pagamento[0],
          validade,
          forma_pagamento,
          inadimplento,
        },
      });

      message.success('Orçamento cadastrado com sucesso!');
      formOrcamento.resetFields();
      listarOrcamentos();
    } catch (error) {
      message.error('Não foi possível cadastrar o orçamento!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const confirmeExclusaoOrcamento = (id_orcamento) => {
    confirm({
      title: 'Excluir orçamento?',
      content: 'Tem certeza que deseja excluir este orçamento?',
      onOk() {
        excluirOrcamento(id_orcamento);
      },
    });
  };

  const excluirOrcamento = async (id_orcamento) => {
    setLoadingOrcamentos(true);
    try {
      await axios.post(baseUrl, {
        service: 'orcamento_delete',
        token: getToken(),
        id: id_orcamento,
      });

      message.success('Orçamento excluído com sucesso!');
      listarOrcamentos();
    } catch (error) {
      message.error('Não foi possível excluir o orçamento!');
    } finally {
      setLoadingOrcamentos(false);
    }
  };

  const selecionarOrcamento = async (id_orcamento, acao) => {
    const orcamento = await listarOrcamentos({ id: id_orcamento });
    setOrcamentoSelecionado(orcamento);
    setModalCadastro(acao);

    const {
      codigo,
      descricao,
      forma_pagamento,
      id_cliente,
      id_obra,
      inadimplento,
      prazo_comeco,
      prazo_execucao,
      prazo_pagamento,
      status,
      titulo,
      validade,
      valor,
    } = orcamento;

    if (acao === 'edicao') {
      formOrcamento.setFieldsValue({
        codigo,
        descricao,
        forma_pagamento,
        id_cliente,
        id_obra,
        id_orcamento,
        id_orcamento_status: {
          label: status.nome,
          value: status.id_orcamento_status,
        },
        inadimplento,
        prazo_comeco,
        prazo_execucao,
        prazo_pagamento: [prazo_pagamento],
        titulo,
        validade,
        valor,
      });
    }
  };

  const editarOrcamento = async ({
    titulo,
    id_orcamento_status,
    codigo,
    id_cliente,
    id_obra,
    descricao,
    prazo_comeco,
    prazo_execucao,
    valor,
    prazo_pagamento,
    validade,
    forma_pagamento,
    inadimplento,
  }) => {
    setLoadingCadastro(true);

    try {
      await axios.post(baseUrl, {
        service: 'orcamento_update',
        token: getToken(),
        data: {
          id: orcamentoSelecionado.id_orcamento,
          titulo,
          id_orcamento_status,
          codigo,
          id_cliente,
          id_obra,
          descricao,
          prazo_comeco,
          prazo_execucao,
          valor,
          prazo_pagamento,
          validade,
          forma_pagamento,
          inadimplento,
        },
      });

      message.success('Orçamento altualizado com sucesso!');
      formOrcamento.resetFields();
      setOrcamentoSelecionado(null);
      listarOrcamentos();
    } catch (error) {
      message.error('Não foi possível atualizar o orçamento!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  useEffect(() => {
    listarOrcamentos();
  }, []);

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Orçamentos"
        className="pageHeader"
        extra={
          <Button
            type="danger"
            icon={<PlusOutlined />}
            onClick={() => {
              formOrcamento.setFieldsValue(orcamentoDefault);
              setModalCadastro(true);
            }}
          >
            Cadastrar orçamento
          </Button>
        }
      />

      <Divider />

      {orcamentos && (
        <Table
          columns={colunasTabela}
          dataSource={[...orcamentos]}
          loading={loadingOrcamentos}
        />
      )}

      <Drawer
        title="Cadastro de orçamento"
        visible={modalCadastro}
        placement="right"
        width="75%"
        onClose={() => setModalCadastro(null)}
      >
        <FormOrcamento
          form={formOrcamento}
          acao={modalCadastro}
          cadastrar={cadastrarOrcamento}
          editar={editarOrcamento}
          loading={loadingCadastro}
        />
      </Drawer>
    </Content>
  );
}
export default Orcamentos;
