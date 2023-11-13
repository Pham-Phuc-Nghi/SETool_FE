import "./login.css";
import { Typography, Button, notification } from "antd";
const { Text } = Typography;
import setImage from "../../assets/789.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyVsLogin } from "../../Redux/Slices/DangNhap/DangNhapSlice";
import { addImage } from "../../helper/uploadImage";
import avatar from "../../assets/avatar.jpg";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { username, email, otp } = useParams();

  const openNotification = (type, message) => {
    notification.error({
      message,
      duration: 3,
    });
  };

  const openNotificationSuccess = (type, message) => {
    notification.success({
      message,
      duration: 3,
    });
  };

  const handleClickSubmit = async () => {
    if (email !== null && otp !== null) {
      const fileContent = await fetch(avatar).then((res) => res.arrayBuffer());
      const avatarFile = new File([fileContent], "avatar.jpg", {
        type: "image/jpg",
      });
      const data = { email: email, otp: otp };
      dispatch(verifyVsLogin(data))
        .unwrap()
        .then(async (result) => {
          const { messageSuccess, userID } = result;
          if (messageSuccess) {
            openNotificationSuccess("success: ", messageSuccess);
          }
          await addImage(avatarFile, userID);
          nav("/login");
        })
        .catch((error) => {
          if (error) {
            openNotification("error: ", error);
          }
        });
    }
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
            Hello
            <Text style={{ color: "#BEADFA", fontSize: 20 }}>{username}</Text>,
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            Click the button below to verify your email
          </Text>
          <Text style={{ color: "#FF4500", fontSize: 20, alignSelf: "center" }}>
            {email}
          </Text>
        </div>
        <div className="button-container">
          <Button
            className="btn-grad"
            style={{ color: "white", margin: 26, marginTop: 20 }}
            onClick={handleClickSubmit}
          >
            Click to verify - OTP: {otp}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
