import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
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
        style={{
          maxHeight: 1000,
          marginTop: "10px",
          display: "flex",
          width: "100%",
        }}
      >
        <Form.Item
          name="member"
          rules={[
            { required: true, message: "Member Name must not be a blank" },
          ]}
          style={{ width: "90%", marginRight: 10 }}
        >
          <Input placeholder="Input Member Name or Email"></Input>
        </Form.Item>
        <Button className="custom-btn-add-d" htmlType="submit">
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
  form: PropTypes.object.isRequired, // Ensure that form is an object and is required
};

export default AddMember;
