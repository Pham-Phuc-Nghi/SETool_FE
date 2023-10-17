import {
  BarsOutlined,
  EditOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Typography,
} from "antd";
const { Text } = Typography;

const SprintController = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    const data = { ...values };
    console.log(data);
  };

  const handleCancel = () => {
    form.resetFields();
  };
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const initialValues = [
    {
      name: "Sprint 1",
      totalDayThisSprint: 5,
      reason: "This is the first sprint.",
    },
    {
      name: "Sprint 2",
      totalDayThisSprint: 6,
      reason: "This is the second sprint.",
    },
    {
      name: "Sprint 3",
      totalDayThisSprint: 7,
      reason: "This is the third sprint.",
    },
    {
      name: "Sprint 4",
      totalDayThisSprint: 8,
      reason: "This is the fourth sprint.",
    },
    {
      name: "Sprint 5",
      totalDayThisSprint: 9,
      reason: "This is the fifth sprint.",
    },
  ];
  const handleCreateSprint = () => {};

  return (
    <div style={{ maxHeight: 500, overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 10,
          marginBottom: 20,
        }}
      >
        <Popconfirm
          title="Are you sure you want to create a sprint?"
          onConfirm={handleCreateSprint}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<PlusCircleOutlined />}
            htmlType="submit"
            className="custom-btn-add"
          >
            Create sprint
          </Button>
        </Popconfirm>
      </div>
      <Collapse defaultActiveKey={[]} style={{ marginRight: 10 }}>
        {initialValues.map((initialValue, index) => (
          <Collapse.Panel key={index} header={initialValue.name}>
            <Form
              {...layout}
              form={form[index]}
              key={index}
              initialValues={initialValue}
              onFinish={handleFormSubmit}
              style={{ maxHeight: 600, marginTop: "10px", overflow: "auto" }}
            >
              <Row gutter={24} style={{ marginRight: "5px" }}>
                <Col span={24}>
                  <Form.Item
                    labelCol={6}
                    wrapperCol={18}
                    label={
                      <Text>
                        <BarsOutlined /> Total day this sprint
                      </Text>
                    }
                    name="totalDayThisSprint"
                    rules={[
                      {
                        required: "true",
                        type: "number",
                        min: 1,
                        message: "Total day this sprint must be larger than 1",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "50%" }}
                      placeholder="Input number days ofthis sprint"
                    ></InputNumber>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginRight: "5px" }}>
                <Col span={24}>
                  <Form.Item
                    labelCol={6}
                    wrapperCol={18}
                    label={
                      <Text>
                        <FormOutlined /> Project descriptions
                      </Text>
                    }
                    name="reason"
                    rules={[
                      {
                        required: "true",
                        message: "Description must no be a blank",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Input description about the project"></Input.TextArea>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginRight: "5px" }}>
                <Col
                  span={24}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Form.Item>
                    <Button
                      className="custom-btn-close"
                      onClick={handleCancel}
                      style={{ marginRight: "10px" }}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                  <Button
                    icon={<EditOutlined style={{ marginTop: 5 }} />}
                    htmlType="submit"
                    className="custom-btn-save-and-add"
                  >
                    Edit sprint
                  </Button>
                </Col>
              </Row>
            </Form>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default SprintController;
