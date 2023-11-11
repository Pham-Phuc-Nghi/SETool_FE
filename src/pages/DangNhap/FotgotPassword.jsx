import "./login.css";
import { Typography, Button, Form, Input } from "antd";
const { Text } = Typography;
import setImage from "../../assets/789.png";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { acceptOrDenyInvite } from "../../Redux/Slices/Collaboration/CollaborationSlice";
const FotgotPassword = () => {
  //   const dispatch = useDispatch();
  //   const nav = useNavigate();
  //   const { projectID, inviter, inviterEmail, guest, guestID } = useParams();
  //   console.log("Param: ", inviter, inviterEmail, guest, guestID);

  //   const handleJoin = () => {
  //     const data = {
  //       projectID: projectID,
  //       inviterID: guestID,
  //       status: 1
  //     }
  //     dispatch(acceptOrDenyInvite(data))
  //       .unwrap()
  //       .then((result) => {
  //         message.success(result, 1.5);
  //         nav("/login");
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data: ", error);
  //       });
  //   }

  //   const handleDeny = () => {
  //     const projectID = sessionStorage.getItem("current_project");
  //     const data = {
  //       projectID: projectID,
  //       inviterID: guestID,
  //       status: 2
  //     }
  //     dispatch(acceptOrDenyInvite(data))
  //       .unwrap()
  //       .then((result) => {
  //         message.success(result, 1.5);
  //         nav("/login");
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data: ", error);
  //       });
  //   }
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div className="container">
      <div className="text-container">
        <img
          style={{
            width: "170px",
            height: "100px",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            margin: "0 auto",
            backgroundSize: "cover",
            display: "block",
            cursor: "pointer",
          }}
          src={setImage}
        />
        <Text style={{ color: "white", fontSize: 40 }}>RESET PASSSWORD</Text>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            flexDirection: "column",
            textAlign: "left",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <Form {...layout} form={form}>
            <Form.Item
              label={<Text style={{color:"white"}}>New Password </Text>}
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "New Password must not be a blank",
                },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,}$/,
                  message:
                    "A new password must have at least 6 characters, one uppercase letter, one digit, and one special character.",
                },
              ]}
            >
              <Input.Password allowClear placeholder="Input New Password" />
            </Form.Item>
            <Form.Item
              label={<Text style={{color:"white"}}>Confirm new password </Text>}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Confirm new password must not be blank",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The password you just entered does not match the old password."
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                allowClear
                placeholder="Input new password confirm."
              />
            </Form.Item>
            <Button
              className="btn-grad"
              block
              type="primary"
              htmlType="submit"
              style={{ marginTop: 30 }}
            >
              SUBMIT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FotgotPassword;
