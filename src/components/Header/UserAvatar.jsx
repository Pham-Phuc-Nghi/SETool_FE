import { LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Typography } from "antd";
const { Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<LockOutlined />}>
      Đổi mật khẩu
    </Menu.Item>
    <Menu.Item key="2" icon={<LogoutOutlined />}>
      Đăng xuất
    </Menu.Item>
  </Menu>
);

const UserAvatar = () => {
  const username_current = "Admin SE TOOL";
  return (
    <div style={{ marginRight: 50 }}>
      <span>
        <Avatar
          style={{
            backgroundColor: "violet",
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
    </div>
  );
};

export default UserAvatar;
