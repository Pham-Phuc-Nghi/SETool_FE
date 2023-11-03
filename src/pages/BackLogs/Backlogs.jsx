import {
  Button,
  Drawer,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Select,
  Skeleton,
  Spin,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import EditBacklogs from "./EditBacklogs";
import AddBacklogs from "./AddBacklogs";
import Assignee from "./Assignee";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBacklogs,
  getDSTask,
} from "../../Redux/Slices/Backlogs/BacklogsSlice";
import {
  getDSAllSprintSelector,
  getDSMemberAllSelector,
  getDSTaskAllSelector,
} from "../../Redux/Selector";
import { setKeyId } from "../../Redux/Slices/StateChange/StateChangeSlice";
import TaskDetail from "../TaskManager/TaskDetail";
import { getDSSprint } from "../../Redux/Slices/ManagerZone/ManagerSlice";
import { getDSMember } from "../../Redux/Slices/Collaboration/CollaborationSlice";
const { Text } = Typography;
const Backlogs = () => {
  const dispatch = useDispatch();
  const dsTaskAll = useSelector(getDSTaskAllSelector);
  const [refreshTable, setRefreshTable] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskDoubleClick = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getDSTask(projectID))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [refreshTable]);

  //sprint

  const listSprint = useSelector(getDSAllSprintSelector);

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

  const [sprintNumberFilter, setSprintNumberFilter] = useState();

  const handleSelectSprint = (id) => {
    const selectedSprint = listSprint.find((sprint) => sprint.id === id);
    if (selectedSprint) {
      const sprintNumber = selectedSprint.sprintNumber;
      // console.log("Selected Sprint Number:", sprintNumber);
      setSprintNumberFilter(sprintNumber);
    } else {
      // Xóa dữ liệu filter khi nút xóa được ấn
      setSprintNumberFilter(undefined);
    }
  };

  //member

  const listMember = useSelector(getDSMemberAllSelector);

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

  let option_list_Member;
  option_list_Member = listMember.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  const [memberFilter, setMemberFilter] = useState();

  const handleSelectMember = (id) => {
    const selectedMember = listMember.find((sprint) => sprint.id === id);
    if (selectedMember) {
      const Member = selectedMember.name;
      // console.log("Selected Sprint Number:", sprintNumber);
      setMemberFilter(Member);
    } else {
      setMemberFilter(undefined);
    }
  };

  const [filteredData, setFilteredData] = useState(dsTaskAll);
  useEffect(() => {
    if (dsTaskAll.data !== undefined) {
      const newFilteredData = dsTaskAll.data.filter((_dsTaskAll) => {
        const fullName = `${_dsTaskAll.taskName}`;
        const sprintNumber =
          !sprintNumberFilter || _dsTaskAll.sprintNumber === sprintNumberFilter;
        const memberName =
          !memberFilter ||
          _dsTaskAll.assigneeName === memberFilter ||
          _dsTaskAll.reporterName === memberFilter;
        return (
          fullName.toLowerCase().includes(searchText.toLowerCase()) &&
          sprintNumber &&
          memberName
        );
      });
      setFilteredData(newFilteredData);
    }
  }, [searchText, sprintNumberFilter, memberFilter, dsTaskAll]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteBacklogs(id))
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

  const [isDrawerAdd, setIsDrawerAdd] = useState(false);
  const [form] = Form.useForm();

  const showAddDrawer = () => {
    setIsDrawerAdd(true);
  };

  const closeAddDrawer = () => {
    setIsDrawerAdd(false);
    form.resetFields();
    setRefreshTable(!refreshTable);
  };

  const [isDrawerEdit, setIsDrawerEdit] = useState(false);
  const [form1] = Form.useForm();

  const showDrawerEdit = (id) => {
    if (id) {
      dispatch(setKeyId(id));
      setIsDrawerEdit(true);
    }
  };

  const closeEditDrawer = () => {
    form1.resetFields();
    dispatch(setKeyId(null));
    setIsDrawerEdit(false);
    setRefreshTable(!refreshTable);
  };

  const [isModalAssignee, setIsModalAssignee] = useState(false);
  const [form2] = Form.useForm();

  const showModalAssignee = (id) => {
    if (id) {
      dispatch(setKeyId(id));
      setIsModalAssignee(true);
    }
  };

  const closeAssigneeModal = () => {
    setIsModalAssignee(false);
    dispatch(setKeyId(null));
    form2.resetFields();
    setRefreshTable(!refreshTable);
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
          <div style={{ marginBottom: 20 }}>
            <Input.Search
              allowClear
              placeholder="Input task name"
              style={{ width: "25%" }}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
            />
            <Select
              style={{
                width: "20%",
                marginBottom: 20,
                textAlign: "center",
                marginLeft: 10,
              }}
              placeholder="Choose sprint"
              dropdownStyle={{ textAlign: "center" }}
              onChange={handleSelectSprint}
              value={sprintNumberFilter ? `Sprint ${sprintNumberFilter}` : null}
              allowClear
              options={option_list_Sprint}
            ></Select>
            <Select
              style={{
                width: "20%",
                marginBottom: 20,
                textAlign: "center",
                marginLeft: 10,
              }}
              placeholder="Choose member name"
              dropdownStyle={{ textAlign: "center" }}
              onChange={handleSelectMember}
              value={memberFilter ? memberFilter : null}
              allowClear
              options={option_list_Member}
            ></Select>
            <Button
              className="custom-btn-add-d"
              icon={<PlusOutlined />}
              onClick={showAddDrawer}
              style={{ float: "right" }}
            >
              Add Backlogs
            </Button>
          </div>
          <div>
            <List
              style={{ maxHeight: 500, overflow: "auto" }}
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={filteredData}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button
                      key="assignee"
                      className="custom-btn-update"
                      icon={<UserAddOutlined />}
                      onClick={() => {
                        showModalAssignee(item.id);
                      }}
                    >
                      Assignee & review
                    </Button>,
                    <Button
                      key="edit"
                      className="custom-btn-watch-report"
                      icon={<EditOutlined />}
                      onClick={() => {
                        showDrawerEdit(item.id);
                      }}
                    >
                      Edit
                    </Button>,
                    <Popconfirm
                      key="delete"
                      title="Are you sure you want to delete this item?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        className="custom-btn-del"
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={loading} active>
                    <List.Item.Meta
                      title={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Text style={{ marginTop: 10 }}>
                            <Tag color="orange">Sprint {item.sprintNumber}</Tag>
                          </Text>
                          <Text>
                            <Tag color="blue">Task Name </Tag>{" "}
                            <Tooltip title="Click to see Task Detail">
                              <a onClick={() => handleTaskDoubleClick(item.id)}>
                                {item.taskName}
                              </a>
                            </Tooltip>
                          </Text>
                        </div>
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Text>
                        <Tag style={{ fontSize: 14 }} color="purple">
                          Assignee{" "}
                        </Tag>
                        {item.assigneeName}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        <Tag style={{ fontSize: 14 }} color="green">
                          Reviewer{" "}
                        </Tag>
                        {item.reporterName}
                      </Text>
                    </div>
                  </Skeleton>
                </List.Item>
              )}
            />
            <Drawer
              title="Edit backlogs"
              placement="right"
              closable={true}
              visible={isDrawerEdit}
              onClose={closeEditDrawer}
              width={700}
              style={{ top: 42 }}
            >
              <EditBacklogs
                onClose={closeEditDrawer}
                form1={form1}
              ></EditBacklogs>
            </Drawer>
            <Drawer
              title="Add backlogs"
              placement="right"
              closable={true}
              visible={isDrawerAdd}
              onClose={closeAddDrawer}
              width={700}
              style={{ top: 42 }}
            >
              <AddBacklogs onClose={closeAddDrawer} form={form}></AddBacklogs>
            </Drawer>
            <Modal
              title="Assignee & review"
              open={isModalAssignee}
              footer={null}
              onCancel={closeAssigneeModal}
              width={500}
            >
              <Assignee form={form2} onClose={closeAssigneeModal}></Assignee>
            </Modal>
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
          </div>
        </>
      )}
    </>
  );
};

export default Backlogs;
