import {
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Typography,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { handleDangXuat } from "../../config/AxiosInstance";
import { useNavigate } from "react-router";
import { addImage, getImage } from "../../helper/uploadImage";
import { useDispatch } from "react-redux";
import { setImageURL } from "../../Redux/Slices/StateChange/StateChangeSlice";
import { changePassword } from "../../Redux/Slices/DangNhap/DangNhapSlice";
const { Text } = Typography;

const UserAvatar = () => {
  const nav = useNavigate();
  const username_current = sessionStorage.getItem("name_current");
  const id_current = sessionStorage.getItem("id_current");
  const email_current = sessionStorage.getItem("email_current");
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [isChangeUserInfoVisible, setIsChangeUserInfoVisible] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  useEffect(() => {
    getImageEdit();
  }, []);

  const showChangePasswordDrawer = () => {
    setIsChangePasswordVisible(true);
  };

  const showChangeUserInfoDrawer = () => {
    setIsChangeUserInfoVisible(true);
    getImageEdit();
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<LockOutlined />}
        onClick={showChangePasswordDrawer}
      >
        Change password
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserSwitchOutlined />}
        onClick={showChangeUserInfoDrawer}
      >
        User information
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<LogoutOutlined />}
        onClick={() => {
          handleDangXuat();
          nav("/");
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const submitChangePassword = (values) => {
    const data = { ...values };
    if (data) {
      dispatch(changePassword(data))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          setIsChangePasswordVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          message.error(error, 1.5);
        });
    }
  };

  const changePasswordContent = (
    <Form {...layout} form={form} onFinish={submitChangePassword}>
      <Form.Item
        label={<Text>Current Password </Text>}
        name="password"
        rules={[
          {
            required: true,
            message: "Current Password must not be a blank",
          },
        ]}
      >
        <Input.Password allowClear placeholder="Input Current Password" />
      </Form.Item>
      <Form.Item
        label={<Text>New Password </Text>}
        name="newPassword"
        rules={[
          {
            required: true,
            message: "New Password must not be a blank",
          },
          {
            pattern:
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,}$/,
            message:
              "A new password must have at least 6 characters, one uppercase letter, one digit, and one special character.",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") !== value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "New password must be different from the current password."
                )
              );
            },
          }),
        ]}
      >
        <Input.Password allowClear placeholder="Input New Password" />
      </Form.Item>
      <Form.Item
        label={<Text>Confirm new password </Text>}
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Confirm new password must not be blank",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "The password you just entered does not match the old password."
                )
              );
            },
          }),
        ]}
      >
        <Input.Password allowClear placeholder="Input new password confirm." />
      </Form.Item>
      <Button block type="primary" htmlType="submit">
        SUBMIT
      </Button>
    </Form>
  );

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const openNotification = (type, message) => {
    notification.error({
      message,
      duration: 3,
    });
  };

  const handleUpload = async () => {
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
    }
    if (file && id_current) {
      try {
        await addImage(file, id_current);
        message.success("Image uploaded successfully!", 1.5);
        setIsChangeUserInfoVisible(false);
        nav()
        form.resetFields();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } 
  };

  const dispatch = useDispatch();

  const getImageEdit = async () => {
    if (id_current) {
      try {
        const url = await getImage(id_current);
        setImageUrl(url);
        dispatch(setImageURL(url));
      } catch (error) {
        console.error("Error getting image:", error);
      }
    } 
  };

  const changeUserInfoContent = (
    <Form {...layout} form={form1}>
      <Form.Item wrapperCol={24} name="avatar" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={<img src={imageUrl} style={{ margin: 0 }}></img>}
            size={140}
          ></Avatar>
        </div>
      </Form.Item>
      <Form.Item wrapperCol={24} name="imgLink" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginLeft: 110 }}
          />
        </div>
      </Form.Item>
      <Form.Item label={<Text>Username </Text>} name="username">
        <Text>{username_current}</Text>
      </Form.Item>
      <Form.Item label={<Text>Email </Text>} name="email">
        <Text>{email_current}</Text>
      </Form.Item>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Button
            className="custom-btn-watch-report"
            htmlType="submit"
            icon={<EditOutlined></EditOutlined>}
            onClick={handleUpload}
          >
            Edit
          </Button>
        </Col>
      </Row>
    </Form>
  );

  const closeChangePasswordDrawer = () => {
    setIsChangePasswordVisible(false);
    form.resetFields();
  };

  const closeChangeUserInfoDrawer = () => {
    setIsChangeUserInfoVisible(false);
    form1.resetFields();
  };

  return (
    <div style={{ marginRight: 50 }}>
      <span>
        <Avatar
          src={imageUrl ? <img src={imageUrl} style={{ margin: 0 }} /> : null}
          style={{
            marginRight: "6px",
            marginBottom: 4,
            backgroundColor: imageUrl ? "transparent" : "#FF4500",
          }}
        >
          {username_current && username_current.charAt(0)}
        </Avatar>
        <Dropdown
          arrow={{
            pointAtCenter: true,
          }}
          overlay={menu}
          placement="bottom"
        >
          <span>
            <Text style={{ fontWeight: "bold", cursor: "pointer" }}>
              {username_current && username_current}
            </Text>
          </span>
        </Dropdown>
      </span>
      <Drawer
        title="Change password"
        placement="right"
        closable={true}
        onClose={closeChangePasswordDrawer}
        visible={isChangePasswordVisible}
        width={650}
      >
        {changePasswordContent}
      </Drawer>
      <Drawer
        title="User information"
        placement="right"
        closable={true}
        onClose={closeChangeUserInfoDrawer}
        visible={isChangeUserInfoVisible}
        width={650}
      >
        {changeUserInfoContent}
      </Drawer>
    </div>
  );
};

export default UserAvatar;
