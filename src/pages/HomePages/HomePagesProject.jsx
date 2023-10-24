import {
  Row,
  Col,
  Space,
  Typography,
  Card,
  FloatButton,
  Modal,
  Form,
  Input,
  Carousel,
  Spin,
} from "antd";
const { Text, Title } = Typography;
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDSProjectSelector } from "../../Redux/Selector";
import { getDSProject } from "../../Redux/Slices/HonePages/HomePagesSlice";

const HomePagesProject = () => {
  const dispatch = useDispatch();
  const dsProject = useSelector(getDSProjectSelector);
  const [refreshTable, setRefreshTable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDSProject())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  const [isModalAdd, setIsModalAdd] = useState(false);

  const showModalTaoDon = () => {
    setIsModalAdd(true);
  };

  const closeAddModal = () => {
    setIsModalAdd(false);
    setRefreshTable(!refreshTable);
  };

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dsProject);

  useEffect(() => {
    const newFilteredData = dsProject.filter((_dsProject) => {
      const fullName = `${_dsProject.projectName} `;
      return fullName.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(newFilteredData);
  }, [searchText, dsProject]);

  const navigate = useNavigate();
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const contentStyle = {
    height: "200px",
    color: "#fff", 
    lineHeight: "160px",
    textAlign: "center",
    alignItems: "center",
    background: "#364d79",
  };

  const [hoveredCard, setHoveredCard] = useState(null);
  
  const handleCardClick = (id, projectName) => {
    console.log("Clicked Card ID:", id);
    console.log("Clicked Card Project Name:", projectName);
    sessionStorage.setItem('current_project', id);
    navigate(`/project/dashboard`); 
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
          <Row gutter={24} style={{ width: "95%", margin: "0 auto" }}>
            <Col
              span={24}
              style={{
                overflow: "auto",
                overflowX: "hidden",
                lineHeight: 2.5,
                width: "100%",
                padding: 0,
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Carousel autoplay style={{ margin: "0 auto", width: "90%" }}>
                  <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>4</h3>
                  </div>
                </Carousel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Title
                      style={{
                        marginTop: 20,
                        color: "#E96D71",
                        marginBottom: 0,
                        marginLeft: 30,
                      }}
                    >
                      Current projects
                    </Title>
                    <Form
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ width: "30%" }}
                    >
                      <Form.Item
                        name="searchHopDong"
                        style={{
                          marginTop: "26px",
                          marginBottom: 0,
                          marginLeft: 30,
                        }}
                      >
                        <Input.Search
                          allowClear
                          placeholder="Search Project"
                          onSearch={handleSearch}
                          onChange={(e) => handleSearch(e.target.value)}
                          value={searchText}
                          className="custom-search-input"
                        />
                      </Form.Item>
                    </Form>
                  </div>
                  <FloatButton
                    onClick={showModalTaoDon}
                    type="primary"
                    tooltip={
                      <Text style={{ color: "white" }}>Create project</Text>
                    }
                    icon={<PlusOutlined />}
                    style={{ marginRight: 20 }}
                  ></FloatButton>
                </div>
                {filteredData.length === 0 ? (
                  <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Title style={{ color: "#61605f" }}>
                      YOU HAVE NOT PARTICIPATE IN ANY PROJECTS
                    </Title>
                  </div>
                ) : (
                  <div>
                    <Row gutter={24} style={{ width: "100%", marginTop: 30 }}>
                      {Array.isArray(filteredData) &&
                        filteredData.map((project, index) => (
                          <Col key={project.id} span={6}>
                            <Card
                              onMouseEnter={() => setHoveredCard(index)}
                              onMouseLeave={() => setHoveredCard(null)}
                              onClick={() =>
                                handleCardClick(project.id, project.projectName)
                              }
                              style={{
                                width: "100%",
                                marginBottom: 12,
                                marginLeft: 20,
                                color: "#F4F5F6",
                                backgroundColor: "#FF4500",
                                textAlign: "center",
                                cursor: "pointer",
                                height: 140,
                                transform:
                                  hoveredCard === index
                                    ? "scale(1.05)"
                                    : "scale(1)",
                                transition: "transform 0.2s",
                              }}
                            >
                              <div
                                style={{
                                  height: 80,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <Text style={{ fontSize: 18 }}>
                                  {project.projectName}
                                </Text>
                              </div>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </div>
                )}
              </Space>
            </Col>
          </Row>
          <Modal
            open={isModalAdd}
            footer={null}
            onCancel={closeAddModal}
            title="Create Project"
            width={800}
            style={{ top: 40 }}
          >
            <CreateProject onClose={closeAddModal} />
          </Modal>
        </>
      )}
    </>
  );
};

export default HomePagesProject;
