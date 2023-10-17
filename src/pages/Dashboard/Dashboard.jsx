import { Avatar, Card, Modal, Tag, Typography } from "antd";
import { useState } from "react";
const { Title } = Typography;
import "./dashBoard.css";
import TaskDetail from "../TaskManager/TaskDetail";
import {
  CheckOutlined,
  FieldTimeOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";

const Dashboard = () => {
  const tasks=[
    {
      id: 1,
      name: "Build fe layout for manager",
      descrip: "Task 1",
      age: "Task 1",
      moths: "Task 1",
      status: "To Do",
    },
    {
      id: 2,
      name: "Build fe layout ",
      descrip: "Task 2",
      age: "Task 2",
      moths: "Task 2",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Build BE API",
      descrip: "Task 3",
      age: "Task 3",
      moths: "Task 3",
      status: "Testing",
    },
    {
      id: 4,
      name: "Task 4",
      descrip: "Task 4",
      age: "Task 4",
      moths: "Task 4",
      status: "Done",
    },
    {
      id: 5,
      name: "Build fe layout for manager",
      descrip: "Task 5",
      age: "Task 5",
      moths: "Task 5",
      status: "To Do",
    },
    {
      id: 6,
      name: "Build fe layout for manager",
      descrip: "Task 6",
      age: "Task 6",
      moths: "Task 6",
      status: "To Do",
    },
    {
      id: 7,
      name: "Build fe layout for manager",
      descrip: "Task 7",
      age: "Task 7",
      moths: "Task 7",
      status: "To Do",
    },
    {
      id: 8,
      name: "Build fe layout ",
      descrip: "Task 8",
      age: "Task 8",
      moths: "Task 8",
      status: "In Progress",
    },
    {
      id: 9,
      name: "Build fe layout ",
      descrip: "Task 9",
      age: "Task 9",
      moths: "Task 9",
      status: "In Progress",
    },
    {
      id: 10,
      name: "Build fe layout for manager",
      descrip: "Task 10",
      age: "Task 10",
      moths: "Task 10",
      status: "To Do",
    },
    {
      id: 11,
      name: "final",
      descrip: "Task 11",
      age: "Task 11",
      moths: "Task 11",
      status: "To Do",
    },
    {
      id: 12,
      name: "final",
      descrip: "Task 12",
      age: "Task 12",
      moths: "Task 12",
      status: "To Do",
    },
    {
      id: 12,
      name: "final",
      descrip: "Task 12",
      age: "Task 12",
      moths: "Task 12",
      status: "To Do",
    },
    {
      id: 12,
      name: "final",
      descrip: "Task 12",
      age: "Task 12",
      moths: "Task 12",
      status: "To Do",
    },
    {
      id: 12,
      name: "final",
      descrip: "Task 12",
      age: "Task 12",
      moths: "Task 12",
      status: "To Do",
    },
    {
      id: 12,
      name: "final",
      descrip: "Task 12",
      age: "Task 12",
      moths: "Task 12",
      status: "To Do",
    },
    {
      id: 12,
      name: "final",
      descrip: "Task 12",
      age: "Task 12",
      moths: "Task 12",
      status: "To Do",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskDoubleClick = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => {
        let taskName = task.name;
        if (taskName.length > 28) {
          taskName = taskName.substring(0, 28) + "...";
        }
        return (
          <Card
            title={
              <>
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    padding: 0,
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  {taskName}
                </Title>
              </>
            }
            size="small"
            bordered={false}
            style={{
              marginBottom: 30,
              scale: "1.15",
              boxShadow: "rgba(149, 157, 165, 0.3) 0px 8px 24px",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            key={task.id}
            className="task-card"
            onDoubleClick={() => handleTaskDoubleClick(task)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tag color="yellow" style={{ fontSize: 10 }}>
                {" "}
                ID: 1{" "}
              </Tag>
              <div>
                {task.status === "Done" ? (
                  <CheckOutlined
                    style={{ fontSize: 12, color: "green", marginRight: 10 }}
                  />
                ) : null}
                <Avatar
                  style={{ backgroundColor: "red", fontSize: 10 }}
                  size={"small"}
                >
                  A
                </Avatar>
              </div>
            </div>
          </Card>
        );
      });
  };

  const statuses = ["To Do", "In Progress", "Testing", "Done"];
  const shouldShowScrollBar = tasks.length >= 5;

  const cardHeights = {};

  // Lặp qua các status và thiết lập chiều cao cho từng status
  statuses.forEach((status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    if (filteredTasks.length > 0) {
      // Tính toán chiều cao dựa trên số lượng task trong status
      const height = `${filteredTasks.length * 115 + 100}px`;
      cardHeights[status] = height;
    } else {
      cardHeights[status] = "auto"; // Nếu không có task, set chiều cao là "auto"
    }
  });

  const toDoTasks = tasks.filter((task) => task.status === "To Do");
  toDoTasks.forEach((task, index) => {
    console.log(index);
  });

  const pastelColors = [
    "#B2A0E2",
    "#FFD6BA",
    "#AED9E0",
    "#FFC3A0",
    "#ABEBC6",
    "#FFA7A7",
    "#FDCB92",
    "#FFAAA6",
    "#ABEBC8",
  ];

  const dummyData = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const avatarModals = [
    {
      title: "Avatar 1",
      content: "Nội dung modal 1",
    },
    {
      title: "Avatar 2",
      content: "Nội dung modal 2",
    },
    {
      title: "Avatar 3",
      content: "Nội dung modal 3",
    },
    {
      title: "Avatar 4",
      content: "Nội dung modal 4",
    },
    {
      title: "Avatar 5",
      content: "Nội dung modal 5",
    },
    {
      title: "Avatar 6",
      content: "Nội dung modal 6",
    },
    {
      title: "Avatar 7",
      content: "Nội dung modal 7",
    },
    {
      title: "Avatar 8",
      content: "Nội dung modal 8",
    },
    {
      title: "Avatar 9",
      content: "Nội dung modal 9",
    },
  ];

  const showModal = (index) => {
    setVisibleModal(avatarModals[index]);
  };

  const [visibleModal, setVisibleModal] = useState();
  const avatars = dummyData.slice(0, 9).map((initial, index) => (
    <Avatar
      onClick={() => showModal(index)}
      key={index}
      style={{ backgroundColor: pastelColors[index], fontSize: 10,cursor:"pointer" }}
    >
      {initial}
    </Avatar>
  ));

  return (
    <div
      style={{
        background: "white",
        color: "black",
        overflowY: "hidden",
        height: "80vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar.Group maxCount={7} style={{ marginBottom: 20 }}>
          {avatars}
        </Avatar.Group>
        <div>
          <ThunderboltFilled
            style={{ fontSize: 20, marginRight: 10, color: "#FF4500" }}
          />
          <Tag color="red" style={{ fontSize: 17 }}>
            <FieldTimeOutlined /> 4 days remaining
          </Tag>
          <Tag color="cyan" style={{ fontSize: 17 }}>
            Current Sprint : 1
          </Tag>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          overflowX: shouldShowScrollBar ? "auto" : "hidden",
          minWidth: `${statuses.length * (300 + 10)}px`,
        }}
      >
        {statuses.map((status) => (
          <>
            <Card
              key={status}
              style={{
                width: "300px",
                height: cardHeights[status],
                marginRight: 30,
                verticalAlign: "top",
                backgroundColor: "#F4F5F7",
              }}
              title={
                <Title
                  className="header"
                  level={4}
                  style={{
                    border: "1px solid black",
                  }}
                >
                  {status}
                </Title>
              }
            >
              {renderTasks(status)}
            </Card>
          </>
        ))}
      </div>
      <Modal
        title="Task Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 40 }}
      >
        <TaskDetail></TaskDetail>
      </Modal>
      <Modal
        visible={visibleModal !== undefined}
        title={visibleModal?.title}
        onCancel={() => setVisibleModal(undefined)}
      >
        {visibleModal?.content}
      </Modal>
    </div>
  );
};

export default Dashboard;
