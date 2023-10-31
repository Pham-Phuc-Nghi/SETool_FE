import "./login.css";
import { Typography, Button } from "antd";
const { Text } = Typography;
import setImage from "../../assets/789.png";

const VerifyEmail = () => {
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
            Hello<Text style={{ color: "#BEADFA", fontSize: 20 }}>user2</Text>,
          </Text>
          <Text style={{ color: "white", fontSize: 20, alignSelf: "center",marginBottom:10 }}>
            Click the button below to verify your email
          </Text>
          <Text style={{ color: "#FF4500", fontSize: 20, alignSelf: "center" }}>
            123@gmail.com
          </Text>
        </div>
        <div className="button-container">
          <Button className="btn-grad" style={{ color: "white", margin: 26,marginTop:20 }}>
            Click to verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
