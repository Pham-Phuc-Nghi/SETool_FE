import {
  Avatar,
  Button,
  Card,
  Modal,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
const { Title } = Typography;
import "./dashBoard.css";
import TaskDetail from "../TaskManager/TaskDetail";
import {
  CheckOutlined,
  FieldTimeOutlined,
  FilterOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { getCurrentSprint } from "../../Redux/Slices/ManagerZone/ManagerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentSprintSelector,
  getDSMemberAllSelector,
  getDashboardSelector,
} from "../../Redux/Selector";
import { getDashboard } from "../../Redux/Slices/Dashboard/DashboardSlice";
import { getDSMember } from "../../Redux/Slices/Collaboration/CollaborationSlice";
import { getImage } from "../../helper/uploadImage";

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskDoubleClick = (task) => {
    setSelectedTask(task.id);
    setIsModalVisible(true);
  };

  const dashboard = useSelector(getDashboardSelector);
  const [filteredData, setFilteredData] = useState(dashboard);
  const dispatch = useDispatch();
  const refreshTable = false;
  const [loading, setLoading] = useState(true);
  const currentSprint = useSelector(getCurrentSprintSelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    if (projectID !== null) {
      dispatch(getCurrentSprint(projectID))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data: ", error);
        });
    }
  }, [refreshTable]);

  const [memberName, setMemberName] = useState(null);

  const handleAvatarClick = (name) => {
    setMemberName(name);
  };

  useEffect(() => {
    if (dashboard.data !== undefined) {
      const newFilteredData = dashboard.data.filter((_dashboard) => {
        const memberNamefilter =
          !memberName ||
          _dashboard.assigneeName === memberName ||
          _dashboard.reporterName === memberName;
        return memberNamefilter;
      });
      setFilteredData(newFilteredData);
    }
  }, [memberName, dashboard]);

  const renderTasks = (status) => {
    if (filteredData === undefined || filteredData.length === 0) {
      return "No data available";
    } else {
      return filteredData
        .filter((task) => task.taskStatus === status)
        .map((task) => {
          let taskName = task.taskName;
          if (taskName.length > 28) {
            taskName = taskName.substring(0, 28) + "...";
          }

          const assigneeIndex = dsMemberAll.findIndex(
            (member) => member.name === task.assigneeName
          );

          return (
            <Tooltip key={task.id} title="Double click to see more detail">
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
                    Sprint {task.sprintNumber}{" "}
                  </Tag>
                  <div>
                    {task.status === "Done" ? (
                      <CheckOutlined
                        style={{
                          fontSize: 12,
                          color: "green",
                          marginRight: 10,
                        }}
                      />
                    ) : null}
                    {assigneeIndex !== -1 && (
                      <Avatar
                        size="small"
                        src={
                          imageUrl[assigneeIndex] && (
                            <img
                              src={imageUrl[assigneeIndex]}
                              alt={`Assignee Avatar`}
                              style={{
                                margin: 0,
                              }}
                            />
                          )
                        }
                        style={{
                          backgroundColor: imageUrl[assigneeIndex]
                            ? "transparent"
                            : "#FF4500",
                        }}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </Tooltip>
          );
        });
    }
  };

  const currentSprintId = currentSprint.id;

  useEffect(() => {
    if (currentSprintId !== undefined) {
      dispatch(getDashboard(currentSprintId))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data: ", error);
        });
    }
  }, [refreshTable, currentSprintId]);

  const dsMemberAll = useSelector(getDSMemberAllSelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getDSMember(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  const statuses = [1, 2, 3, 4];
  const shouldShowScrollBar =
    filteredData !== undefined ? filteredData.length >= 5 : false;
  const cardHeights = {};

  statuses.forEach((status) => {
    if (Array.isArray(filteredData)) {
      const filteredTasks = filteredData.filter(
        (task) => task.taskStatus === status
      );

      if (filteredTasks.length > 0) {
        const height = `${filteredTasks.length * 115 + 100}px`;
        cardHeights[status] = height;
      } else {
        cardHeights[status] = "auto";
      }
    } else {
      cardHeights[status] = "auto";
    }
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

  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    const promises = dsMemberAll.map((_dsMemberAll) => {
      const memberId = _dsMemberAll.id;
      return getImageEdit(memberId);
    });

    Promise.all(promises)
      .then((urls) => {
        setImageUrl(urls);
      })
      .catch((error) => {
        console.error("Error getting images:", error);
      });
  }, [dsMemberAll]);

  const getImageEdit = async (memberId) => {
    if (memberId) {
      try {
        const url = await getImage(memberId);
        return url;
      } catch (error) {
        // console.error("Error getting image:", error);
        return null;
      }
    } else {
      console.error("Please provide an ID to get the image.");
      return null;
    }
  };

  const avatars = dsMemberAll.slice(0, 9).map((member, index) => (
    <Tooltip key={index} title={member.name}>
      {imageUrl[index] ? (
        <Avatar
          src={
            <img
              src={imageUrl[index]}
              style={{ margin: 0 }}
              alt={`Avatar ${index + 1}`}
            ></img>
          }
          onClick={() => handleAvatarClick(member.name)}
          style={{
            fontSize: 10,
            cursor: "pointer",
          }}
        >
          {member.name}
        </Avatar>
      ) : (
        <Avatar
          onClick={() => handleAvatarClick(member.name)}
          style={{
            backgroundColor: pastelColors[index],
            fontSize: 10,
            cursor: "pointer",
          }}
        >
          {member.name}
        </Avatar>
      )}
    </Tooltip>
  ));
  

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
  const handleResetFilter = () => {
    setMemberName(null);
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
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <Avatar.Group maxCount={7} style={{ marginBottom: 20 }}>
                {avatars}{" "}
              </Avatar.Group>
              <Button
                icon={<FilterOutlined />}
                onClick={handleResetFilter}
                style={{ marginLeft: 20 }}
              >
                Reset Filter
              </Button>
            </div>
            <div>
              <ThunderboltFilled
                style={{ fontSize: 20, marginRight: 10, color: "#FF4500" }}
              />
              <Tag color="red" style={{ fontSize: 17 }}>
                <FieldTimeOutlined /> {currentSprint.dayleft} days remaining
              </Tag>
              <Tag color="cyan" style={{ fontSize: 17 }}>
                Current Sprint : Sprint {currentSprint.sprintNumber}
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
              minWidth: `${statuses.length * 300 + 10}px`,
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
              </>
            ))}
          </div>
          <Modal
            title="Task Details"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={1200}
            style={{ top: 30 }}
          >
            <TaskDetail idTask={selectedTask}></TaskDetail>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Dashboard;
