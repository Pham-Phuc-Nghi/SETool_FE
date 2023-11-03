import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getShowForm2Selector,
  getUserInfoEmail,
  getUserInfoID,
  getUserInfoName,
} from "../../Redux/Selector";
import { setShowForm2 } from "../../Redux/Slices/StateChange/StateChangeSlice";
import {
  addMemberToProject,
  searchUserInfo,
} from "../../Redux/Slices/Collaboration/CollaborationSlice";
const { Text } = Typography;

const AddMember = ({ form, form2, onClose }) => {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const dispatch = useDispatch();
  const showForm2 = useSelector(getShowForm2Selector);

  const userInfoID = useSelector(getUserInfoID);
  const userInfoName = useSelector(getUserInfoName);
  const userInfoEmail = useSelector(getUserInfoEmail);

  const handleFormCheck = (value) => {
    const projectID = sessionStorage.getItem("current_project");
    const inviterInfo = value.member;
    const data = {
      projectID: projectID,
      inviterInfo: inviterInfo,
    };
    dispatch(searchUserInfo(data))
      .unwrap()
      .then(() => {
        message.success("Found successfully.");
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        dispatch(setShowForm2(true));
      });
  };

  const handleFormAdd = (value) => {
    const projectID = sessionStorage.getItem("current_project");
    if (userInfoID !== null || userInfoID !== "") {
      const data = {
        projectID: projectID,
        newUserID: userInfoID,
        role: value.role[0],
      };
      console.log("Data to add: ", data);
      dispatch(addMemberToProject(data))
        .unwrap()
        .then((value) => {
          message.success(value);
          onClose();
        })
        .catch((err) => {
          message.error(err);
        });
    }
  };

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
              initialValue={userInfoID}
              name="UserID"
              style={{ width: "80%", marginRight: 10, display: "none" }}
            ></Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Form.Item
                  initialValue={userInfoName}
                  name="username"
                  style={{ width: "80%" }}
                >
                  <Text>username: {userInfoName}</Text>
                </Form.Item>
                <Form.Item
                  initialValue={userInfoEmail}
                  name="email"
                  style={{ width: "80%" }}
                >
                  <Text>email: {userInfoEmail}</Text>
                </Form.Item>
              </div>
              <Form.Item
                name="role"
                style={{ width: "70%" }}
                rules={[
                  {
                    required: true,
                    message: "Rules must not be a blank",
                  },
                ]}
              >
                <Select
                  placeholder="Choose role"
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
  onClose: PropTypes.func.isRequired,
};

export default AddMember;
