import { Button, Layout, Typography } from "antd";
import HeaderMenu from "../components/Header/Header";
import { useState } from "react";
import {
  AuditOutlined,
  DollarOutlined,
  ExceptionOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items_Admin = [
  getItem("Dashboard", "dashboard", <HomeOutlined />),
  getItem("Nhân Viên", "1", <TeamOutlined />, [
    getItem("Phòng Ban", "DSPhongBan"),
    getItem("Phòng Ban Của Tôi", "PhongBan"),
    getItem("Toàn Bộ Nhân Viên", "DSNV"),
    getItem("Tạo Mới Nhân Viên", "ThemNV"),
  ]),
  getItem("Tăng Ca", "2", <FileDoneOutlined />, [
    getItem("Đơn Tăng Ca Nhân Viên", "DSTangCa"),
    getItem("Đơn Tăng Ca Của Tôi", "DonTangCa"),
  ]),
  getItem("Nghỉ Phép", "3", <ExceptionOutlined />, [
    getItem("Đơn Nghỉ Phép Nhân Viên", "DSNghiPhep"),
    getItem("Đơn Nghỉ Phép Của Tôi", "DonNghiPhep"),
  ]),
  getItem("Đơn Khác", "4", <FileAddOutlined />, [
    getItem("Danh Sách Đơn Khác ", "DSDonKhac"),
    getItem("Đơn Khác Của Tôi", "DonKhac"),
  ]),
  getItem("Quản Lí Lương", "5", <DollarOutlined />, [
    getItem("Lương Nhân Viên", "LuongNV"),
    getItem("Lương Của Tôi", "Luong"),
  ]),
  getItem("Hợp Đồng", "6", <AuditOutlined />, [
    getItem("Hợp Đồng Nhân Viên", "DSHopDong"),
    getItem("Hợp Đồng Của Tôi", "HopDong"),
  ]),
  // getItem("Tuyển Dụng", "7", <MailOutlined />, [
  //   getItem("Danh Sách Ứng Viên", "DSUngVien"),
  // ]),
];

const DefaultLayout = ({ children}) => {
  const [collapsed, setCollapsed] = useState(false);
  // const nav = useNavigate();

  return (
    <>
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ minHeight: "100vh", background: "white", height: "100%" }}
          width={280}
        >
          {!collapsed && (
            <Text
              style={{
                fontSize: 40,
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              SE TOOL
            </Text>
          )}
          {/* <SidebarMenu items={items_Admin} /> */}
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <HeaderMenu></HeaderMenu>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "white",
              height: "100%",
            }}
          >{children && children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;
