import {
  Avatar,
  Button,
  Drawer,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Skeleton,
  Typography,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import EditBacklogs from "./EditBacklogs";
import AddBacklogs from "./AddBacklogs";
import Assignee from "./Assignee";
const { Text } = Typography;
const Backlogs = () => {
  const dummyData = [
    {
      key: 1,
      loading: false,
      name: {
        last: "Doe",
      },
      picture: {
        large: "https://example.com/avatar1.jpg",
      },
    },
    {
      key: 2,
      loading: false,
      name: {
        last: "Smith",
      },
      picture: {
        large: "https://example.com/avatar2.jpg",
      },
    },
    {
      key: 3,
      loading: false,
      name: {
        last: "Johnson",
      },
      picture: {
        large: "https://example.com/avatar3.jpg",
      },
    },
  ];

  const [isDrawerAdd, setIsDrawerAdd] = useState(false);
  const [form] = Form.useForm();

  const showAddDrawer = () => {
    setIsDrawerAdd(true);
  };

  const closeAddDrawer = () => {
    setIsDrawerAdd(false);
    form.resetFields();
  };

  const [isDrawerEdit, setIsDrawerEdit] = useState(false);
  const [form1] = Form.useForm();

  const showDrawerEdit = () => {
    setIsDrawerEdit(true);
  };

  const closeEditDrawer = () => {
    setIsDrawerEdit(false);
    form1.resetFields();
  };

  const [isModalAssignee, setIsModalAssignee] = useState(false);
  const [form2] = Form.useForm();

  const showModalAssignee = () => {
    setIsModalAssignee(true);
  };

  const closeAssigneeModal = () => {
    setIsModalAssignee(false);
    form2.resetFields();
  };

  const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState(dsTangCa);

  // useEffect(() => {
  //   const newFilteredData = dsTangCa.filter((_dsTangCa) => {
  //     const fullName = `${_dsTangCa.staff.lastName} ${_dsTangCa.staff.firstName}`;
  //     return fullName.toLowerCase().includes(searchText.toLowerCase());
  //   });
  //   setFilteredData(newFilteredData);
  // }, [searchText, dsTangCa]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = () => {
  };

  return (
    <>
      <div style={{ marginBottom: 40 }}>
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
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={dummyData}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key="assignee"
                  className="custom-btn-update"
                  icon={<UserAddOutlined />}
                  onClick={showModalAssignee}
                >
                  Assignee & review
                </Button>,
                <Button
                  key="edit"
                  className="custom-btn-watch-report"
                  icon={<EditOutlined />}
                  onClick={showDrawerEdit}
                >
                  Edit
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Are you sure you want to delete this item?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className="custom-btn-del" icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar icon={<UserOutlined />} src={item.picture.large} />
                  }
                  title={<a href="https://ant.design">{item.name?.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <Text>Reviewer: John</Text>
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
          <EditBacklogs onClose={closeEditDrawer} form={form1}></EditBacklogs>
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
  );
};

export default Backlogs;
