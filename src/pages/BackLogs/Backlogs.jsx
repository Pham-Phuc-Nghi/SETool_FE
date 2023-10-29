import {
  Button,
  Drawer,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Skeleton,
  Spin,
  Tag,
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
import { getDSTaskAllSelector } from "../../Redux/Selector";
const { Text } = Typography;
const Backlogs = () => {
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
    form1.setFieldsValue({ id });
    setIsDrawerEdit(true);
  };

  const closeEditDrawer = () => {
    setIsDrawerEdit(false);
    form1.resetFields();
    setRefreshTable(!refreshTable);
  };

  const [isModalAssignee, setIsModalAssignee] = useState(false);
  const [form2] = Form.useForm();

  const showModalAssignee = (id) => {
    form2.setFieldsValue({ id });
    setIsModalAssignee(true);
  };

  const closeAssigneeModal = () => {
    setIsModalAssignee(false);
    form2.resetFields();
    setRefreshTable(!refreshTable);
  };

  const dispatch = useDispatch();
  const dsTaskAll = useSelector(getDSTaskAllSelector);
  const [refreshTable, setRefreshTable] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

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

  const [filteredData, setFilteredData] = useState(dsTaskAll);

  useEffect(() => {
    if (dsTaskAll.data !== undefined) {
      const newFilteredData = dsTaskAll.data.filter((_dsTaskAll) => {
        const fullName = `${_dsTaskAll.taskName}`;
        return fullName.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredData(newFilteredData);
    }
  }, [searchText, dsTaskAll]);

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
                      onClick={() => showModalAssignee(item.id)}
                    >
                      Assignee & review
                    </Button>,
                    <Button
                      key="edit"
                      className="custom-btn-watch-report"
                      icon={<EditOutlined />}
                      onClick={() => showDrawerEdit(item.id)}
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
                          <Text>
                            <Tag color="blue">Taskname </Tag> {item.taskName}{" "}
                          </Text>
                          <Text style={{ marginTop: 10 }}>
                            <Tag color="orange">Sprint {item.sprintNumber}</Tag>
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
                form={form1}
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
          </div>
        </>
      )}
    </>
  );
};

export default Backlogs;
