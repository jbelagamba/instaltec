import React, { useState } from 'react';

import FormOrcamento from './components/FormOrcamento';

import { Layout, PageHeader, Divider, Table, Button, Form, Drawer } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { columns, dados_orcamentos } from './constants';
const { Content } = Layout;

function Orcamentos() {
  const [formOrcamento] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingOrcamentos, setLoadingOrcamentos] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [orcamentos, setOrcamentos] = useState(dados_orcamentos);

  const cadastrarOrcamento = (values) => {
    console.log('cadastrarOrcamento', values);
  };

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Orçamentos"
        className="pageHeader"
        extra={
          <Button
            type="danger"
            icon={<PlusOutlined />}
            onClick={() => setModalCadastro(true)}
          >
            Cadastrar orçamento
          </Button>
        }
      />

      <Divider />

      {orcamentos && (
        <Table
          columns={columns}
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
          cadastrar={cadastrarOrcamento}
          loading={loadingCadastro}
        />
      </Drawer>
    </Content>
  );
}
export default Orcamentos;
