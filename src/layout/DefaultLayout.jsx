import {useState } from "react";
import { Layout, Button, Spin, Tag } from "antd";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import PropTypes from "prop-types";
import {
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HomeOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
const { Header, Sider } = Layout;
import { Content } from "antd/es/layout/layout";
import HeaderMenu from "../components/Header/Header";
import setImage from "../assets/789.png";
import setImage2 from "../assets/cdww.png";

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
  getItem("My Task", "task", <SolutionOutlined />),
];

// const items_for_member = [
//   getItem("Dashboard", "dashboardMember", <HomeOutlined />),
//   getItem("Collaborators & Teams", "collaborators", <TeamOutlined />),
//   getItem("My Task", "task", <ContainerOutlined />),
//   getItem("Issue", "issue", <WechatOutlined />),
// ];

const DefaultLayout = ({ children }) => {
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
          <Spin
            size="large"
            style={{ fontSize: "77px", marginRight: "17px" }}
          ></Spin>
          <h1 style={{ color: "blue", marginTop: "33px", fontSize: "37px" }}>
            Vui Lòng Đợi Trong Giây Lát...
          </h1>
        </div>
      ) : (
        <>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={!collapsed}
              style={{ minHeight: "100vh", background: "white" }}
              width={280}
            >
              {collapsed && (
                <img
                  style={{
                    width: "170px",
                    height: "100px",
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    margin: "0 auto",
                    backgroundSize: "cover",
                    display: "block",
                  }}
                  src={setImage}
                />
              )}
              <SidebarMenu items={items_for_manager} />
            </Sider>
            <Layout>
              <Header
                style={{
                  padding: 0,
                  background: "white",
                  boxShadow: "0 4px 2px -2px #ccc"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                      }}
                    />
                    {!collapsed && (
                      <img
                        style={{
                          width: "110px",
                          height: "60px",
                          objectFit: "cover",
                          backgroundRepeat: "no-repeat",
                          margin: "0 ",
                          backgroundSize: "cover",
                          display: "block",
                        }}
                        src={setImage2}
                      />
                    )}
                    <Tag style={{ fontSize: "16px", fontWeight: "bold" }} color="orange">Bird Management</Tag>
                  </div>
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
  children: PropTypes.node,
};

export default DefaultLayout;
