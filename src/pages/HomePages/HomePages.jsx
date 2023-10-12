import { Layout, Space } from "antd";
import HeaderMenu from "../../components/Header/Header";
const { Header, Content } = Layout;
import setImage from "../../assets/789.png";
import HomePagesProject from "./HomePagesProject";

const HomePages = () => {
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#F4F5F6",
              boxShadow: "0 4px 2px -2px #ccc",
              opacity: 0.8,
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
                <img
                  style={{
                    width: "120px",
                    height: "60px",
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    margin: "0 auto",
                    marginLeft:50,
                    backgroundSize: "cover",
                    display: "inline-block",
                  }}
                  src={setImage}
                />
              </div>
              <HeaderMenu></HeaderMenu>
            </div>
          </Header>
          <Content
            style={{
              backgroundColor: "none",
              height: "86vh",
              overflow: "auto",
            }}
          >
            <HomePagesProject />
          </Content>
        </Layout>
      </Space>
    </div>
  );
};

export default HomePages;
