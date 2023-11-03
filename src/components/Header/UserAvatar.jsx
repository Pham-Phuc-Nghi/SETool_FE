import {
  LockOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import { handleDangXuat } from "../../config/AxiosInstance";
import { useNavigate } from "react-router";
const { Text } = Typography;

const UserAvatar = () => {
  const nav = useNavigate();
  const username_current = sessionStorage.getItem("name_current");
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [isChangeUserInfoVisible, setIsChangeUserInfoVisible] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const showChangePasswordDrawer = () => {
    setIsChangePasswordVisible(true);
  };
  const showChangeUserInfoDrawer = () => {
    setIsChangeUserInfoVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<LockOutlined />}
        onClick={showChangePasswordDrawer}
      >
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserSwitchOutlined />}
        onClick={showChangeUserInfoDrawer}
      >
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<LogoutOutlined />}
        onClick={() => {
          handleDangXuat();
          nav("/");
        }}
      >
        Đăng xuất
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
    console.log(data);
    // if (data) {
    //   dispatch(changePassword(data))
    //     .unwrap()
    //     .then((result) => {
    //       message.success(result);
    //       setIsChangePasswordVisible(false);
    //       form.resetFields();
    //     })
    //     .catch((error) => {
    //       message.error(error);
    //     });
    // }
  };
  const submitChangeUserInfo = (values) => {
    const data = { ...values };
    console.log(data);
    // if (data) {
    //   dispatch(changePassword(data))
    //     .unwrap()
    //     .then((result) => {
    //       message.success(result);
    //       setIsChangePasswordVisible(false);
    //       form.resetFields();
    //     })
    //     .catch((error) => {
    //       message.error(error);
    //     });
    // }
  };

  const changePasswordContent = (
    <Form {...layout} form={form} onFinish={submitChangePassword}>
      <Form.Item
        label={<Text>Mật khẩu hiện tại </Text>}
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu hiện tại!",
          },
        ]}
      >
        <Input.Password allowClear placeholder="Nhập mật khẩu hiện tại" />
      </Form.Item>
      <Form.Item
        label={<Text>Mật khẩu mới </Text>}
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
          },
          {
            pattern:
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,}$/,
            message:
              "Mật khẩu cần có ít nhất 6 kí tự, một chữ in hoa, một số và một kí tự đặc biệt.",
          },
        ]}
      >
        <Input.Password allowClear placeholder="Nhập mật khẩu mới" />
      </Form.Item>
      <Form.Item
        label={<Text>Xác nhận mật khẩu mới </Text>}
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới xác nhận",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Mật khẩu mà bạn vừa nhập vào không giống với mật khẩu cũ"
                )
              );
            },
          }),
        ]}
      >
        <Input.Password allowClear placeholder="Nhập xác nhận mật khẩu mới" />
      </Form.Item>
      <Button block type="primary" htmlType="submit">
        Đổi mật khẩu
      </Button>
    </Form>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const changeUserInfoContent = (
    <Form {...layout} form={form1} onFinish={submitChangeUserInfo}>
      <Form.Item
        labelCol={6}
        wrapperCol={18}
        style={{ alignItems: "center", textAlign: "center" }}
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
        disabled
          listType="picture-card"
          maxCount={1}
          beforeUpload={() => false}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item
        label={<Text>Username </Text>}
        name="username"
      >
        <Text disabled allowClear placeholder="Nhập username mới" />
      </Form.Item>
      <Form.Item
        label={<Text>Email </Text>}
        name="email"
        
      >
        <Text disabled allowClear placeholder="Nhập email mới" />
      </Form.Item>
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
          style={{
            backgroundColor: "#FF4500",
            marginRight: "6px",
            marginBottom: 4,
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
        title="Đổi mật khẩu"
        placement="right"
        closable={true}
        onClose={closeChangePasswordDrawer}
        visible={isChangePasswordVisible}
        width={650}
      >
        {changePasswordContent}
      </Drawer>
      <Drawer
        title="Thông tin người dùng"
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
