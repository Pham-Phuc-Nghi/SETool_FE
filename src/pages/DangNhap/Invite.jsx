import "./login.css";
import { Typography, Button } from "antd";
const { Text } = Typography;
import setImage from "../../assets/789.png";
import { useParams } from "react-router-dom";
const Invite = () => {
  const { inviter, inviterEmail, guest, guestID } = useParams();
  console.log("Param: ", inviter, inviterEmail, guest, guestID);

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
        <Text style={{ color: "white", fontSize: 40 }}>
          Join My project in SETOOL
        </Text>
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
          <Text style={{ color: "white", fontSize: 20, marginBottom: 16 }}>
            Hello <Text style={{ color: "#BEADFA", fontSize: 20 }}>user2</Text>,
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            <Text style={{ color: "violet", fontSize: 16 }}>User1</Text>{" "}
            (user1@gmail.com) has invited you to the
            <Text style={{ color: "#F9B572", fontSize: 16 }}>
              My project
            </Text>{" "}
            team on SETOOL
          </Text>
        </div>
        <div className="button-container">
          <Button className="btn-grad" style={{ color: "white", margin: 30 }}>
            Click to join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
