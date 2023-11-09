import {
  BarsOutlined,
  EditOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDSAllSprintSelector } from "../../Redux/Selector";
import {
  createSprint,
  editSprint,
  getDSSprint,
} from "../../Redux/Slices/ManagerZone/ManagerSlice";
const { Text } = Typography;

const SprintController = () => {
  const [form] = Form.useForm();

  const handleFormEdit = (values) => {
    const data = { ...values };
    if (data) {
      dispatch(editSprint(data))
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

  const handleCreateSprint = () => {
    const projectID = sessionStorage.getItem("current_project");
    if (projectID) {
      dispatch(createSprint(projectID))
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

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);
  const dsAllSprint = useSelector(getDSAllSprintSelector);

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

  return (
    <div style={{ maxHeight: 500, overflow: "auto" }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 10,
              marginBottom: 20,
            }}
          >
            <Popconfirm
              title="Are you sure you want to create a sprint?"
              onConfirm={handleCreateSprint}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<PlusCircleOutlined />}
                htmlType="submit"
                className="custom-btn-add"
              >
                Create sprint
              </Button>
            </Popconfirm>
          </div>
          <Collapse defaultActiveKey={[]} style={{ marginRight: 10 }}>
            {dsAllSprint.map((sprint, index) => (
              <Collapse.Panel
                key={index}
                header={<Text>Sprint {sprint.sprintNumber}</Text>}
              >
                <Form
                  {...layout}
                  form={form[index]}
                  key={index}
                  onFinish={handleFormEdit}
                  style={{
                    maxHeight: 600,
                    marginTop: "10px",
                    overflow: "auto",
                  }}
                >
                  <Row gutter={24} style={{ marginRight: "5px" }}>
                    <Col span={24}>
                      <Form.Item
                        labelCol={6}
                        wrapperCol={18}
                        label={
                          <Text>
                            <BarsOutlined /> Total day this sprint
                          </Text>
                        }
                        name="sprintDuration"
                        initialValue={sprint.sprintDuration}
                        rules={[
                          {
                            required: "true",
                            type: "number",
                            min: 1,
                            message:
                              "Total day this sprint must be larger than 1",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "50%" }}
                          placeholder="Input number days ofthis sprint"
                        ></InputNumber>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24} style={{ marginRight: "5px" }}>
                    <Col span={24}>
                      <Form.Item
                        labelCol={6}
                        wrapperCol={18}
                        initialValue={sprint.sprintDescription}
                        label={
                          <Text>
                            <FormOutlined /> Project descriptions
                          </Text>
                        }
                        name="sprintDescription"
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
                        name="sprintID"
                        initialValue={sprint.id}
                        style={{ display: "none" }}
                      ></Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24} style={{ marginRight: "5px" }}>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        icon={<EditOutlined style={{ marginTop: 5 }} />}
                        htmlType="submit"
                        className="custom-btn-save-and-add"
                      >
                        Edit sprint
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Collapse.Panel>
            ))}
          </Collapse>
        </>
      )}
    </div>
  );
};

export default SprintController;
