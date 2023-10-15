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
} from "antd";
import { useState } from "react";
const { Title, Text } = Typography;
const { Item } = List;
import {
  PlusOutlined,
  CheckSquareOutlined,
  UnorderedListOutlined,
  MonitorOutlined,
  PullRequestOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const TaskDetail = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "User1",
      text: "This is the first comment.",
    },
    {
      id: 2,
      author: "User2",
      text: "This is another comment.",
    },
  ]);
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        author: "UserX",
        text: comment,
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const historyData = [
    {
      time: "2023-10-01",
      status: "To Do",
      statusKey: "todo",
    },
    {
      time: "2023-10-02",
      status: "In Progress",
      statusKey: "inProgress",
    },
    {
      time: "2023-10-03",
      status: "Testing",
      statusKey: "testing",
    },
    {
      time: "2023-10-02",
      status: "In Progress",
      statusKey: "inProgress",
    },
    {
      time: "2023-10-03",
      status: "Testing",
      statusKey: "testing",
    },
    {
      time: "2023-10-04",
      status: "Done",
      statusKey: "done",
    },
  ];

  const statusColors = {
    todo: "#F29F05",
    inProgress: "#F99A9C",
    testing: "#F2D98D",
    done: "#84D9BA",
  };

  const statusPercentages = {
    todo: 25,
    inProgress: 50,
    testing: 75,
    done: 100,
  };

  const statusIcons = {
    todo: <UnorderedListOutlined />,
    inProgress: <PullRequestOutlined />,
    testing: <MonitorOutlined />,
    done: <CheckSquareOutlined />,
  };

  return (
    <>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col
          span={16}
          style={{
            overflow: "auto",
            maxHeight: "550px",
            lineHeight: 2.5,
            width: "100%",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text>
              <Tag color="blue"> Project ABC </Tag>/{" "}
              <Tag color="yellow"> ID: 1 </Tag>
            </Text>
            <Title style={{ marginBottom: 8 }}>Build Task Layout</Title>
            <Text>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.Description: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.Description: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.Description: Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.Description: Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.Description: Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.Description: Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.Description:
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.Description: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.Description: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.Description: Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.Description: Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </Text>
            <Divider style={{ border: "1px solid gray" }}></Divider>
            <Form
              style={{
                marginLeft: 8,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Form.Item label={<Avatar>A</Avatar>} style={{ marginBottom: 8 }}>
                <Input.TextArea
                  name="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Input your comment"
                ></Input.TextArea>
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  icon={<PlusOutlined />}
                  className="custom-btn-add-d"
                  htmlType="submit"
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </Button>
              </div>
            </Form>
            <List
              header={<div>Comments</div>}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <Item>
                  <Item.Meta
                    avatar={<Avatar>{item.author.charAt(0)}</Avatar>}
                    title={`Comment by ${item.author}`}
                    description={item.text}
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
                <Text>Feature</Text>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <Tag color="red">Status</Tag>
              </Col>
              <Col span={18}>
                <Text>In Progress</Text>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <Tag color="purple">Sprint</Tag>
              </Col>
              <Col span={18}>
                <Text>Sprint 1</Text>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <Tag color="geekblue">Assignee</Tag>
              </Col>
              <Col span={18}>
                <Text>John Doe</Text>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <Tag color="magenta">Reporter</Tag>
              </Col>
              <Col span={18}>
                <Text>Jane Smith</Text>
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
              dataSource={historyData}
              renderItem={(item) => (
                <Item>
                  <Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: statusColors[item.statusKey],
                        }}
                      >
                        {statusIcons[item.statusKey]}
                      </Avatar>
                    }
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>{item.time}</Text>
                        <Text>{item.status}</Text>
                      </div>
                    }
                    description={
                      <Progress
                        size="small"
                        percent={statusPercentages[item.statusKey]}
                        showInfo={false}
                        strokeColor={statusColors[item.statusKey]}
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
  );
};

export default TaskDetail;
