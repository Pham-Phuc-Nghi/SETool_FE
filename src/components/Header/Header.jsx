import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import UserAvatar from "./UserAvatar";

const HeaderMenu = () => {
    return (
        <div>
        <div style={{ display: "flex" }}>
        <UserAvatar></UserAvatar>
        {/* <Link to={"/"} onClick={handleDangXuat}> */}
          <Button
            icon={<LogoutOutlined />}
            style={{ margin: 10, marginTop: 10, padding: "0" }}
          />
        {/* </Link> */}
      </div>
        </div>
    );
};

export default HeaderMenu;