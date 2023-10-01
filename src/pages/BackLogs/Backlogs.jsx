import { Avatar, Button, Input, List, Modal, Skeleton, Typography } from "antd";
import { UserOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditBacklogs from "./EditBacklogs";
import AddBacklogs from "./AddBacklogs";
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

  const [isModalEdit, setIsModalEdit] = useState(false);

  const showModalEdit = () => {
    setIsModalEdit(true);
  };

  const closeEditModal = () => {
    setIsModalEdit(false);
  };

  const [isModalAdd, setIsModalAdd] = useState(false);

  const showModalTaoDon = () => {
    setIsModalAdd(true);
  };

  const closeAddModal = () => {
    setIsModalAdd(false);
  };



  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <Input.Search
          allowClear
          placeholder="Input task name"
          style={{ width: "25%" }}
        //   onSearch={handleSearch}
        //   onChange={(e) => handleSearch(e.target.value)}
        //   value={searchText}
        />
        <Button
          className="custom-btn-export"
          icon={<PlusOutlined />}
          onClick={showModalTaoDon}
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
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={showModalEdit}
                >
                  Edit
                </Button>,
                <Button key="delete" icon={<DeleteOutlined />} danger>
                  Delete
                </Button>,
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
                <Text>John</Text>
              </Skeleton>
            </List.Item>
          )}
        />
        <Modal
          open={isModalEdit}
          footer={null}
          onCancel={closeEditModal}
          title="Edit backlogs"
        >
          <EditBacklogs onClose={closeEditModal}></EditBacklogs>
        </Modal>
        <Modal
          open={isModalAdd}
          footer={null}
          onCancel={closeAddModal}
          title="Add backlogs"
        >
          <AddBacklogs onClose={closeAddModal}></AddBacklogs>
        </Modal>
      </div>{" "}
    </>
  );
};

export default Backlogs;
