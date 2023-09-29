import { Button, Col, Form, Modal, Row, Select, Typography,Input } from "antd";
import { useState } from "react";
const { Text } = Typography;
import PropTypes from "prop-types";
const EditBacklogs = ({ onClose }) => {
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
        <Form.Item label={<Text>Member Apply</Text>} name="member">
          <Select
            style={{ width: "70%", marginRight: 10 }}
            placeholder="Choose member apply"
            defaultValue={1}
            options={[
              {
                value: 1,
                label: "David",
              },
              {
                value: 2,
                label: "John",
              },
            ]}
          ></Select>
        </Form.Item>
        <Row gutter={24} style={{ marginRight: "5px" }}>
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Form.Item>
              <Button
                danger
                onClick={handleCancel}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Edit
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

EditBacklogs.propTypes = {
    onClose: PropTypes.func.isRequired, // Ensure that onClose is a function and is required
  };

export default EditBacklogs;
