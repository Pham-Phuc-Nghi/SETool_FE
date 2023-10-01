import { Button, Col, Form, Modal, Row,Typography, Input } from "antd";
import { useState } from "react";
const { Text } = Typography;
import PropTypes from "prop-types";
const AddBacklogs = ({ onClose }) => {
  const [form] = Form.useForm();
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

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

  return (
    <>
      <Form
        {...layout}
        form={form}
        // onFinish={handleFormSubmit}
        style={{ maxHeight: 1000, marginTop: "10px" }}
      >
        <Form.Item label={<Text>Description</Text>} name="reason">
          <Input.TextArea placeholder="Input description" allowClear></Input.TextArea>
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
            <Form.Item>
              <Button className="custom-btn-add-d" htmlType="submit">
                Add
              </Button>
            </Form.Item>
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
};

export default AddBacklogs;
