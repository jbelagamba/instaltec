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
  Select,
  DatePicker,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns, dados_orcamentos } from './constants';
const { Content } = Layout;
const { Option } = Select;

function Orcamentos() {
  const [form] = Form.useForm();
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [loadingOrcamentos, setLoadingOrcamentos] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  const [orcamentos, setOrcamentos] = useState(dados_orcamentos);

  const onFinish = (values) => {
    setLoadingCadastro(true);
    console.log(values);

    const teste = {
      ...values,
      data_envio: values['date-picker'].format('DD/MM/YYYY'),
    };

    setTimeout(() => {
      setLoadingCadastro(false);
      setLoadingOrcamentos(true);
      form.resetFields();
      setModalCadastro(false);
    }, 1000);

    setTimeout(() => {
      var novallista = orcamentos;
      novallista.push(teste);
      setOrcamentos(() => novallista);
      setLoadingOrcamentos(false);
    }, 2000);
  };

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Orçamentos"
        className="pageHeader"
        extra={
          <Button
            type="primary"
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

      <Modal
        title="Cadastro de orçamento"
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
            label="numero_orcamento"
            name="numero_orcamento"
            rules={[{ required: true, message: 'Informe o numero_orcamento!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="cliente"
            name="cliente"
            rules={[{ required: true, message: 'Informe o cliente!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="representante"
            name="representante"
            rules={[{ required: true, message: 'Informe o representante!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="titulo_orcamento"
            name="titulo_orcamento"
            rules={[{ required: true, message: 'Informe o titulo_orcamento!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date-picker"
            label="DatePicker"
            rules={[{ required: true, message: 'Informe o data_envio!' }]}
          >
            <DatePicker format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            label="valor_proposta"
            name="valor_proposta"
            rules={[{ required: true, message: 'Informe o valor_proposta!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="status"
            name="status"
            rules={[{ required: true, message: 'Informe o status!' }]}
          >
            <Select>
              <Option value="Enviado">Enviado</Option>
              <Option value="Reprovado">Reprovado</Option>
              <Option value="Revisado">Revisado</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="forma_aceite"
            name="forma_aceite"
            rules={[{ required: true, message: 'Informe o forma_aceite!' }]}
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
export default Orcamentos;
