import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
import { useState } from "react";
const { Title, Text } = Typography;
const { Item } = List;

const TaskDetail = () => {
  const [comments, setComments] = useState([]); // State để lưu trữ các comment
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value); // Cập nhật comment mới khi người dùng nhập
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]); // Thêm comment mới vào danh sách
      setComment(""); // Xóa nội dung comment sau khi thêm
    }
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
            <Text>Project ABC / ID: 1</Text>
            <Title style={{ marginBottom: 8 }}>Task 123</Title>
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
                 placeholder="Input your comment"></Input.TextArea>
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
      renderItem={(item, index) => (
        <Item>
          <Item.Meta
            avatar={<Avatar>A</Avatar>}
            title={`Comment ${index + 1}`}
            description={item}
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
          <Space direction="vertical">
            <Text>Task Type: Feature</Text>
            <Text>Status: In Progress</Text>
            <Text>Sprint: Sprint 1</Text>
            <Text>Assignee: John Doe</Text>
            <Text>Reporter: Jane Smith</Text>
            <Text>History: Task created on 2023-10-01</Text>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default TaskDetail;
