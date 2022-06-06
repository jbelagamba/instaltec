import React, { useContext } from 'react';
import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';

import { LocaisContext } from '../../../../context/Locais';

const { Option } = Select;
const { TextArea } = Input;

function FormCliente({ form, acao, cadastrar, editar, loading }) {
  const { locais, setLocais, buscaCidadesPorEstado, buscaCEP } =
    useContext(LocaisContext);

  const onChangeCep = async (cep) => {
    if (cep) {
      try {
        const data = await buscaCEP(cep);

        const { logradouro, bairro, localidade, uf } = data;

        form.setFieldsValue({
          rua: logradouro,
          bairro: bairro,
          cidade: localidade,
          estado: uf,
        });
      } catch (error) {
        console.log('catch error', error);
      }
    }
  };

  const onChangeEstado = async (estado) => {
    if (estado) {
      try {
        const data = await buscaCidadesPorEstado(estado);
        setLocais({ estado: locais.estado, cidade: data });

        form.setFieldsValue({ cidade: data[0]?.value });
      } catch (error) {
        console.log('catch error', error);
      }
    }
  };

  return (
    <Form
      form={form}
      name="cliente"
      onFinish={(values) =>
        acao === 'edicao' ? editar(values) : cadastrar(values)
      }
      layout="vertical"
    >
      {camposFormulario.map(({ type, label, name, width }, index) => (
        <Form.Item
          key={index}
          label={label}
          name={name}
          style={{
            display: 'inline-block',
            width: `calc(${width} - 10px)`,
            margin: '5px',
          }}
        >
          {type === 'select' ? (
            <Select
              placeholder="Selecione"
              optionFilterProp="label"
              showSearch
              onChange={(value) => name == 'estado' && onChangeEstado(value)}
            >
              {locais[name]?.map(({ label, value }, index) => (
                <Option value={value} label={label} key={index}>
                  {label}
                </Option>
              ))}
            </Select>
          ) : type === 'textarea' ? (
            <TextArea />
          ) : (
            <Input
              type={type}
              placeholder={label}
              onBlur={(e) => name === 'cep' && onChangeCep(e.target.value)}
            />
          )}
        </Form.Item>
      ))}

      <Divider />

      <Form.Item>
        <Button type="danger" htmlType="submit" loading={loading}>
          {acao === 'edicao' ? 'Salvar alterações' : 'Cadastrar cliente'}
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormCliente;
