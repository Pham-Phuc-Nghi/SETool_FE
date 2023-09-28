import { Avatar, Typography } from "antd";

const { Text } = Typography
const UserAvatar = () => {
  const username_current = "Nguyen Van"
  return (
    <div>
      <span>
        <Avatar style={{ backgroundColor: "violet", marginRight: "6px", marginBottom: 4 }}>
          {username_current && username_current.charAt(0)}
        </Avatar>
        <Text style={{ fontWeight: "bold" }}>{username_current && username_current}</Text>
      </span>
    </div>
  );
};

export default UserAvatar;
