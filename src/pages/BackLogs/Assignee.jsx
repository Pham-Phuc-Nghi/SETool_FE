import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Select, Typography } from "antd";
const { Text } = Typography;
import PropTypes from "prop-types";
import { useState } from "react";

const Assignee = ({ onClose, form }) => {
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

  const handleFormSubmit = (values) => {
    const data = { ...values };
    console.log("Assignee add: ", data);
    // if (!isEmployee) {
    //   data.staffID = parseInt(staffID_current);
    // }
    // if (data) {
    //   dispatch(taoDonTangCa(data))
    //     .unwrap()
    //     .then((result) => {
    //       message.success(result);
    //       form.resetFields();
    //       onClose();
    //     })
    //     .catch((error) => {
    //       message.error(error);
    //     });
    // }
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={handleFormSubmit}
        style={{ maxHeight: 598, marginTop: "10px", overflow: "auto" }}
      >
        <Form.Item
          label={<Text>Assignee</Text>}
          name="assignee"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Assignee must not be a blank",
            },
          ]}
        >
          <Select
            style={{ width: "60%" }}
            placeholder="Choose Assignee"
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
          label={<Text>Reviewer</Text>}
          name="reviewer"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Reviewer must not be a blank",
            },
          ]}
        >
          <Select
            style={{ width: "60%" }}
            placeholder="Choose Reviewer"
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
          label={<Text>Sprint</Text>}
          name="sprint"
          style={{ marginRight: 10 }}
          rules={[
            {
              required: true,
              message: "Sprint must not be a blank",
            },
          ]}
        >
          <Select
            style={{ width: "60%" }}
            placeholder="Choose Sprint"
            options={[
              {
                value: 0,
                label: <Text>1</Text>,
              },
              {
                value: 1,
                label: <Text>2</Text>,
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
              Submit
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

Assignee.propTypes = {
  onClose: PropTypes.func.isRequired,
  form: PropTypes.object,
};

export default Assignee;
