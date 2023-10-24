import { Button, Form, Input, Modal } from "antd";
import {  useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

const AddMember = ({ form }) => {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const layout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        // onFinish={handleFormSubmit}
      >
        <Form.Item
          name="member"
          rules={[
            { required: true, message: "Member Name must not be a blank" },
          ]}
          style={{ width: "80%", marginRight: 10 }}
        >
          <Input placeholder="Input Member Name or Email"></Input>
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "role must not be a blank" }]}
          style={{ width: "80%", marginRight: 10 }}
        >
          <Input placeholder="Input Member Name or Email"></Input>
        </Form.Item>
        <Button
          icon={<PlusOutlined style={{ marginTop: 5 }} />}
          className="custom-btn-add-d"
          htmlType="submit"
        >
          Add member
        </Button>
      </Form>
      <Modal
        visible={isSuccessMessageVisible}
        onCancel={() => setIsSuccessMessageVisible(false)}
        onOk={() => setIsSuccessMessageVisible(false)}
      ></Modal>
    </div>
  );
};

AddMember.propTypes = {
  form: PropTypes.object.isRequired,
};

export default AddMember;
