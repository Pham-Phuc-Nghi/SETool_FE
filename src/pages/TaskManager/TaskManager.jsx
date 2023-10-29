import { Card, Modal, Select, Spin, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import "./taskManager.css";
import TaskDetail from "./TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  getDSMytask,
  updateMytask,
} from "../../Redux/Slices/TaskManager/TaskManagerSlice";
import {
  getDSAllSprintSelector,
  getDSMyTaskSelector,
} from "../../Redux/Selector";
import { getDSSprint } from "../../Redux/Slices/ManagerZone/ManagerSlice";
const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Build fe layout for manager",
      descrip: "Task 1",
      age: "Task 1",
      moths: "Task 1",
      status: 1,
    },
    {
      id: 2,
      name: "Build fe layout ",
      descrip: "Task 2",
      age: "Task 2",
      moths: "Task 2",
      status: 2,
    },
    {
      id: 3,
      name: "Build BE API",
      descrip: "Task 3",
      age: "Task 3",
      moths: "Task 3",
      status: 3,
    },
    {
      id: 4,
      name: "Task 4",
      descrip: "Task 4",
      age: "Task 4",
      moths: "Task 4",
      status: 4,
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
    if (task.status === 3 || task.status === 4) {
      e.preventDefault();
    } else {
      const dragData = {
        id: task.id,
        status: task.status,
      };
      setDraggedTask(dragData);
      e.dataTransfer.setData("myTask", JSON.stringify(dragData));
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
    if (status === 3) {
      showConfirmModal();
      return false;
    }

    if (draggedTask) {
      showConfirmModal();
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    setConfirmModalVisible(false);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData("myTask"));

    if (handleBeforeDrop(dragData, status)) {
      if (status === 3) {
        setDraggedTask(...myTask.data);
        showConfirmModal();
      } else if (status !== 4) {
        const updatedTasks = [...myTask.data];
        const taskIndex = updatedTasks.findIndex(
          (task) => task.id === dragData.id
        );

        if (taskIndex !== -1) {
          updatedTasks.splice(taskIndex, 1);
          updatedTasks.unshift({ taskID: dragData.id, newStatus: status });
          dispatch(updateMytask(updatedTasks[0]))
            .unwrap()
            .then(() => {
              setRefreshTable(!refreshTable);
            });
        }
        console.log(updatedTasks[0]);
      }
    }
  };

  const handleOk = () => {
    if (draggedTask) {
      const updatedMyTasks = myTask.data.map((task) => {
        if (task.id === draggedTask.task.id) {
          return { ...task, taskStatus: 3 };
        }
        return task;
      });

      const updatedTask = updatedMyTasks.find(
        (task) => task.id === draggedTask.task.id
      );

      console.log("Updated Task:", updatedTask);

      const updatedMyTask = { data: updatedMyTasks };
      dispatch(updateMytask(updatedMyTask))
        .unwrap()
        .then(() => {
          setRefreshTable(!refreshTable);
        });
    }
    setConfirmModalVisible(false);
    setDraggedTask(null);
  };

  const renderTasks = (status) => {
    if (myTask.data === undefined || myTask.data.length === 0) {
      return "Chưa có dữ liệu";
    } else {
      return myTask.data
        .filter((task) => task.taskStatus === status)
        .map((task) => {
          let taskName = task.taskName;
          if (taskName.length > 20) {
            taskName = taskName.substring(0, 20) + "...";
          }
          return (
            <Tooltip key={task.id} title="Double click to see more detail">
              <Card
                title={
                  <>
                    <Text>
                      Type :
                      <Text style={{ color: "red" }}>
                        {task.taskType === 0 ? "DEV" : "QA"}
                      </Text>
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
                className="task-card"
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onDoubleClick={() => handleTaskDoubleClick(task)}
              >
                <Title level={5} style={{ marginTop: 0, paddingTop: 0 }}>
                  {taskName}
                </Title>
              </Card>
            </Tooltip>
          );
        });
    }
  };

  const myTask = useSelector(getDSMyTaskSelector);

  const shouldShowScrollBar =
    myTask.data !== undefined ? myTask.data.length >= 5 : false;

  const statuses = [1, 2, 3, 4];
  const cardHeights = {};

  statuses.forEach((status) => {
    if (myTask.data !== undefined) {
      const filteredTasks = myTask.data.filter(
        (task) => task.taskStatus === status
      );
      if (filteredTasks.length > 0) {
        const height = `${filteredTasks.length * 115 + 100}px`;
        cardHeights[status] = height;
      } else {
        cardHeights[status] = "auto";
      }
    }
  });

  const getStatusName = (status) => {
    switch (status) {
      case 1:
        return "To Do";
      case 2:
        return "In Progress";
      case 3:
        return "Testing";
      case 4:
        return "Done";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "#F29F05";
      case 2:
        return "#F99A9C";
      case 3:
        return "#F2D98D";
      case 4:
        return "#84D9BA";
      default:
        return "white";
    }
  };

  const dispatch = useDispatch();
  const listSprint = useSelector(getDSAllSprintSelector);

  const [refreshTable, setRefreshTable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getDSSprint(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  let option_list_Sprint;
  option_list_Sprint = listSprint.map((type) => ({
    value: type.id,
    label: "Sprint " + type.sprintNumber,
  }));
  const [idTask, setIdTask] = useState(null);

  const handleSelectSprint = (id) => {
    console.log("id", id);
    if (id) {
      setIdTask(id);
    }
  };

  useEffect(() => {
    if (idTask !== null) {
      dispatch(getDSMytask(idTask))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data: ", error);
        });
    }
  }, [refreshTable, idTask]);

  return (
    <div
      style={{
        background: "white",
        color: "black",
        overflowY: "hidden",
        height: "80vh",
      }}
    >
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
          <Select
            style={{ width: "20%", marginBottom: 20, textAlign: "center" }}
            placeholder="Choose sprint"
            dropdownStyle={{ textAlign: "center" }}
            onChange={handleSelectSprint}
            options={option_list_Sprint}
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
                    marginRight: 20,
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
                      {getStatusName(status)}
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
        </>
      )}
    </div>
  );
};

export default TaskManager;
