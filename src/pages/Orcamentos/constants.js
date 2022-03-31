import { Tag, Button } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const colunasTabela = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    width: '10%',
  },
  {
    title: 'Título',
    dataIndex: 'titulo',
    key: 'titulo',
  },
  {
    title: 'Cliente',
    dataIndex: 'nome_cliente',
    key: 'nome_cliente',
  },
  {
    title: 'Valor',
    dataIndex: 'valor',
    key: 'valor',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '15%',
    render: ({ id, nome }) => (
      <Tag
        color={
          id === '1'
            ? 'gold'
            : id === '2'
            ? 'blue'
            : id === '3'
            ? 'geekblue'
            : id === '4'
            ? 'red'
            : id === '5'
            ? 'green'
            : id === '6'
            ? 'lime'
            : 'default'
        }
      >
        {nome}
      </Tag>
    ),
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
    width: '15%',
    render: ({
      id_orcamento,
      selecionarOrcamento,
      confirmeExclusaoOrcamento,
    }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          ghost
          shape="circle"
          icon={<CheckOutlined />}
          style={{ color: 'green', borderColor: 'green' }}
        />
        <Button
          type="primary"
          ghost
          shape="circle"
          icon={<EditOutlined />}
          style={{ margin: '0 10px' }}
          onClick={() => selecionarOrcamento(id_orcamento, 'edicao')}
        />
        <Button
          type="primary"
          ghost
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => confirmeExclusaoOrcamento(id_orcamento)}
        />
      </div>
    ),
  },
];

export const camposFormulario = [
  {
    type: 'text',
    label: 'Título',
    name: 'titulo',
    style: {
      display: 'inline-flex',
      width: 'calc(80% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Status',
    name: 'id_orcamento_status',
    options: [
      { label: 'Aberto', value: 1 },
      { label: 'Enviado', value: 2 },
      { label: 'Revisado', value: 3 },
      { label: 'Reprovado', value: 4 },
      { label: 'Aprovado', value: 5 },
      { label: 'Concluído', value: 6 },
    ],
    style: {
      display: 'inline-flex',
      width: 'calc(20% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Código',
    name: 'codigo',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Cliente',
    name: 'id_cliente',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Local de instalação / Obra',
    name: 'id_obra',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Tarefas',
    name: 'tarefas',
    mode: 'multiple',
    options: [
      { label: 'tarefa1', value: 'tarefa_id_1' },
      { label: 'tarefa2', value: 'tarefa_id_2' },
      { label: 'tarefa3', value: 'tarefa_id_3' },
    ],
  },
  {
    type: 'textArea',
    label: 'Descrição',
    name: 'descricao',
  },
  {
    type: 'text',
    label: 'Prazo começo',
    name: 'prazo_comeco',
    style: {
      display: 'inline-flex',
      width: 'calc(50% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Prazo execução',
    name: 'prazo_execucao',
    style: {
      display: 'inline-flex',
      width: 'calc(50% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Valor R$',
    name: 'valor',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'select',
    label: 'Prazo pagamento',
    name: 'prazo_pagamento',
    mode: 'tags',
    options: [
      { label: 'À vista', value: 'À vista' },
      { label: '15 dias', value: '15 dias' },
      { label: '30 dias', value: '30 dias' },
      { label: '28/42 dias', value: '28/42 dias' },
      { label: '28/56 dias', value: '28/56 dias' },
      { label: '28/28/56/84 dias', value: '28/28/56/84 dias' },
    ],
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'text',
    label: 'Validade',
    name: 'validade',
    style: {
      display: 'inline-flex',
      width: 'calc(33.33% - 10px)',
    },
  },
  {
    type: 'textArea',
    label: 'Forma de pagamento',
    name: 'forma_pagamento',
  },
  {
    type: 'textArea',
    label: 'Do inadimplemento',
    name: 'inadimplemento',
  },
];

export const orcamentoDefault = {
  prazo_pagamento: ['30 dias'],
  validade: '15 dias',
  inadimplemento: `1-Em caso de inadimplência por parte do CONTRATANTE quanto ao pagamento do serviço no prazo informado acima, deverá incidir sobre o valor do presente instrumento multa pecuniária de 2,0%, juros de mora de 1,0% ao mês e correção monetária.\n2-Parcelas não pagas serão protestada automaticamente 10 dias após o vencimento, conforme o prazo informado no contrato de prestação de serviços.\n3-Em caso de cobrança judicial, devem ser acrescidas custas processuais e 50% de honorários advocatícios.\nDo Foro de Eleição:\nAs partes elegem o foro da comarca de Canoas / RS para nele dirimirem eventuais dúvidas oriundas do presente instrumento, com renuncia expressa de qualquer outro foro por mais privilegiado que seja.\nTermo de Aceite: Pelo presente termo aprovamos o orçamento e concordamos na integra e sem ressalvas as condições comerciais gerais de fornecimento descritas na proposta.\nAutorizamos a implantação e começo dos serviços.\nNome:________________________________ N° documento:_____________________\nFunção:_______________________________ Data:________________________`,
  forma_pagamento: `(credito no valor total e no prazo informado na NF na conta PJ da empresa atravez de PIX CNPJ: (nome da chave pix) ou transferencia eletronica para: Banco Bradesco AG: (numero da agencia) CC: (numero da conta) Com opção de outras condições predeterminadas selecionais como: (Boleto bancário) ou (outros - onde será descrito manualmente a forma de pagamento)`,
};
