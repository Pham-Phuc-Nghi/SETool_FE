import {
  BarsOutlined,
  CalendarOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { getProjectDetailSelector } from "../../Redux/Selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProject,
  editProject,
  getProjectDetails,
} from "../../Redux/Slices/ManagerZone/ManagerSlice";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const ProjectController = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);
  const projectDetails = useSelector(getProjectDetailSelector);
  const navigate = useNavigate();

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getProjectDetails(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  const handleEditProjectDetails = (values) => {
    const data = { ...values };

    if (data) {
      dispatch(editProject(data))
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

  const handleDeleteProject = () => {
    const projectID = sessionStorage.getItem("current_project");
    if (projectID) {
      dispatch(deleteProject(projectID))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          setRefreshTable(!refreshTable);
          navigate("/homepage")
        })
        .catch((error) => {
          message.error(error, 1.5);
        });
    }
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

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
          <Card style={{ marginTop: 30 }} bordered>
            <Form
              {...layout}
              form={form}
              onFinish={handleEditProjectDetails}
              style={{ maxHeight: 600, marginTop: "10px", overflow: "auto" }}
            >
              <Form.Item
                label={
                  <Text>
                    <BarsOutlined /> Project name
                  </Text>
                }
                name="projectName"
                initialValue={projectDetails && projectDetails.projectName}
                rules={[
                  {
                    required: "true",
                    message: "Project name must no be a blank",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Input project name"
                ></Input>
              </Form.Item>
              <Form.Item
                label={
                  <Text>
                    <BarsOutlined /> Total sprint
                  </Text>
                }
                name="projectTotalSprint"
                initialValue={
                  projectDetails && projectDetails.projectTotalSprint
                }
                rules={[
                  {
                    required: "true",
                    type: "number",
                    min: 0,
                    message: "Sprint must be large than one",
                  },
                ]}
              >
                <Input
                  disabled
                  style={{ width: "100%" }}
                  placeholder="Input sprint"
                ></Input>
              </Form.Item>
              <Form.Item
                label={
                  <Text>
                    <CalendarOutlined /> Start date
                  </Text>
                }
                name="projectStartDay"
                initialValue={
                  projectDetails && dayjs(projectDetails.projectStartDay)
                }
                rules={[
                  {
                    required: true,
                    message: "projectStartDay must not be a blank",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "50%" }}
                  disabled
                  disabledDate={(current) => {
                    const currentDate = dayjs(current);
                    const today = dayjs();
                    return currentDate.isBefore(today, "day");
                  }}
                  format="DD/MM/YYYY"
                ></DatePicker>
              </Form.Item>
              <Form.Item
                label={
                  <Text>
                    <CalendarOutlined /> End date
                  </Text>
                }
                name="projectEndDay"
                initialValue={
                  projectDetails && dayjs(projectDetails.projectEndDay)
                }
                rules={[
                  {
                    required: true,
                    message: "projectEndDay must not be a blank",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "50%" }}
                  disabled
                  disabledDate={(current) => {
                    const currentDate = dayjs(current);
                    const today = dayjs();
                    return currentDate.isBefore(today, "day");
                  }}
                  format="DD/MM/YYYY"
                ></DatePicker>
              </Form.Item>
              <Form.Item
                label={
                  <Text>
                    <FormOutlined /> Project descriptions
                  </Text>
                }
                name="projectDescription"
                initialValue={
                  projectDetails && projectDetails.projectDescription
                }
                rules={[
                  {
                    required: "true",
                    message: "Description must no be a blank",
                  },
                ]}
              >
                <Input.TextArea placeholder="Input description about the project"></Input.TextArea>
              </Form.Item>
              <Form.Item
                name="projectDayPerSprint"
                initialValue={
                  projectDetails && projectDetails.projectDayPerSprint
                }
                style={{ display: "none" }}
              ></Form.Item>
              <Row gutter={24} style={{ marginRight: "5px" }}>
                <Col
                  span={24}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Popconfirm
                    title="Are you sure you want to delete project?"
                    onConfirm={handleDeleteProject}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      className="custom-btn-del"
                      style={{ marginRight: 10 }}
                    >
                      Delete project
                    </Button>
                  </Popconfirm>
                  <Button
                    icon={<PlusCircleOutlined style={{ marginTop: 5 }} />}
                    className="custom-btn-save-and-add"
                    htmlType="submit"
                  >
                    Edit project
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
};

export default ProjectController;
