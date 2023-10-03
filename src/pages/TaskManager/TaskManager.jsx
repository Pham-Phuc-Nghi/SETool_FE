import { Card, Modal, Select, Typography } from "antd";
import { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import "./taskManager.css";
import TaskDetail from "./TaskDetail";
const TaskManager = () => {
  const [tasks, setTasks] = useState([
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
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleTaskDoubleClick = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleDragStart = (e, task) => {
    if (task.status === "Done" || task.status === "Testing") {
      e.preventDefault();
    } else {
      setDraggedTask({ task, status: task.status });
      e.dataTransfer.setData("task", JSON.stringify(task));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const handleBeforeDrop = (task, status) => {
    if (status !== "Testing") return true;
    if (draggedTask) {
      // If a task is being dragged, show the confirmation modal
      showConfirmModal();
    }
    return false;
  };

  const handleCancel = () => {
    setConfirmModalVisible(false);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("task"));

    if (handleBeforeDrop(droppedTask, status)) {
      if (status !== "Done") {
        const updatedTasks = [...tasks];
        const taskIndex = updatedTasks.findIndex(
          (task) => task.id === droppedTask.id
        );

        if (taskIndex !== -1) {
          updatedTasks.splice(taskIndex, 1);
          updatedTasks.unshift({ ...droppedTask, status });
          setTasks(updatedTasks);
        }
        console.log(updatedTasks[0]);
      }
    }
  };

  const handleOk = () => {
    if (draggedTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === draggedTask.task.id) {
          return { ...task, status: "Testing" };
        }
        return task;
      });
      const updatedTask = updatedTasks.find(
        (task) => task.id === draggedTask.task.id
      );
      console.log("Updated Task:", updatedTask);
      setTasks(updatedTasks);
    }
    setConfirmModalVisible(false);
    setDraggedTask(null);
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => {
        let taskName = task.name;
        if (taskName.length > 20) {
          taskName = taskName.substring(0, 20) + "...";
        }
        return (
          <Card
            title={
              <>
                <Text>
                  Type :<Text style={{ color: "red" }}>{task.id}</Text>
                </Text>
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
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            classNames="button"
            key={task.id}
            className="task"
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            onDoubleClick={() => handleTaskDoubleClick(task)}
          >
            <Title level={5} style={{ marginTop: 0, paddingTop: 0 }}>
              {taskName}
            </Title>
          </Card>
        );
      });
  };

  const statuses = ["To Do", "In Progress", "Testing", "Done"];
  const shouldShowScrollBar = tasks.length >= 5;
  const tasksInColumn = tasks.filter((task) => task.status === status);

  const cardHeights = {};

  statuses.forEach((status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    if (filteredTasks.length > 0) {
      const height = `${filteredTasks.length * 115 + 100}px`;
      cardHeights[status] = height;
    } else {
      cardHeights[status] = "auto";
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "#F29F05";
      case "In Progress":
        return "#F99A9C";
      case "Testing":
        return "#F2D98D";
      case "Done":
        return "#84D9BA";
      default:
        return "white";
    }
  };

  return (
    <div
      style={{
        background: "white",
        color: "black",
        overflowY: "hidden",
        height: "80vh",
      }}
    >
      <Select
        style={{ width: "20%", marginBottom: 20, textAlign: "center" }}
        placeholder="Choose sprint"
        dropdownStyle={{ textAlign: "center" }}
        defaultValue={1}
        options={[
          {
            value: 1,
            label: "Sprint 1",
          },
          {
            value: 2,
            label: "Sprint 2",
          },
          {
            value: 3,
            label: "Sprint 3",
          },
          {
            value: 4,
            label: "Sprint 4",
          },
        ]}
      ></Select>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "auto",
          overflowX: shouldShowScrollBar ? "auto" : "hidden",
          minWidth: `${statuses.length * (300 + 10)}px`,
        }}
      >
        {statuses.map((status, index) => (
          <>
            <Card
              key={status}
              style={{
                width: "300px",
                height: cardHeights[status],
                marginRight: 30,
                verticalAlign: "top",
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
              title={
                <Title
                  className="header"
                  level={4}
                  style={{
                    color: getStatusColor(status),
                    border: "1px solid black",
                  }}
                >
                  {status}
                </Title>
              }
            >
              {renderTasks(status)}
            </Card>
            {index !== statuses.length - 1 && (
              <ArrowRightOutlined
                style={{
                  fontSize: 20,
                  position: "relative",
                  marginRight: 30,
                  color: "#FF4500",
                }}
              />
            )}
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
        {/* {selectedTask && (
          <div>
            <h3>Name: {selectedTask.name}</h3>
            <p>Description: {selectedTask.descrip}</p>
            <p>Age: {selectedTask.age}</p>
            <p>Months: {selectedTask.moths}</p>
            <p>Status: {selectedTask.status}</p>
          </div> 
        )} */}
        <TaskDetail></TaskDetail>
      </Modal>
      <Modal
        title="Xác nhận"
        visible={confirmModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn chuyển task này vào Testing?</p>
      </Modal>
    </div>
  );
};

export default TaskManager;
