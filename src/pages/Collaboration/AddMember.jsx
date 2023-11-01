import { Button, Col, Form, Input, Modal, Row, Select, Typography } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getShowForm2Selector } from "../../Redux/Selector";
import { setShowForm2 } from "../../Redux/Slices/StateChange/StateChangeSlice";
const { Text } = Typography;

const AddMember = ({ form, form2 }) => {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const dispatch = useDispatch();
  const showForm2 = useSelector(getShowForm2Selector);

  const handleFormCheck = () => {
    dispatch(setShowForm2(true));
  };

  const handleFormAdd = () => {};

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
      <Form {...layout} form={form} onFinish={handleFormCheck}>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="member"
            rules={[
              { required: true, message: "Member Name must not be a blank" },
            ]}
            style={{ width: "80%", marginRight: 10 }}
          >
            <Input placeholder="Input Member Name or Email"></Input>
          </Form.Item>
          <Button
            // className="custom-btn-add-d"
            htmlType="submit"
          >
            Check Member
          </Button>
        </div>
      </Form>
      {showForm2 && (
        <Form {...layout} form={form2} onFinish={handleFormAdd}>
          <div style={{ display: "flex", justifyContent: "left" }}>
            <Form.Item
              name="UserID"
              style={{ width: "80%", marginRight: 10, display: "none" }}
            ></Form.Item>
            <Form.Item
              name="username"
              style={{ width: "80%", marginRight: 10 }}
            >
              <Text>username: </Text>
            </Form.Item>
            <Form.Item name="email" style={{ width: "80%", marginRight: 10 }}>
              <Text>email: </Text>
            </Form.Item>
            <Form.Item name="role" style={{ width: "70%", marginRight: 10 }}>
              <Select
                placeholder="Choose role"
                mode="tags"
                maxTagCount={1}
                options={[
                  {
                    value: 2,
                    label: "Manager",
                  },
                  {
                    value: 3,
                    label: "Dev",
                  },
                  {
                    value: 4,
                    label: "Tester",
                  },
                ]}
              ></Select>
            </Form.Item>
          </div>
          <Row gutter={24} style={{ marginRight: "5px" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                icon={<PlusOutlined style={{ marginTop: 5 }} />}
                className="custom-btn-add-d"
                htmlType="submit"
                block
                style={{ marginTop: 30 }}
              >
                Add Member
              </Button>
            </Col>
          </Row>
        </Form>
      )}
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
  form2: PropTypes.object.isRequired,
};

export default AddMember;
