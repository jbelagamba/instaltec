import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';
const { Option } = Select;

function FormCliente({ form, cliente, cadastrar, editar, loading }) {
  return (
    <Form
      form={form}
      name="novoCliente"
      onFinish={(values) => (cliente ? editar(values) : cadastrar(values))}
      layout="vertical"
    >
      {camposFormulario.map(({ type, label, name, options }, index) => (
        <Form.Item
          key={index}
          label={label}
          name={name}
          rules={[{ required: true, message: 'Campo obrigatório' }]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 10px)',
            margin: '5px',
          }}
        >
          {type === 'select' ? (
            <Select placeholder="Selecione">
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
          {cliente ? 'Salvar alterações' : 'Cadastrar cliente'}
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormCliente;
