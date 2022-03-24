import React, { useState } from 'react';
import {
  Layout,
  PageHeader,
  Divider,
  Table,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Drawer,
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

    const dadosCadastrais = {
      ...values,
      key: Math.random(),
      data_envio: values['date-picker'].format('DD/MM/YYYY'),
    };

    setTimeout(() => {
      setLoadingCadastro(false);
      setLoadingOrcamentos(true);
      form.resetFields();
      setModalCadastro(false);
      message.success('Orçamento cadastrado com sucesso!');
    }, 1000);

    setTimeout(() => {
      setOrcamentos((orcamentos) => [...orcamentos, dadosCadastrais]);
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

      <Drawer
        title="Cadastro de orçamento"
        placement="right"
        onClose={() => setModalCadastro(false)}
        visible={modalCadastro}
        size="large"
      >
        <Form
          form={form}
          name="novoCliente"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nº Orçamento"
            name="numero_orcamento"
            rules={[
              { required: true, message: 'Informe o numero do orcamento!' },
            ]}
          >
            <Input placeholder="Digite o nº orçamento" />
          </Form.Item>
          <Form.Item
            label="Cliente"
            name="cliente"
            rules={[{ required: true, message: 'Informe o cliente!' }]}
          >
            <Select placeholder="Selecione o cliente">
              <Option value="Cliente A">Cliente A</Option>
              <Option value="Cliente B">Cliente B</Option>
              <Option value="Cliente C">Cliente C</Option>
              <Option value="Cliente D">Cliente D</Option>
              <Option value="Cliente E">Cliente E</Option>
              <Option value="Cliente F">Cliente F</Option>
              <Option value="Cliente G">Cliente G</Option>
              <Option value="Cliente H">Cliente H</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Representante"
            name="representante"
            rules={[{ required: true, message: 'Informe o representante!' }]}
          >
            <Input placeholder="Digite o representante" />
          </Form.Item>
          <Form.Item
            label="Titulo do orçamento"
            name="titulo_orcamento"
            rules={[
              { required: true, message: 'Informe o titulo do orçamento!' },
            ]}
          >
            <Input placeholder="Digite o título do orçamento" />
          </Form.Item>
          <Form.Item
            label="Data de envio"
            name="date-picker"
            rules={[{ required: true, message: 'Informe a data do envio!' }]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 5px)',
              marginRight: '5px',
            }}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Selecione a data de envio"
            />
          </Form.Item>
          <Form.Item
            label="Valor da proposta"
            name="valor_proposta"
            rules={[
              { required: true, message: 'Informe o valor da proposta!' },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 5px)',
              marginLeft: '5px',
            }}
          >
            <Input placeholder="Digite o valor da proposta" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Informe o status!' }]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 5px)',
              marginRight: '5px',
            }}
          >
            <Select placeholder="Selecione o status">
              <Option value="Enviado">Enviado</Option>
              <Option value="Reprovado">Reprovado</Option>
              <Option value="Revisado">Revisado</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Forma de aceite"
            name="forma_aceite"
            rules={[{ required: true, message: 'Informe o forma_aceite!' }]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 5px)',
              marginLeft: '5px',
            }}
          >
            <Select placeholder="Selecione a forma de aceite">
              <Option value="Email">Email</Option>
              <Option value="Ordem de compras">Ordem de compras</Option>
              <Option value="Verbal">Verbal</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loadingCadastro}>
              Cadastrar orçamento
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Content>
  );
}
export default Orcamentos;
