import React, { useContext } from 'react';
import { ClienteContext } from '../../../../context/Clientes';

import { Form, Input, Select, Button, Divider } from 'antd';
import { camposFormulario } from '../../constants';
const { TextArea } = Input;

function FormOrcamento({ form, cliente, cadastrar, loading }) {
  const { listaClientes } = useContext(ClienteContext);
  form.setFieldsValue({
    prazo_pagamento: ['30 dias'],
    validade: '15 dias',
    inadimplemento: `1-Em caso de inadimplência por parte do CONTRATANTE quanto ao pagamento do serviço no prazo informado acima, deverá incidir sobre o valor do presente instrumento multa pecuniária de 2,0%, juros de mora de 1,0% ao mês e correção monetária.\n2-Parcelas não pagas serão protestada automaticamente 10 dias após o vencimento, conforme o prazo informado no contrato de prestação de serviços.\n3-Em caso de cobrança judicial, devem ser acrescidas custas processuais e 50% de honorários advocatícios.\nDo Foro de Eleição:\nAs partes elegem o foro da comarca de Canoas / RS para nele dirimirem eventuais dúvidas oriundas do presente instrumento, com renuncia expressa de qualquer outro foro por mais privilegiado que seja.\nTermo de Aceite: Pelo presente termo aprovamos o orçamento e concordamos na integra e sem ressalvas as condições comerciais gerais de fornecimento descritas na proposta.\nAutorizamos a implantação e começo dos serviços.\nNome:________________________________ N° documento:_____________________\nFunção:_______________________________ Data:________________________`,
    forma_pagamento: `(credito no valor total e no prazo informado na NF na conta PJ da empresa atravez de PIX CNPJ: (nome da chave pix) ou transferencia eletronica para: Banco Bradesco AG: (numero da agencia) CC: (numero da conta) Com opção de outras condições predeterminadas selecionais como: (Boleto bancário) ou (outros - onde será descrito manualmente a forma de pagamento)`,
  });

  const tarefa = (option) => {
    const descricaoAtual = form.getFieldsValue().descricao || '';
    form.setFieldsValue({
      descricao: `${descricaoAtual && descricaoAtual + '\n'}- ${option.label}`,
    });
  };

  const prazo = (label) => {
    form.setFieldsValue({
      prazo_pagamento: [label],
    });
  };

  return (
    <Form
      form={form}
      name="novoCliente"
      onFinish={(values) => cadastrar(values)}
      layout="vertical"
    >
      {camposFormulario.map(
        ({ type, label, name, mode, options, style }, index) => (
          <Form.Item
            key={index}
            label={label}
            name={name}
            rules={[{ required: true, message: 'Campo obrigatório' }]}
            style={style}
          >
            {type === 'select' ? (
              <Select
                placeholder="Selecione"
                optionFilterProp="label"
                mode={mode}
                showSearch
                allowClear
                onSelect={(label, option) =>
                  name === 'tarefas'
                    ? tarefa(option)
                    : name === 'prazo_pagamento' && prazo(label)
                }
                options={name === 'cliente' ? listaClientes : options}
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
          Cadastrar orçamento
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormOrcamento;
