import { useEffect, useState } from "react";
import { Layout, Button, Spin, Tag, Tooltip } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../Redux/Slices/ManagerZone/ManagerSlice";
import { getProjectDetailSelector, isAdminSelector } from "../Redux/Selector";
import { useNavigate } from "react-router-dom";
import { isAdminOfProject } from "../Redux/Slices/Collaboration/CollaborationSlice";

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
  getItem("Manager Zone", "management", <DatabaseOutlined />),
  getItem("My Task", "task", <SolutionOutlined />),
];

const items_for_member = [
  getItem("Dashboard", "dashboard", <HomeOutlined />),
  getItem("Collaborators & Teams", "collaborators", <TeamOutlined />),
  getItem("My Task", "task", <SolutionOutlined />),
];

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const projectDetails = useSelector(getProjectDetailSelector);
  const refreshTable = false;
  const navigate = useNavigate();

  const isAdmin = useSelector(isAdminSelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(isAdminOfProject(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getProjectDetails(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  const handleHomePage = () => {
    navigate("/homepage");
  };

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
                <Tooltip title="To Homepage">
                  <img
                    style={{
                      width: "170px",
                      height: "100px",
                      objectFit: "cover",
                      backgroundRepeat: "no-repeat",
                      margin: "0 auto",
                      backgroundSize: "cover",
                      display: "block",
                      cursor: "pointer",
                    }}
                    src={setImage}
                    onClick={handleHomePage}
                  />
                </Tooltip>
              )}
              <SidebarMenu items={isAdmin.isAdmin === true ? items_for_manager : items_for_member} />
            </Sider>
            <Layout>
              <Header
                style={{
                  padding: 0,
                  background: "white",
                  boxShadow: "0 4px 2px -2px #ccc",
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
                      <Tooltip title="To Homepage">
                        <img
                          style={{
                            width: "110px",
                            height: "60px",
                            objectFit: "cover",
                            backgroundRepeat: "no-repeat",
                            margin: "0 ",
                            backgroundSize: "cover",
                            display: "block",
                            cursor: "pointer",
                          }}
                          src={setImage2}
                          onClick={handleHomePage}
                        />
                      </Tooltip>
                    )}
                    <Tag
                      style={{ fontSize: "16px", fontWeight: "bold" }}
                      color="orange"
                    >
                      {projectDetails.projectName}
                    </Tag>
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
