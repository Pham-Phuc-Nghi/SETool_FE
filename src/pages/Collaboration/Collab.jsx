import { useEffect, useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Spin,
  Table,
  Input,
  Select,
  Modal,
  Form,
  message,
} from "antd";
import AddMember from "./AddMember";
import { useDispatch, useSelector } from "react-redux";
import { getDSMemberAllSelector } from "../../Redux/Selector";
import {
  deleteMember,
  editRole,
  getDSMember,
} from "../../Redux/Slices/Collaboration/CollaborationSlice";
import { setShowForm2 } from "../../Redux/Slices/StateChange/StateChangeSlice";

const Collab = () => {
  const [loading, setLoading] = useState(true);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const dsMemberAll = useSelector(getDSMemberAllSelector);
  const [refreshTable, setRefreshTable] = useState(false);

  const showModalTaoDon = () => {
    setIsModalAdd(true);
  };

  const closeAddModal = () => {
    setIsModalAdd(false);
    form.resetFields();
    form2.resetFields();
    dispatch(setShowForm2(false));
    setRefreshTable(!refreshTable);
  };

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

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dsMemberAll);

  useEffect(() => {
    const newFilteredData = dsMemberAll.filter((_dsMemberAll) => {
      const fullName = `${_dsMemberAll.name} `;
      return fullName.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(newFilteredData);
  }, [searchText, dsMemberAll]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = (removeID) => {
    if (removeID) {
      dispatch(deleteMember(removeID))
        .unwrap()
        .then((result) => {
          message.success(result, 1.5);
          setRefreshTable(true);
        })
        .catch((error) => {
          message.error(error, 1.5);
        });
    }
  };

  const [form1] = Form.useForm();

  const handleFormEditRole = (values, changeeID) => {
    const data = { ...values, changeeID };
    console.log("role", data);
    if (data) {
      dispatch(editRole(data))
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
      title: (
        <span>
          <MailOutlined /> Role
        </span>
      ),
      dataIndex: "role",
      key: "role",
      width: 200,
      render: (text, record) => (
        <div>
          <Form
            onFinish={(values) => handleFormEditRole(values, record.key)}
            form={form1[record.key]}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 0,
            }}
          >
            <Form.Item
              initialValue={record.role}
              name="role"
              style={{ flex: 1, marginRight: 10, marginBottom: 0 }}
            >
              <Select
                placeholder="Choose role"
                mode="tags"
                options={[
                  {
                    value: 1,
                    label: "Owner",
                    disabled: true,
                  },
                  {
                    value: 2,
                    label: "Manager",
                  },
                  {
                    value: 3,
                    label: "Dev",
                  },
                  {
                    value: 4,
                    label: "Tester",
                  },
                ]}
              ></Select>
            </Form.Item>
            <Button
              icon={<EditOutlined style={{ marginTop: 5 }} />}
              className="custom-btn-save-and-add"
              htmlType="submit"
            >
              EDIT
            </Button>
          </Form>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <div>
          <Button
            className="custom-btn-del"
            icon={<DeleteOutlined />}
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
          <div>
            <Input.Search
              allowClear
              placeholder="Input member name"
              style={{ width: "25%", marginBottom: 20 }}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
            />
            <Button
              className="custom-btn-add-d"
              icon={<PlusOutlined />}
              onClick={showModalTaoDon}
              style={{
                float: "right",
              }}
            >
              Add members
            </Button>
          </div>
          <Table
            scroll={{ x: 600 }}
            columns={column}
            dataSource={
              filteredData &&
              Array.isArray(filteredData) &&
              filteredData.map((_filteredData, index) => ({
                index: index + 1,
                key: _filteredData.id,
                avatarAndName: (
                  <span>
                    <Avatar style={{ backgroundColor: "orange" }}>
                      {`${_filteredData.name}`.charAt(0)}
                    </Avatar>{" "}
                    {`${_filteredData.name}`.substring(0)}
                  </span>
                ),
                email: _filteredData.email,
                role: _filteredData.role,
              }))
            }
            bordered
            size="middle"
          />
          <Modal
            open={isModalAdd}
            footer={null}
            onCancel={closeAddModal}
            title="Add member"
            width={700}
          >
            <AddMember form={form} form2={form2}></AddMember>
          </Modal>
        </>
      )}
    </>
  );
};

export default Collab;
