import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';
const { Option } = Select;

function FormCliente({ form, acao, cadastrar, editar, loading }) {
  return (
    <Form
      form={form}
      name="cliente"
      onFinish={(values) =>
        acao === 'edicao' ? editar(values) : cadastrar(values)
      }
      layout="vertical"
    >
      {camposFormulario.map(({ type, label, name, options }, index) => (
        <Form.Item
          key={index}
          label={label}
          name={name}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 10px)',
            margin: '5px',
          }}
        >
          {type === 'select' ? (
            <Select placeholder="Selecione" optionFilterProp="label">
              {options.map(({ label, value }, index) => (
                <Option value={value} key={index}>
                  {label}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder={label} />
          )}
        </Form.Item>
      ))}

      <Divider />

      <Form.Item>
        <Button type="danger" htmlType="submit" loading={loading}>
          {acao === 'edicao' ? 'Edição de cliente' : 'Cadastro de cliente'}
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormCliente;
