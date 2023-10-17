import {
  BarsOutlined,
  CalendarOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
const { Text } = Typography;

const ProjectController = () => {
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

  return (
    <>
      <Card style={{ marginTop: 30 }} bordered  >
        <Form
          {...layout}
          form={form}
          onFinish={handleFormSubmit}
          style={{ maxHeight: 600, marginTop: "10px", overflow: "auto" }}
        >
          <Form.Item
            label={
              <Text>
                <BarsOutlined /> Project name
              </Text>
            }
            name="name"
            rules={[
              {
                required: "true",
                message: "Project name must no be a blank",
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              placeholder="Input project name"
            ></Input>
          </Form.Item>
          <Form.Item
            label={
              <Text>
                <BarsOutlined /> Total sprint
              </Text>
            }
            name="totalSprint"
            rules={[
              {
                required: "true",
                type: "number",
                min: 1,
                message: "Sprint must be large than one",
              },
            ]}
          >
            <Input style={{ width: "100%" }} placeholder="Input sprint"></Input>
          </Form.Item>
          <Form.Item
            label={
              <Text>
                <CalendarOutlined /> Start date
              </Text>
            }
            name="startDate"
            rules={[
              { required: true, message: "startDate must not be a blank" },
            ]}
          >
            <DatePicker
              style={{ width: "50%" }}
              disabled
              disabledDate={(current) => {
                const currentDate = dayjs(current);
                const today = dayjs();
                return currentDate.isBefore(today, "day");
              }}
              format="DD/MM/YYYY"
            ></DatePicker>
          </Form.Item>
          <Form.Item
            label={
              <Text>
                <CalendarOutlined /> End date
              </Text>
            }
            name="endDate"
            rules={[{ required: true, message: "endDate must not be a blank" }]}
          >
            <DatePicker
              style={{ width: "50%" }}
              disabled
              disabledDate={(current) => {
                const currentDate = dayjs(current);
                const today = dayjs();
                return currentDate.isBefore(today, "day");
              }}
              format="DD/MM/YYYY"
            ></DatePicker>
          </Form.Item>
          <Form.Item
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
                icon={<PlusCircleOutlined style={{ marginTop: 5 }} />}
                className="custom-btn-save-and-add"
                htmlType="submit"
              >
                Edit project
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default ProjectController;
