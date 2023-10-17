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
} from "antd";
const { Text, Title } = Typography;
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateProject from "./CreateProject";
import { useNavigate } from "react-router-dom";

const HomePagesProject = () => {
  const projects = [
    { key: 1, name: "Project 1", managerName: "Manager A" },
    { key: 2, name: "Project 2", managerName: "Manager B" },
    { key: 3, name: "Project 3", managerName: "Manager C" },
    { key: 4, name: "Project 4", managerName: "Manager D" },
    { key: 5, name: "Project 5", managerName: "Manager E" },
    { key: 6, name: "Project 6", managerName: "Manager F" },
    { key: 7, name: "Project 7", managerName: "Manager G" },
    { key: 8, name: "Project 8", managerName: "Manager H" },
    { key: 9, name: "Project 9", managerName: "Manager J" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
    { key: 10, name: "Project 10", managerName: "Manager k" },
  ];
  const [isModalAdd, setIsModalAdd] = useState(false);

  const showModalTaoDon = () => {
    setIsModalAdd(true);
  };

  const closeAddModal = () => {
    setIsModalAdd(false);
  };

  const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState(dsTangCa);

  // useEffect(() => {
  //   const newFilteredData = dsTangCa.filter((_dsTangCa) => {
  //     const fullName = `${_dsTangCa.staff.lastName} ${_dsTangCa.staff.firstName}`;
  //     return fullName.toLowerCase().includes(searchText.toLowerCase());
  //   });
  //   setFilteredData(newFilteredData);
  // }, [searchText, dsTangCa]);
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

  return (
    <>
      <Row gutter={24} style={{ width: "95%", margin: "0 auto" }}>
        <Col
          span={24}
          style={{
            overflow: "auto",
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
                tooltip={<Text style={{ color: "white" }}>Create project</Text>}
                icon={<PlusOutlined />}
                style={{ marginRight: 20 }}
              ></FloatButton>
            </div>
            <div>
              <Row gutter={24} style={{ width: "100%", marginTop: 30 }}>
                {projects.map((project, index) => (
                  <Col key={project.key} span={6}>
                    <Card
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => {
                        navigate("/project/dashboard");
                      }}
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
                          hoveredCard === index ? "scale(1.1)" : "scale(1)",
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
                        <Text style={{ fontSize: 18 }}>{project.name}</Text>
                        <Text style={{ fontSize: 18, marginTop: 20 }}>
                          {project.managerName}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
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
  );
};

export default HomePagesProject;
