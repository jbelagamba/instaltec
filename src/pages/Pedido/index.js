import React, { useState } from 'react';
import { Layout, PageHeader, Divider, Tabs, Switch, Result } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TabPane } = Tabs;

function Pedido() {
  const [etapas, setEtapas] = useState([
    { label: 'Emissão de OS', value: 1, status: true },
    { label: 'Art', value: 2, status: false },
    { label: 'Laudo de Estanquiadade', value: 3, status: false },
    { label: 'Laudo de Aterramento', value: 4, status: true },
    { label: 'Laudo de Limpeza', value: 5, status: true },
    { label: 'Relatório de Instalação', value: 6, status: true },
    { label: 'Relatório de Atendimento tecnico', value: 7, status: true },
    { label: 'RAT manuscrito', value: 8, status: false },
    { label: 'Projetos', value: 9, status: true },
    { label: 'Guia de remessa de documentos', value: 10, status: true },
    { label: 'NF/NFS', value: 11, status: false },
    { label: 'Imagens', value: 12, status: true },
    { label: 'Anexos', value: 13, status: true },
    { label: 'Observações', value: 14, status: true },
    { label: 'Avaliação', value: 15, status: true },
  ]);

  function onChange(value) {
    setEtapas(() =>
      etapas.map((etapa, index) => ({
        ...etapa,
        status: etapa.value === value ? !etapa.status : etapa.status,
      }))
    );
  }

  return (
    <Content className="container whiteBox">
      <PageHeader
        title="Pedido - 0006 - Nome no pedido"
        className="pageHeader"
      />

      <Divider />

      <Tabs tabPosition="top" defaultActiveKey="1" type="card">
        {etapas.map(({ label, value, status }) => (
          <TabPane
            tab={
              <span className={`tab-status-${status}`}>
                {status ? <CheckCircleOutlined /> : <WarningOutlined />}
                {label}
              </span>
            }
            key={value}
          >
            <PageHeader
              tags={
                <Switch
                  size="small"
                  checkedChildren="Concluída"
                  unCheckedChildren="Pendente"
                  onChange={() => onChange(value)}
                  checked={status}
                />
              }
              title={label}
            />
            <Result
              status="warning"
              title={`A etapa de ${label} está em construção ...`}
            />
          </TabPane>
        ))}
      </Tabs>
    </Content>
  );
}
export default Pedido;
