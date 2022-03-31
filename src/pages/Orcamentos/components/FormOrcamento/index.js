import React, { useContext } from 'react';
import { ClienteContext } from '../../../../context/Clientes';

import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';
const { TextArea } = Input;

function FormOrcamento({ form, acao, cadastrar, editar, loading }) {
  const { listaClientes } = useContext(ClienteContext);

  const prazo = (label) => {
    form.setFieldsValue({
      prazo_pagamento: [label],
    });
  };

  return (
    <Form
      form={form}
      name="novoCliente"
      onFinish={(values) =>
        acao === 'edicao' ? editar(values) : cadastrar(values)
      }
      layout="vertical"
    >
      {camposFormulario.map(
        ({ type, label, name, mode, options, style }, index) => (
          <Form.Item key={index} label={label} name={name} style={style}>
            {type === 'select' ? (
              <Select
                placeholder="Selecione"
                optionFilterProp="label"
                mode={mode}
                showSearch
                allowClear
                onSelect={(label, option) =>
                  name === 'prazo_pagamento' && prazo(label)
                }
                options={name === 'id_cliente' ? listaClientes : options}
                style={{ width: '100%' }}
              />
            ) : type === 'textArea' ? (
              <TextArea
                style={{
                  height:
                    name === 'inadimplemento'
                      ? 250
                      : name === 'descricao'
                      ? 150
                      : 50,
                }}
              />
            ) : (
              <Input placeholder={label} />
            )}
          </Form.Item>
        )
      )}

      <Divider />

      <Form.Item>
        <Button type="danger" htmlType="submit" loading={loading}>
          {acao === 'edicao' ? 'Edição de orçamento' : 'Cadastro de orçamento'}
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormOrcamento;
