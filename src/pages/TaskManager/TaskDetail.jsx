import { Row, Col, Typography } from "antd";
const { Title, Text } = Typography;
const TaskDetail = () => {
  return (
    <Row gutter={24}>
      <Col span={16} style={{ overflow: "auto", maxHeight: "400px" }}>
        <Title level={2}>TITLE CỘT 1</Title>
        
      </Col>
      <Col span={8} style={{ overflow: "auto", maxHeight: "400px" }}>
        <Title level={2}>TITLE CỘT 2</Title>
      </Col>
    </Row>
  );
};

export default TaskDetail;
