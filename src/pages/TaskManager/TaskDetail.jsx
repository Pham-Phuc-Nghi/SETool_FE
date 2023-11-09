import {
  Row,
  Col,
  Typography,
  Space,
  Form,
  Input,
  Avatar,
  Button,
  Divider,
  List,
  Progress,
  Tag,
  Spin,
  message,
  Menu,
  Dropdown,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
const { Title, Text } = Typography;
const { Item } = List;
import {
  PlusOutlined,
  CheckSquareOutlined,
  UnorderedListOutlined,
  MonitorOutlined,
  PullRequestOutlined,
  HistoryOutlined,
  ArrowDownOutlined,
  RiseOutlined,
  IssuesCloseOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getDSMytaskDetail,
} from "../../Redux/Slices/TaskManager/TaskManagerSlice";
import { getDSMyTaskDetailSelector } from "../../Redux/Selector";
import dayjs from "dayjs";
const TaskDetail = ({ idTask }) => {
  const taskID = idTask;
  const [refreshTable, setRefreshTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const taskDetail = useSelector(getDSMyTaskDetailSelector);
  const [form] = Form.useForm();
  const username_current = sessionStorage.getItem("name_current");

  useEffect(() => {
    if (taskID) {
      dispatch(getDSMytaskDetail(taskID))
        .unwrap()
        .then(() => {
          setLoading(false);
          setRefreshTable(!refreshTable);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data: ", error);
        });
    }
  }, [refreshTable, taskID, dispatch]);

  const handleFormSubmitComment = (values) => {
    const data = { ...values, taskID };
    if (data) {
      dispatch(createComment(data))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          form.resetFields();
          setRefreshTable(!refreshTable);
        })
        .catch((error) => {
          message.error(error, 1.5);
        });
    }
  };

  const statusColors = {
    1: "#F29F05",
    2: "#F99A9C",
    3: "#F2D98D",
    4: "#84D9BA",
  };

  const statusPercentages = {
    1: 25,
    2: 50,
    3: 75,
    4: 100,
  };

  const statusIcons = {
    1: <UnorderedListOutlined />,
    2: <PullRequestOutlined />,
    3: <MonitorOutlined />,
    4: <CheckSquareOutlined />,
  };
  const [idComment, setIdComment] = useState(null);

  const handleDeleteComments = () => {
    if (idComment !== null) {
      dispatch(deleteComment(idComment))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          setRefreshTable(!refreshTable);
        })
        .catch((error) => {
          message.error(error, 1.5);
        });
    }
  };

  const menu = (
    <Menu>
      <Popconfirm
        title="Are you sure you want to delete comment?"
        onConfirm={handleDeleteComments}
        okText="Yes"
        cancelText="No"
      >
        <Menu.Item key="1" icon={<DeleteOutlined />}>
          Delete comment
        </Menu.Item>
      </Popconfirm>
    </Menu>
  );

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
          <Row gutter={24} style={{ width: "100%" }}>
            <Col
              span={16}
              style={{
                overflow: "auto",
                maxHeight: "580px",
                lineHeight: 2.5,
                width: "100%",
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>
                  <Tag color="yellow"> task ID: {taskID} </Tag>
                </Text>
                <Title style={{ marginBottom: 8 }}>{taskDetail.taskName}</Title>
                <Text>{taskDetail.taskDescription}</Text>
                <Divider style={{ border: "1px solid gray" }}></Divider>
                <Form
                  form={form}
                  onFinish={handleFormSubmitComment}
                  style={{
                    marginLeft: 8,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Item
                    label={<Avatar>A</Avatar>}
                    name="commentContent"
                    style={{ marginBottom: 8 }}
                  >
                    <Input.TextArea placeholder="Input your comment"></Input.TextArea>
                  </Form.Item>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      icon={<PlusOutlined />}
                      className="custom-btn-add-d"
                      htmlType="submit"
                    >
                      Add Comment
                    </Button>
                  </div>
                </Form>
                <List
                  header={<div>Comments</div>}
                  itemLayout="horizontal"
                  dataSource={taskDetail.comment}
                  renderItem={(item) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{item.userName.charAt(0)}</Avatar>}
                        title={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>
                              {item.userName} -{" "}
                              {dayjs(item.commentDate).format(
                                "HH:mm - DD/MM/YYYY"
                              )}
                            </Text>
                            {username_current === item.userName ? (
                              <Dropdown
                                arrow={{
                                  pointAtCenter: true,
                                }}
                                overlay={menu}
                                placement="topRight"
                              >
                                <span>
                                  <EllipsisOutlined
                                    onClick={() => setIdComment(item.id)}
                                    style={{
                                      marginRight: 10,
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </Dropdown>
                            ) : (
                              ""
                            )}
                          </div>
                        }
                        description={item.commentContent}
                      />
                    </Item>
                  )}
                />
              </Space>
            </Col>
            <Col
              span={8}
              style={{ overflow: "auto", maxHeight: "600px", lineHeight: 2.5 }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Row gutter={24}>
                  <Col span={6}>
                    <Tag color="blue">Task Type</Tag>
                  </Col>
                  <Col span={18}>
                    <Text>{taskDetail.taskType !== 1 ? "DEV" : "QA"}</Text>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Tag color="red">Status</Tag>
                  </Col>
                  <Col span={18}>
                    <Text>
                      {taskDetail.taskStatus === 1
                        ? "To Do"
                        : taskDetail.taskStatus === 2
                        ? "In Progress"
                        : taskDetail.taskStatus === 3
                        ? "Testing"
                        : taskDetail.taskStatus === 4
                        ? "Done"
                        : "Unknown"}
                    </Text>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Tag color="blue">Task Priortity</Tag>
                  </Col>
                  <Col span={18}>
                    <Text>
                      {taskDetail.taskPriority === 0 ? (
                        <Tag color="yellow">
                          <ArrowDownOutlined /> LOW
                        </Tag>
                      ) : taskDetail.taskPriority === 1 ? (
                        <Tag color="green">
                          <RiseOutlined /> MEDIUM
                        </Tag>
                      ) : taskDetail.taskPriority === 2 ? (
                        <Tag color="red">
                          <IssuesCloseOutlined /> HIGH
                        </Tag>
                      ) : (
                        "Unknown"
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Tag color="purple">Sprint</Tag>
                  </Col>
                  <Col span={18}>
                    <Text>Sprint {taskDetail.sprintNumber}</Text>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Tag color="geekblue">Assignee</Tag>
                  </Col>
                  <Col span={18}>
                    <Text>
                      {taskDetail.assigneeName
                        ? taskDetail.assigneeName
                        : "_____"}
                    </Text>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Tag color="magenta">Reporter</Tag>
                  </Col>
                  <Col span={18}>
                    <Text>
                      {taskDetail.reporterName
                        ? taskDetail.reporterName
                        : "_____"}
                    </Text>
                  </Col>
                </Row>
                <List
                  style={{ width: "100%" }}
                  header={
                    <div>
                      <HistoryOutlined /> History
                    </div>
                  }
                  itemLayout="horizontal"
                  dataSource={taskDetail.history}
                  renderItem={(item) => (
                    <Item>
                      <Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: statusColors[item.taskState],
                            }}
                          >
                            {statusIcons[item.taskState]}
                          </Avatar>
                        }
                        title={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>
                              {item.committer} -{" "}
                              {dayjs(item.commitDate).format("DD/MM/YYYY")}
                            </Text>
                            <Text>
                              {item.taskState === 1
                                ? "To Do"
                                : item.taskState === 2
                                ? "In Progress"
                                : item.taskState === 3
                                ? "Testing"
                                : item.taskState === 4
                                ? "Done"
                                : "Unknown"}
                            </Text>
                          </div>
                        }
                        description={
                          <Progress
                            size="small"
                            percent={statusPercentages[item.taskState]}
                            showInfo={false}
                            strokeColor={statusColors[item.taskState]}
                          />
                        }
                      />
                    </Item>
                  )}
                />
              </Space>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

TaskDetail.propTypes = {
  idTask: PropTypes.string.isRequired,
};

export default TaskDetail;
