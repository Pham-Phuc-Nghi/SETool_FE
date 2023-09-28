import { useState } from "react";
import { Layout, Button, Spin, Typography } from "antd";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import PropTypes from "prop-types";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const { Header, Sider } = Layout;
import { Content } from "antd/es/layout/layout";
import {
  TeamOutlined,
  AuditOutlined,
  ExceptionOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  HomeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import HeaderMenu from "../components/Header/Header";
// import { useNavigate } from "react-router-dom";
const {Text} = Typography
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
];

const DefaultLayout = ({ children }) => {
  // const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const token = sessionStorage.getItem('token');
  //   if (!token || token === '' || token === null || token === undefined) {
  //     message.error("Bạn Cần Phải Đăng Nhập Để Sử Dụng Hệ Thống");
  //     nav('/');
  //   } else {
  //     setLoading(false);
  //   }
  // }, [nav])

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <Spin size="large" style={{ fontSize: "77px", marginRight: '17px' }}></Spin>
          <h1 style={{ color: 'blue', marginTop: '33px', fontSize: '37px' }}>Vui Lòng Đợi Trong Giây Lát...</h1>
        </div>
      ) : (
        <>
          <Layout style={{width:"100vw",height:"100vh"}}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{ minHeight: "100vh", background: "white" }}
              width={280}
            >
              {!collapsed && (
                <Text style={{fontSize:40,display:"flex",justifyContent:"center",fontFamily:"cursive",color:"#FF4500"}}>SE TOOL</Text>
              )}
              <SidebarMenu items={items_Admin} />
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
                }}
              >
                {children && children}
              </Content>
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
};

DefaultLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default DefaultLayout;
