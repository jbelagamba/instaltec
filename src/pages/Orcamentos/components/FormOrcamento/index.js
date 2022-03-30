import React, { useState, useEffect, useContext } from 'react';
import { ClienteContext } from '../../../../context/Clientes';

import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';
const { TextArea } = Input;

function FormOrcamento({ form, cadastrar, loading }) {
  const { listaClientes } = useContext(ClienteContext);

  const tarefa = (option) => {
    const descricaoAtual = form.getFieldsValue().descricao || '';
    form.setFieldsValue({
      descricao: `${descricaoAtual && descricaoAtual + '\n'}- ${option.label}`,
    });
  };

  return (
    <Form
      form={form}
      name="novoCliente"
      onFinish={(values) => cadastrar(values)}
      layout="vertical"
    >
      {camposFormulario.map(({ type, label, name }, index) => (
        <Form.Item
          key={index}
          label={label}
          name={name}
          rules={[{ required: true, message: 'Campo obrigatório' }]}
          style={{
            display: 'inline-block',
            width: 'calc(100% - 10px)',
            margin: '5px',
          }}
        >
          {type === 'select' ? (
            <Select
              placeholder="Selecione"
              optionFilterProp="label"
              mode={name === 'tarefas' && 'multiple'}
              allowClear
              onSelect={(label, option) => name === 'tarefas' && tarefa(option)}
              options={listaClientes}
              fieldNames={listaClientes}
            />
          ) : type === 'textArea' ? (
            <TextArea style={{ height: 200 }} />
          ) : (
            <Input placeholder={label} />
          )}
        </Form.Item>
      ))}

      <Divider />

      <Form.Item>
        <Button type="danger" htmlType="submit" loading={loading}>
          Cadastrar orçamento
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormOrcamento;
