import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
const { Text } = Typography;
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editAssignee,
  getDSTaskAssignee,
} from "../../Redux/Slices/Backlogs/BacklogsSlice";
import {
  getDSAllSprintSelector,
  getDSTaskAssigneeSelector,
  getKeyIdSelector,
  getListDevSelector,
  getListQASelector,
} from "../../Redux/Selector";
import {
  getDSSprint,
  getListDev,
  getListQA,
} from "../../Redux/Slices/ManagerZone/ManagerSlice";

const Assignee = ({ onClose, form }) => {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const dispatch = useDispatch();
  const dsAssignee = useSelector(getDSTaskAssigneeSelector);
  const refreshTable = false;
  const [loading, setLoading] = useState(true);
  const taskID = useSelector(getKeyIdSelector);

console.log("ID: ",taskID)
console.log("data: ",dsAssignee)

  useEffect(() => {
    if (taskID !== null) {
      setLoading(true);
      form.resetFields();
      dispatch(getDSTaskAssignee(taskID))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data: ", error);
        });
    }
  }, [refreshTable, taskID, dispatch,form]);

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSuccessMessageVisible(false);
    onClose();
  };

  const handleFormSubmit = (values) => {
    const data = { ...values, taskID };
    if (data) {
      dispatch(editAssignee(data))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          form.resetFields();
          onClose();
        })
        .catch((error) => {
          message.error(error, 1.5);
        });
    }
  };

  //list dev
  const listDev = useSelector(getListDevSelector);
  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getListDev(projectID));
  }, []);

  let option_list_Dev;
  option_list_Dev = listDev.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  //list QA
  const listQA = useSelector(getListQASelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getListQA(projectID));
  }, []);

  let option_list_QA;

  option_list_QA = listQA.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  //list sprint
  const listSprint = useSelector(getDSAllSprintSelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getDSSprint(projectID));
  }, []);

  let option_list_Sprint;

  option_list_Sprint = listSprint.map((type) => ({
    value: type.id,
    label: "Sprint " + type.sprintNumber,
  }));

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
          <Form
            {...layout}
            form={form}
            onFinish={handleFormSubmit}
            style={{ maxHeight: 598, marginTop: "10px", overflow: "auto" }}
          >
            <Form.Item
              label={<Text>Assignee</Text>}
              name="assigneeID"
              initialValue={dsAssignee && dsAssignee.assigneeID}
              style={{ marginRight: 10 }}
              rules={[
                {
                  required: true,
                  message: "Assignee must not be a blank",
                },
              ]}
            >
              <Select
                style={{ width: "60%" }}
                placeholder="Choose Assignee"
                options={option_list_Dev}
              ></Select>
            </Form.Item>
            <Form.Item
              label={<Text>Reviewer</Text>}
              name="reporterID"
              initialValue={dsAssignee && dsAssignee.reporterID}
              style={{ marginRight: 10 }}
              rules={[
                {
                  required: true,
                  message: "Reviewer must not be a blank",
                },
              ]}
            >
              <Select
                style={{ width: "60%" }}
                placeholder="Choose Reviewer"
                options={option_list_QA}
              ></Select>
            </Form.Item>
            <Form.Item
              label={<Text>Sprint</Text>}
              name="sprintID"
              style={{ marginRight: 10 }}
              initialValue={dsAssignee && dsAssignee.sprintID}
              rules={[
                {
                  required: true,
                  message: "Sprint must not be a blank",
                },
              ]}
            >
              <Select
                style={{ width: "60%" }}
                placeholder="Choose Sprint"
                options={option_list_Sprint}
              ></Select>
            </Form.Item>
            <Form.Item
              label={<Text>Start date</Text>}
              name="taskStartDay"
              initialValue={
                dsAssignee && dsAssignee.taskStartDay
                  ? dayjs(dsAssignee.taskStartDay)
                  : dayjs()
              }
              style={{ marginRight: 10 }}
              rules={[
                {
                  required: true,
                  message: "Please select a start date",
                },
              ]}
            >
              <DatePicker
                placeholder="Select start date"
                style={{ width: "60%" }}
                disabledDate={(current) => {
                  const currentDate = dayjs(current);
                  const today = dayjs();
                  return currentDate.isBefore(today, "day");
                }}
                format="DD/MM/YYYY"
              ></DatePicker>
            </Form.Item>
            <Form.Item
              label={<Text>End date</Text>}
              name="taskEndDay"
              initialValue={
                dsAssignee && dsAssignee.taskEndDay
                  ? dayjs(dsAssignee.taskEndDay)
                  : dayjs()
              }
              style={{ marginRight: 10 }}
              rules={[
                {
                  required: true,
                  message: "Please select an end date",
                },
              ]}
            >
              <DatePicker
                placeholder="Select end date"
                style={{ width: "60%" }}
                disabledDate={(current) => {
                  const currentDate = dayjs(current);
                  const today = dayjs();
                  return currentDate.isBefore(today, "day");
                }}
                format="DD/MM/YYYY"
              ></DatePicker>
            </Form.Item>
            <Row gutter={24} style={{ marginRight: "5px" }}>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Form.Item>
                  <Button
                    className="custom-btn-close"
                    onClick={handleCancel}
                    style={{ marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
                <Button
                  icon={<PlusCircleOutlined style={{ marginTop: 5 }} />}
                  className="custom-btn-save-and-add"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          <Modal
            visible={isSuccessMessageVisible}
            onCancel={() => setIsSuccessMessageVisible(false)}
            onOk={() => setIsSuccessMessageVisible(false)}
          ></Modal>
        </>
      )}
    </>
  );
};

Assignee.propTypes = {
  onClose: PropTypes.func.isRequired,
  form: PropTypes.object,
};

export default Assignee;
