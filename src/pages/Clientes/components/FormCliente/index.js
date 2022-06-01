import { Form, Input, Select, Button, Divider } from 'antd';
import axios from 'axios';
import { camposFormulario } from '../../constants';
const { Option } = Select;
const { TextArea } = Input;

function FormCliente({ form, acao, cadastrar, editar, loading }) {
  const consultaCep = async (cep) => {
    if (cep) {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json`
        );

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

  return (
    <Form
      form={form}
      name="cliente"
      onFinish={(values) =>
        acao === 'edicao' ? editar(values) : cadastrar(values)
      }
      layout="vertical"
    >
      {camposFormulario.map(({ type, label, name, options, width }, index) => (
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
            <Select placeholder="Selecione" optionFilterProp="label" showSearch>
              {options.map(({ label, value }, index) => (
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
              onBlur={(e) => name === 'cep' && consultaCep(e.target.value)}
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
