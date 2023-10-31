import { useState } from "react";
import {
  BarsOutlined,
  CalendarOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Typography,
  message,
  notification,
} from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { createProject } from "../../Redux/Slices/HonePages/HomePagesSlice";
const { Text } = Typography;

const CreateProject = ({ onClose }) => {
  const [form] = Form.useForm();
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const dispatch = useDispatch();

  const openNotification = (type, message) => {
    notification.error({
      message,
      duration: 3,
    });
  };

  const handleFormSubmit = (values) => {
    const data = { ...values };
    if (data) {
      dispatch(createProject(data))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          form.resetFields();
          onClose();
        })
        .catch((error) => {
          error.forEach((errorMessage, index) => {
            if (errorMessage) {
              openNotification("error " + (index + 1) + ": ", errorMessage);
            }
          });
        });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSuccessMessageVisible(false);
    onClose();
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
          name="projectName"
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
          name="projectTotalSprint"
          rules={[
            {
              type: "number",
              min: 1,
              message: "Sprint must be larger than one",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Input sprint"
          ></InputNumber>
        </Form.Item>
        <Form.Item
          label={
            <Text>
              <CalendarOutlined /> Start date:
            </Text>
          }
          name="projectStartDay"
          rules={[{ required: true, message: "startDate must not be a blank" }]}
        >
          <DatePicker
            style={{ width: "50%" }}
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
              <BarsOutlined /> Total day per sprint
            </Text>
          }
          name="projectDayPerSprint"
          rules={[
            {
              required: "true",
              type: "number",
              min: 1,
              message: "Total day per sprint must be larger than 1",
            },
          ]}
        >
          <InputNumber
            style={{ width: "50%" }}
            placeholder="Input number of day per sprint"
          ></InputNumber>
        </Form.Item>
        <Form.Item
          label={
            <Text>
              <FormOutlined /> Project descriptions
            </Text>
          }
          name="projectDescription"
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
              type="primary"
              htmlType="submit"
            >
              Create project
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        visible={isSuccessMessageVisible}
        onCancel={() => setIsSuccessMessageVisible(false)}
        onOk={() => setIsSuccessMessageVisible(false)}
      ></Modal>
    </>
  );
};

CreateProject.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateProject;
