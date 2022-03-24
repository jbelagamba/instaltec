import { Layout, Statistic, Card, Row, Col, Progress, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Content } = Layout;

function Home() {
  return (
    <>
      <Content className="container">
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Progress type="circle" percent={75} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Progress type="circle" percent={70} status="exception" />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Progress percent={70} size="small" status="exception" />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Progress percent={100} size="small" />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
}
export default Home;
