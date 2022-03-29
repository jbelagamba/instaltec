import { Button, Form, Input, Select } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

import { camposFiltro } from '../../constants';
const { Option } = Select;

function FormFiltros({ onFinish }) {
  const [formFiltro] = Form.useForm();

  const limparfiltros = () => {
    formFiltro.resetFields();
    onFinish({});
  };

  return (
    <Form
      form={formFiltro}
      name="filtro"
      layout="inline"
      onFinish={onFinish}
      onReset={limparfiltros}
    >
      {camposFiltro.map(({ type, label, name, options }, index) => (
        <Form.Item key={index} name={name}>
          {type === 'select' ? (
            <Select placeholder={label}>
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

      <Form.Item>
        <Button type="danger" htmlType="submit" icon={<SearchOutlined />}>
          Filtrar
        </Button>

        <Button type="danger" ghost htmlType="reset" icon={<CloseOutlined />}>
          Limpar
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormFiltros;
