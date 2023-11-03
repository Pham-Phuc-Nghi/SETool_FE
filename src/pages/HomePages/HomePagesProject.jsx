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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDSProjectSelector } from "../../Redux/Selector";
import { getDSProject } from "../../Redux/Slices/HonePages/HomePagesSlice";
import imageUrl1 from "../../assets/1.svg";
import imageUrl2 from "../../assets/2.svg";
import imageUrl3 from "../../assets/3.svg";
import imageUrl4 from "../../assets/4.svg";
import imageUrl5 from "../../assets/5.svg";
import imageUrl6 from "../../assets/6.svg";
import imageUrl7 from "../../assets/7.svg";
import projectBackground1 from "../../assets/1.png";
import projectBackground2 from "../../assets/2.png";
import projectBackground3 from "../../assets/3.png";
import projectBackground4 from "../../assets/4.png";
import projectBackground5 from "../../assets/5.png";
import projectBackground6 from "../../assets/6.png";
import projectBackground7 from "../../assets/7.png";
import projectBackground8 from "../../assets/8.png";
import projectBackground9 from "../../assets/9.png";
import projectBackground10 from "../../assets/10.png";
import projectBackground11 from "../../assets/11.png";
import projectBackground12 from "../../assets/12.png";
import projectBackground13 from "../../assets/13.png";
import projectBackground14 from "../../assets/14.png";
import projectBackground15 from "../../assets/15.png";
import projectBackground16 from "../../assets/16.png";
import projectBackground17 from "../../assets/17.png";
import projectBackground18 from "../../assets/18.png";
import projectBackground19 from "../../assets/19.png";
import projectBackground20 from "../../assets/20.png";

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

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (id, projectName) => {
    console.log("Clicked Card ID:", id);
    console.log("Clicked Card Project Name:", projectName);
    sessionStorage.setItem("current_project", id);
    navigate(`/project/dashboard`);
  };

  const contentStyle = {
    height: "310px",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const projectBackgrounds = [
    projectBackground1,
    projectBackground2,
    projectBackground3,
    projectBackground4,
    projectBackground5,
    projectBackground6,
    projectBackground7,
    projectBackground8,
    projectBackground9,
    projectBackground10,
    projectBackground11,
    projectBackground12,
    projectBackground13,
    projectBackground14,
    projectBackground15,
    projectBackground16,
    projectBackground17,
    projectBackground18,
    projectBackground19,
    projectBackground20,
  ];

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
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl1}) center/contain no-repeat`,
                      }}
                    ></h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl2}) center/contain no-repeat`,
                      }}
                    ></h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl3}) center/contain no-repeat`,
                      }}
                    ></h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl4}) center/contain no-repeat`,
                      }}
                    ></h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl5}) center/contain no-repeat`,
                      }}
                    ></h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl6}) center/contain no-repeat`,
                      }}
                    ></h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        ...contentStyle,
                        background: `url(${imageUrl7}) center/contain no-repeat`,
                      }}
                    ></h3>
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
                          style={{ width: 500 }}
                          size="large"
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
                                background: `url(${
                                  projectBackgrounds[
                                    index % projectBackgrounds.length
                                  ]
                                }) center/cover no-repeat`,
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
