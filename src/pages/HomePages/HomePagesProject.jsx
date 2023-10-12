import { Row, Col, Space, Typography, Card, FloatButton, Modal } from "antd";
const { Text, Title } = Typography;
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateProject from "./CreateProject";
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

  return (
    <>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col
          span={24}
          style={{
            overflow: "auto",
            lineHeight: 2.5,
            width: "100%",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title
                style={{ marginTop: 20, color: "#E96D71", marginBottom: 0 }}
              >
                Các project hiện có
              </Title>
              <FloatButton
                onClick={showModalTaoDon}
                type="primary"
                tooltip={<Text style={{ color: "white" }}>Create project</Text>}
                icon={<PlusOutlined />}
                style={{ marginRight: 20}}
                
              ></FloatButton>
            </div>
            <div
              style={{
                overflowY: "auto",
                maxHeight: "560px",
              }}
            >
              <Row gutter={24} style={{ width: "100%" }}>
                {projects.map((project) => (
                  <Col key={project.key} span={6}>
                    <Card
                      style={{
                        width: "100%",
                        marginBottom: 12,
                        marginLeft: 20,
                        color: "#F4F5F6",
                        backgroundColor: "#FF4500",
                        textAlign: "center",
                      }}
                    >
                      <p>{project.name}</p>
                      <p>{project.managerName}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Space>
        </Col>
      </Row>
      <Modal open={isModalAdd} footer={null} onCancel={closeAddModal} title="Create Project" width={800}
      style={{top:40}}>
        <CreateProject onClose={closeAddModal} />
      </Modal>
    </>
  );
};

export default HomePagesProject;
