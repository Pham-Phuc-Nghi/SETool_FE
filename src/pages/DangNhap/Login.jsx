import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  message,
  notification,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  MailOutlined,
} from "@ant-design/icons";
const { Text, Title } = Typography;
import "./login.css";
import setImage from "../../assets/789.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { create, login } from "../../Redux/Slices/DangNhap/DangNhapSlice";
import {
  getAccessTokenSelector,
  getUserNameSelector,
} from "../../Redux/Selector";
import { handleDangNhap } from "../../config/AxiosInstance";

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showCard, setShowCard] = useState(false);
  const [currentForm, setCurrentForm] = useState("userLogin");
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const username = useSelector(getUserNameSelector);
  const accessToken = useSelector(getAccessTokenSelector);

  useEffect(() => {
    if (
      accessToken !== null &&
      accessToken !== "" &&
      accessToken !== undefined
    ) {
      handleDangNhap(accessToken);
      sessionStorage.setItem("name_current", username);
    }
  }, [username, accessToken]);

  const handleClickLoginByGG = () => {
    nav("/homepage");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  //login
  const handleLogin = (values) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        nav("/homepage");
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const openNotification = (type, message) => {
    notification.error({
      message,
      duration: 3,
    });
  };

  //sign up
  const handleSignUp = (values) => {
    console.log(values);
    dispatch(create(values))
      .unwrap()
      .then((result) => {
        message.success(result, 1.5);
        setCurrentForm("userLogin");
      })
      .catch((error) => {
        error.forEach((errorMessage, index) => {
          if (errorMessage) {
            openNotification("error " + (index + 1) + ": ", errorMessage);
          }
        });
      });
  };

  return (
    <div className="login-select-container">
      <div className={`card ${showCard ? "show" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          className="over"
        >
          <img
            style={{
              position: "absolute",
              top: 60,
              right: 100,
              width: 100,
              height: 100,
              backgroundColor: "transparent",
            }}
            src={setImage}
          />
          <div
            className="overlay-container"
            style={{ width: "100%", height: "100%" }}
          ></div>
          <div
            style={{ background: "white", width: "100%", height: "100%" }}
            className="form"
          >
            {currentForm === "userLogin" && (
              <Form
                form={form1}
                key="userLogin"
                name="basic"
                labelCol={{
                  span: 0,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 1000,
                  height: "70%",
                  width: "70%",
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onFinish={handleLogin}
              >
                <Title
                  style={{
                    background: "white",
                    marginBottom: 50,
                    textAlign: "center",
                    fontSize: 35,
                    fontFamily: "sans-serif",
                  }}
                >
                  SIGN IN
                </Title>
                <Form.Item
                  className="form__item__input"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Email must not be a blank
                        </Text>
                      ),
                    },
                  ]}
                >
                  <Input
                    type="email"
                    prefix={<MailOutlined />}
                    allowClear
                    style={{
                      // marginBottom: "10px",
                      width: "100%",
                      fontSize: 16,
                    }}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Password must not be a blank
                        </Text>
                      ),
                    },
                  ]}
                >
                  <Input.Password
                    allowClear
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    style={{ width: "100%", fontSize: 16 }}
                  />
                </Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Item
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 1,
                      span: 23,
                    }}
                    style={{ width: "100%" }}
                  >
                    <Checkbox style={{ color: "#black" }}>
                      {
                        <Text style={{ color: "black", fontSize: 15 }}>
                          Remember me
                        </Text>
                      }
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 1,
                      span: 23,
                    }}
                    style={{ width: "50%" }}
                  >
                    <a style={{ fontSize: 14, color: "#FF4500" }}>
                      Forgot password?
                    </a>
                  </Form.Item>
                </div>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontWeight: 500,
                    backgroundColor: "#FF4500",
                    fontSize: 18,
                    height: "auto",
                    fontFamily: "sans-serif",
                  }}
                  className="task-card"
                >
                  Login
                </Button>
                <Text
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                    fontFamily: "inherit",
                  }}
                >
                  Or login with
                </Text>
                <Button
                  onClick={handleClickLoginByGG}
                  block
                  icon={<GoogleOutlined />}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#FF4500";
                    e.target.style.borderColor = "#FF4500";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "";
                    e.target.style.borderColor = "";
                  }}
                  style={{
                    fontWeight: 500,
                    fontSize: 18,
                    height: "auto",
                    fontFamily: "sans-serif",
                    marginTop: 10,
                  }}
                  className="task-card"
                >
                  Login with mail @fpt.edu.vn
                </Button>
                <Text
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                    fontFamily: "inherit",
                  }}
                >
                  Not have account yet?
                  <a
                    style={{ fontSize: 14, marginLeft: 4, color: "#FF4500" }}
                    onClick={() => setCurrentForm("signUp")}
                  >
                    Sign Up
                  </a>
                </Text>
              </Form>
            )}
            {currentForm === "signUp" && (
              <Form
                form={form2}
                name="basic"
                key="signUp"
                labelCol={{
                  span: 0,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 1000,
                  height: "70%",
                  width: "70%",
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onFinish={handleSignUp}
              >
                <Title
                  style={{
                    background: "white",
                    marginBottom: 50,
                    textAlign: "center",
                    fontSize: 35,
                    fontFamily: "sans-serif",
                  }}
                >
                  SIGN UP
                </Title>
                <Form.Item
                  className="form__item__input"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Email must not be a blank
                        </Text>
                      ),
                    },
                  ]}
                >
                  <Input
                    type="email"
                    prefix={<MailOutlined />}
                    allowClear
                    style={{
                      width: "100%",
                      fontSize: 16,
                    }}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  className="form__item__input"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Name must not be a blank
                        </Text>
                      ),
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    allowClear
                    style={{
                      width: "100%",
                      fontSize: 16,
                    }}
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Password must not be a blank
                        </Text>
                      ),
                    },
                    {
                      min: 6,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Password must be at least 6 characters
                        </Text>
                      ),
                    },
                  ]}
                >
                  <Input.Password
                    allowClear
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    style={{ width: "100%", fontSize: 16 }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          ConfirmPassword must not be a blank
                        </Text>
                      ),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Your password are not match with password")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    allowClear
                    prefix={<LockOutlined />}
                    placeholder="Confirmpassword"
                    style={{ width: "100%", fontSize: 16 }}
                  />
                </Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontWeight: 500,
                    backgroundColor: "#FF4500",
                    fontSize: 18,
                    height: "auto",
                    marginTop: 10,
                    fontFamily: "sans-serif",
                  }}
                  className="task-card"
                >
                  Sign Up
                </Button>
                <Text
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                    fontFamily: "inherit",
                  }}
                >
                  Have an account ?
                  <a
                    style={{ fontSize: 14, marginLeft: 4, color: "#FF4500" }}
                    onClick={() => setCurrentForm("userLogin")}
                  >
                    Login
                  </a>
                </Text>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
