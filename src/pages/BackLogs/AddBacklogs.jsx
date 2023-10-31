import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Typography,
  Input,
  Select,
  Tag,
  message,
  notification,
} from "antd";
import { useState } from "react";
const { Text } = Typography;
import PropTypes from "prop-types";
import {
  ArrowDownOutlined,
  InboxOutlined,
  IssuesCloseOutlined,
  PlusCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import "dayjs/locale/vi";
import Dragger from "antd/es/upload/Dragger";
import { useDispatch } from "react-redux";
import { createBacklogs } from "../../Redux/Slices/Backlogs/BacklogsSlice";

const AddBacklogs = ({ onClose, form }) => {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const dispatch = useDispatch();

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSuccessMessageVisible(false);
    onClose();
  };

  const props = {
    name: "file",
    multiple: true,
    accept: ".png,.jpg",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const openNotification = (type, message) => {
    notification.error({
      message,
      duration: 3,
    });
  };

  const handleCreateBacklogs = (values) => {
    const data = { ...values };
    console.log(data)
    if (data) {
      dispatch(createBacklogs(data))
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

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={handleCreateBacklogs}
        style={{ maxHeight: 598, marginTop: "10px", overflow: "auto" }}
      >
        <Form.Item
          label={<Text>Task name</Text>}
          name="taskName"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Task name must not be a blank",
            },
          ]}
        >
          <Input placeholder="Input Task name" allowClear></Input>
        </Form.Item>
        <Form.Item
          label={<Text>Task type</Text>}
          name="taskType"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Task Type must not be a blank",
            },
          ]}
        >
          <Select
            style={{ width: "60%" }}
            placeholder="Choose task type"
            options={[
              {
                value: 0,
                label: <Text>DEV</Text>,
              },
              {
                value: 1,
                label: <Text>QA</Text>,
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          label={<Text>Priority</Text>}
          name="taskPriority"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Priority must not be a blank",
            },
          ]}
        >
          <Select
            style={{ width: "60%" }}
            placeholder="Choose task priority"
            options={[
              {
                value: 0,
                label: (
                  <Tag color="yellow">
                    <ArrowDownOutlined /> LOW
                  </Tag>
                ),
              },
              {
                value: 1,
                label: (
                  <Tag color="green">
                    <RiseOutlined /> MEDIUM
                  </Tag>
                ),
              },
              {
                value: 2,
                label: (
                  <Tag color="red">
                    <IssuesCloseOutlined /> HIGH
                  </Tag>
                ),
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          label={<Text>Description</Text>}
          name="taskDescription"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Description must not be a blank",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Input description"
            allowClear
          ></Input.TextArea>
        </Form.Item>
        <Form.Item
          label={<Text>imgLink</Text>}
          name="imgLink"
          style={{ marginRight: 10 }}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
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
              className="custom-btn-add-d"
              htmlType="submit"
            >
              Add
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

AddBacklogs.propTypes = {
  onClose: PropTypes.func.isRequired,
  form: PropTypes.object,
};

export default AddBacklogs;
