import { Button, Card, Col, Modal, Row, Typography } from "antd";
import { useState } from "react";
const { Title } = Typography;
import "./taskManager.css";
const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task 1",
      descrip: "Task 1",
      age: "Task 1",
      moths: "Task 1",
      status: "To Do",
    },
    {
      id: 2,
      name: "Task 2",
      descrip: "Task 2",
      age: "Task 2",
      moths: "Task 2",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Task 3",
      descrip: "Task 3",
      age: "Task 3",
      moths: "Task 3",
      status: "QA",
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
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("task"));
    const updatedTasks = tasks.map((task) => {
      if (task.id === droppedTask.id) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log("Updated tasks array:", updatedTasks);
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Button
          block
          style={{ marginBottom: 10 }}
          classNames="button"
          key={task.id}
          className="task"
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
          onDoubleClick={() => handleTaskDoubleClick(task)}
        >
          {task.name}
        </Button>
      ));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
        color: "black",
      }}
    >
      <Row gutter={24} justify={"space-between"} style={{ margin: "10px" }}>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid green",
            }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "To Do")}
          >
            <Title className="header" level={3}>
              To Do
            </Title>
            {renderTasks("To Do")}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{ width: "100%", height: "100%", border: "1px solid green" }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "In Progress")}
          >
            <Title className="header" level={3}>
              In Progress
            </Title>
            {renderTasks("In Progress")}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{ width: "100%", height: "100%", border: "1px solid green" }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "QA")}
          >
            <Title className="header" level={3}>
              QA
            </Title>
            {renderTasks("QA")}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{ width: "100%", height: "100%", border: "1px solid green" }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "Done")}
          >
            <Title className="header" level={3}>
              Done
            </Title>
            {renderTasks("Done")}
          </Card>
        </Col>
      </Row>
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
