import { Card, Modal, Typography } from "antd";
import { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import "./taskManager.css";
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

  const handleTaskDoubleClick = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleDragStart = (e, task) => {
    if (task.status === "Done" || task.status === "Testing") {
      e.preventDefault();
    } else {
      e.dataTransfer.setData("task", JSON.stringify(task));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("task"));

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
                <Text>Type :<Text style={{color:"red"}}>{task.id}</Text></Text>
              </>
            }
            size="small"
            style={{
              marginBottom: 30,
              scale: "1.15",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
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
  const cardHeight =
    tasksInColumn.length > 0 ? `${tasksInColumn.length * 60}px` : "auto";

  return (
    <div
      style={{
        background: "white",
        color: "black",
        overflowY: "hidden",
        height: "100%",
      }}
    >
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
                height: cardHeight,
                marginRight: 30,
                verticalAlign: "top",
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
              title={<Title className="header" level={4}>
                {status}
              </Title>}
            >
              
              {renderTasks(status)}
            </Card>
            {index !== statuses.length - 1 && (
              <ArrowRightOutlined
                style={{ fontSize: 20, position: "relative", marginRight: 30 }}
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
      >
        {selectedTask && (
          <div>
            <h3>Name: {selectedTask.name}</h3>
            <p>Description: {selectedTask.descrip}</p>
            <p>Age: {selectedTask.age}</p>
            <p>Months: {selectedTask.moths}</p>
            <p>Status: {selectedTask.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskManager;
