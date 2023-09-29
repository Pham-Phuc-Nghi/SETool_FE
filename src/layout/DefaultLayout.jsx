import { useState } from "react";
import { Layout, Button, Spin, Typography } from "antd";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import PropTypes from "prop-types";
import {
  ContainerOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WechatOutlined,
  TeamOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const { Header, Sider } = Layout;
import { Content } from "antd/es/layout/layout";
import HeaderMenu from "../components/Header/Header";
// import { useNavigate } from "react-router-dom";
const { Text } = Typography
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items_for_manager = [
  getItem("Dashboard", "dashboard", <HomeOutlined />),
  getItem("Collaborators & Teams", "collaborators", <TeamOutlined />),
  getItem("Backlog", "backlog", <DatabaseOutlined />),
  getItem("My Task", "task", <ContainerOutlined />),
  getItem("Issue", "issue", <WechatOutlined />),
];

// const items_for_member = [
//   getItem("Dashboard", "dashboardMember", <HomeOutlined />),
//   getItem("Collaborators & Teams", "collaborators", <TeamOutlined />),
//   getItem("My Task", "task", <ContainerOutlined />),
//   getItem("Issue", "issue", <WechatOutlined />),
// ];

const DefaultLayout = ({ children }) => {
  // const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <Layout style={{ width: "100vw", height: "100vh" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={!collapsed}
              style={{ minHeight: "100vh", background: "white" }}
              width={280}
            >
              {collapsed && (
                <Text style={{ fontSize: 40, display: "flex", justifyContent: "center", fontFamily: "cursive", color: "#FF4500" }}>SE TOOL</Text>
              )}
              <SidebarMenu items={items_for_manager} />
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
