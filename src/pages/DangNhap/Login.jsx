import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;
import "./login.css";
import setImage from "../../assets/setool.png";

const Login = () => {
  const [showCard, setShowCard] = useState(false);
  const [currentForm, setCurrentForm] = useState("userLogin");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

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
              top: 55,
              right: 100,
              width: 140,
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
                // onFinish={handleLogin}
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
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Username must not be a blank
                        </Text>
                      ),
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    allowClear
                    style={{
                      // marginBottom: "10px",
                      width: "100%",
                      fontSize: 16,
                    }}
                    placeholder="Username"
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
                    name="remember"
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
                    name="forgot"
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
                // onFinish={handleLogin}
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
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Text style={{ fontSize: 14, color: "#F04F6A" }}>
                          Username must not be a blank
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
                    placeholder="Username"
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
