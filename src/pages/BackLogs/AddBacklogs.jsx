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
  IssuesCloseOutlined,
  PlusCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import "dayjs/locale/vi";
import { useDispatch } from "react-redux";
import { createBacklogs } from "../../Redux/Slices/Backlogs/BacklogsSlice";
import { addImage } from "../../helper/uploadImage";

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

  const openNotification = (type, message) => {
    notification.error({
      message,
      duration: 3,
    });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (values) => {
    if (file && values) {
      try {
        await addImage(file, values);
        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleCreateBacklogs = (values) => {
    const data = { ...values };

    if (file) {
      const allowedFileTypes = [".jpeg", ".png", ".jpg"];
      const fileTypeIsValid = allowedFileTypes.some((allowedType) =>
        file.name.includes(allowedType)
      );

      if (!fileTypeIsValid) {
        openNotification(
          "error: ",
          "Please select a valid image file (JPEG, PNG, or JPG)."
        );
        return;
      }

      dispatch(createBacklogs(data))
        .unwrap()
        .then((result) => {
          const { messageSuccess, newTaskID } = result;
          message.success(messageSuccess, 1.5);
          handleUpload(newTaskID);
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
    } else {
      // If file is null, proceed with dispatching action without imgLink
      dispatch(createBacklogs(data))
        .unwrap()
        .then((result) => {
          const { messageSuccess, newTaskID } = result;
          message.success(messageSuccess, 1.5);
          handleUpload(newTaskID);
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
          label={<Text>Image Description</Text>}
          name="imgLink"
          style={{ marginRight: 10 }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
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
