import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

import FormOrcamento from './components/FormOrcamento';
import logo from '../../images/logo.jpg';
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
                gerarPDF,
                confirmeExclusaoOrcamento,
                abrirOrcamento,
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
      message.error('N??o foi poss??vel carregar a lista de or??amentos!');
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

      message.success('Or??amento cadastrado com sucesso!');
      formOrcamento.resetFields();
      listarOrcamentos();
    } catch (error) {
      message.error('N??o foi poss??vel cadastrar o or??amento!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const confirmeExclusaoOrcamento = (id_orcamento) => {
    confirm({
      title: 'Excluir or??amento?',
      content: 'Tem certeza que deseja excluir este or??amento?',
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

      message.success('Or??amento exclu??do com sucesso!');
      listarOrcamentos();
    } catch (error) {
      message.error('N??o foi poss??vel excluir o or??amento!');
    } finally {
      setLoadingOrcamentos(false);
    }
  };

  const abrirOrcamento = async (id_orcamento, acao) => {
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
          label: status?.nome,
          value: status?.id_orcamento_status,
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
          id_orcamento_status:
            parseInt(id_orcamento_status.value) || id_orcamento_status,
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

      message.success('Or??amento altualizado com sucesso!');
      formOrcamento.resetFields();
      setOrcamentoSelecionado(null);
      listarOrcamentos();
    } catch (error) {
      message.error('N??o foi poss??vel atualizar o or??amento!');
    } finally {
      setLoadingCadastro(false);
      setModalCadastro(null);
    }
  };

  const gerarPDF = async (id_orcamento) => {
    console.log('logo', logo);
    const orcamento = await listarOrcamentos({ id: id_orcamento });

    const htmlOrcamento = `
      <htmlpageheader name="headerCapa">
        <table>
          <tr>
            <td><h1>Instaltec<h1></td>
          </tr>
        </table>
      </htmlpageheader>

      <htmlpageheader name="headerPaginas">Instaltec headerPaginas</htmlpageheader>

      <htmlpagefooter name="footerCapa">
        <table>
          <tr>
            <td>JJFagundes Jr. Instala????es</td>
          </tr>
          <tr>
            <td>Cnpj:17.298.937/0001-98</td>
          </tr>
          <tr>
            <td>Crea: 217248</td>
          </tr>
          <tr>
            <td>Av. Ramiro Barcelos, 2094, S??o Jos??, Canoas/RS</td>
          </tr>
          <tr>
            <td>(51) 3465-7975 / 98109-3837</td>
          </tr>
          <tr>
            <td>instaltecrs@gmail.com</td>
          </tr>
          <tr>
            <td>Criado por: Jo??o Jr. / Gerente</td>
          </tr>
        </table>
      </htmlpagefooter>

      <sethtmlpageheader name="headerCapa" value="on" show-this-page="1" />
      <sethtmlpageheader name="headerPaginas" value="on" />

      <sethtmlpagefooter name="footerCapa" value="on" show-this-page="1" />
  

      <table>
        <tr>
          <td>tabela</td>
        </tr>
      </table>
    `;

    try {
      const data = await axios.post(baseUrl, {
        service: 'gerapdf',
        token: getToken(),
        html: window.btoa(htmlOrcamento),
      });

      const linkSource = `data:application/pdf;base64,${data.data.pdf}`;
      const downloadLink = document.createElement('a');
      const fileName = `orcamento-${id_orcamento}.pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {}
  };

  useEffect(() => {
    listarOrcamentos();
  }, []);

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Or??amentos"
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
            Cadastrar or??amento
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
        title="Cadastro de or??amento"
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
