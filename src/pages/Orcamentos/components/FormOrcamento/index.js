import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';
const { TextArea } = Input;

function FormOrcamento({ form, cadastrar, loading }) {
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
      {camposFormulario.map(({ type, label, name, options }, index) => (
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
              showSearch
              mode={name === 'tarefas' && 'tags'}
              allowClear
              onSelect={(label, option) => tarefa(option)}
              options={options}
              fieldNames={options}
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
