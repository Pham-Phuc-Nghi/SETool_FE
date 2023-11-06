import {
  CheckSquareOutlined,
  MonitorOutlined,
  PullRequestOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Col, List, Progress, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { getProgressDetails } from "../../Redux/Slices/ManagerZone/ManagerSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProgressDetailSelector } from "../../Redux/Selector";
const { Title, Text } = Typography;

const nhanVienTongStyle = {
  borderRadius: "30%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
};

const iconStyle = {
  fontSize: "36px",
  color: "white",
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const refreshTable = false;
  const progressDetails = useSelector(getProgressDetailSelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getProgressDetails(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  const tasksData = [
    {
      title: "TODO tasks",
      count: progressDetails && progressDetails.todoTaskCount,
      color: "#FFCF96",
      icon: <UnorderedListOutlined style={iconStyle} />,
    },
    {
      title: "IN PROGRESS tasks",
      count: progressDetails && progressDetails.inProgressTaskCount,
      color: "#F99A9C",
      icon: <PullRequestOutlined style={iconStyle} />,
    },
    {
      title: "TESTING tasks",
      count: progressDetails && progressDetails.testingTaskCount,
      color: "#F2D98D",
      icon: <MonitorOutlined style={iconStyle} />,
    },
    {
      title: "DONE tasks",
      count: progressDetails && progressDetails.doneTaskCount,
      color: "#84D9BA",
      icon: <CheckSquareOutlined style={iconStyle} />,
    },
  ];

  const progress = [
    {
      id: 1,
      name: "Current Progress",
      number: progressDetails && progressDetails.doneTaskCount,
      total: progressDetails && progressDetails.totalTask,
      percent: progressDetails && progressDetails.progressPercentage,
    },
    {
      id: 2,
      name: "Day left",
      number: progressDetails && progressDetails.currentDay,
      total: progressDetails && progressDetails.totalDayInProject,
      percent: progressDetails && progressDetails.periodPercentage,
    },
  ];

  const getStatusColor = (percent) => {
    if (percent <= 25) {
      return "#F29F05";
    } else if (percent <= 50) {
      return "#F99A9C";
    } else if (percent <= 75) {
      return "#F2D98D";
    } else if (percent === 100) {
      return "#84D9BA";
    } else {
      return "#F2D98D";
    }
  };

  const currentProgressPercent = progress[0].percent;

  const isDayLeftGreater = progress[1].percent > currentProgressPercent;
  const currentProgressColor = isDayLeftGreater ? "red" : "black";
  const currentProgressPercentColor = isDayLeftGreater
    ? "red"
    : getStatusColor(progress[0].percent);
  const currentProgressIcon = isDayLeftGreater ? (
    <WarningOutlined style={{ color: "red" }} />
  ) : null;

  const [hoveredCard, setHoveredCard] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: "60vh",
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
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "90%",
                margin: "0 auto",
                textAlign: "center",
                lineHeight: 7,
                marginTop: 30,
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={progress}
                renderItem={(task, taskIndex) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 800,
                              color:
                                taskIndex === 0
                                  ? currentProgressColor
                                  : "black",
                            }}
                          >
                            {task.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 800,
                              color:
                                taskIndex === 0
                                  ? currentProgressColor
                                  : "black",
                            }}
                          >
                            {taskIndex === 0 ? (
                              <span>
                                {currentProgressIcon} {task.number} /{" "}
                                {task.total}
                              </span>
                            ) : (
                              <span>
                                {task.number} / {task.total}
                              </span>
                            )}
                          </Text>
                        </div>
                      }
                      description={
                        <Progress
                          strokeWidth={14}
                          percent={task.percent}
                          format={(percent) => (
                            <span
                              style={{
                                color:
                                  taskIndex === 0
                                    ? currentProgressPercentColor
                                    : getStatusColor(percent),
                              }}
                            >
                              {percent}%
                            </span>
                          )}
                          strokeColor={
                            taskIndex === 0
                              ? currentProgressPercentColor
                              : getStatusColor(task.percent)
                          }
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <div style={{ bottom: "0" }}>
              <Row gutter={20} style={{ marginTop: 30 }}>
                {tasksData.map((task, index) => (
                  <Col span={6} key={index}>
                    <Card
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      title={
                        <div
                          style={{ marginTop: 30, textAlign: "-webkit-center" }}
                        >
                          <div style={nhanVienTongStyle}>{task.icon}</div>
                          <Title level={3} style={{ marginTop: 25 }}>
                            {task.title}
                          </Title>
                        </div>
                      }
                      headStyle={{ borderBottom: 0 }}
                      style={{
                        backgroundColor: task.color,
                        opacity: 0.9,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transform:
                          hoveredCard === index ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <Text style={{ fontSize: 50, color: "white" }} strong>
                        {task.count}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
