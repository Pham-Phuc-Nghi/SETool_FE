import { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Spin, Table, Input, Select, Modal, Form } from "antd";
import AddMember from "./AddMember";

const Collab = () => {
  const [loading, setLoading] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [form] = Form.useForm();

  const showModalTaoDon = () => {
    setIsModalAdd(true);
  };

  const closeAddModal = () => {
    setIsModalAdd(false);
    form.resetFields();
  };

  const dummyData = [
    {
      key: 1,
      avatar: <Avatar icon={<UserOutlined />} />,
      tenNhanVien: "John Doe",
      email: "john@example.com",
    },
    {
      key: 2,
      avatar: <Avatar icon={<UserOutlined />} />,
      tenNhanVien: "Jane Smith",
      email: "jane@example.com",
    },
    {
      key: 3,
      avatar: <Avatar icon={<UserOutlined />} />,
      tenNhanVien: "Bob Johnson",
      email: "bob@example.com",
    },
  ];

  const handleDelete = (key) => {
    // Implement delete logic here
    console.log(`Delete item with key ${key}`);
  };

  const column = [
    {
      title: (
        <span>
          <UserOutlined /> Tên thành viên
        </span>
      ),
      dataIndex: "avatarAndName",
      key: "avatarAndName",
      width: 100,
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.avatar}
          <span style={{ marginLeft: "8px" }}>{record.tenNhanVien}</span>
        </div>
      ),
    },
    {
      title: (
        <span>
          <MailOutlined /> Email
        </span>
      ),
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <div>
          <Select
            style={{ width: "40%", marginRight: 10 }}
            placeholder="Choose role"
            defaultValue={1}
            options={[
              {
                value: 1,
                label: "Member",
              },
              {
                value: 2,
                label: "Manager",
              },
            ]}
          ></Select>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

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
          <Spin size="large" style={{ fontSize: "32px" }} />
        </div>
      ) : (
        <>
          <>
            <Input.Search
              allowClear
              placeholder="Input member name"
              style={{ width: "25%", marginBottom: 20 }}
            //   onSearch={handleSearch}
            //   onChange={(e) => handleSearch(e.target.value)}
            //   value={searchText}
            />
            <Button
              className="custom-btn-save-and-add"
              icon={<PlusOutlined />}
              // type="primary"
              onClick={showModalTaoDon}
              style={{
                float: "right",
              }}
            >
              Thêm thành viên
            </Button>
          </>
          <Table
            scroll={{ x: 600 }}
            columns={column}
            bordered
            dataSource={dummyData}
          />
          <Modal
            open={isModalAdd}
            footer={null}
            onCancel={closeAddModal}
            title="Add member"
          >
            <AddMember form={form} ></AddMember>
          </Modal>
        </>
      )}
    </>
  );
};

export default Collab;
