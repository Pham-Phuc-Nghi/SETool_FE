import "./login.css";
import { Typography, Button, message } from "antd";
const { Text } = Typography;
import setImage from "../../assets/789.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenSelector, getUserNameSelector } from "../../Redux/Selector";
import { verifyVsLogin } from "../../Redux/Slices/DangNhap/DangNhapSlice";
import { useEffect } from "react";
import { handleDangNhap } from "../../config/AxiosInstance";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { username, email, otp } = useParams();

  const usernameCurrent = useSelector(getUserNameSelector);
  const accessTokenCurrent = useSelector(getAccessTokenSelector);

  useEffect(() => {
    if (
      accessTokenCurrent !== null &&
      accessTokenCurrent !== "" &&
      accessTokenCurrent !== undefined
    ) {
      handleDangNhap(accessTokenCurrent);
      sessionStorage.setItem("name_current", usernameCurrent);
    }
  }, [usernameCurrent, accessTokenCurrent, dispatch]);

  const handleClickSubmit = () => {
    if (email !== null && otp !== null) {
      const data = { email: email, otp: otp };
      dispatch(verifyVsLogin(data))
        .unwrap()
        .then((value) => {
          message.success(value);
          nav("/homepage");
        })
        .catch((err) => {
          message.error(err);
        })
    }
  }

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
        <Text style={{ color: "white", fontSize: 50 }}>VERIFY ACCOUNT</Text>
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
          <Text style={{ color: "white", fontSize: 20, marginBottom: 30 }}>
            Hello<Text style={{ color: "#BEADFA", fontSize: 20 }}>{username}</Text>,
          </Text>
          <Text style={{ color: "white", fontSize: 20, alignSelf: "center", marginBottom: 10 }}>
            Click the button below to verify your email
          </Text>
          <Text style={{ color: "#FF4500", fontSize: 20, alignSelf: "center" }}>
            {email}
          </Text>
        </div>
        <div className="button-container">
          <Button className="btn-grad" style={{ color: "white", margin: 26, marginTop: 20 }} onClick={handleClickSubmit}>
            Click to verify - OTP: {otp}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
