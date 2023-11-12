import "./login.css";
import { Typography, Button, message } from "antd";
const { Text } = Typography;
import setImage from "../../assets/789.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acceptOrDenyInvite } from "../../Redux/Slices/Collaboration/CollaborationSlice";
const Invite = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { projectID, inviter, inviterEmail, guest, guestID } = useParams();
  // console.log("Param: ", inviter, inviterEmail, guest, guestID);

  const handleJoin = () => {
    const data = {
      projectID: projectID,
      inviterID: guestID,
      status: 1
    }
    dispatch(acceptOrDenyInvite(data))
      .unwrap()
      .then((result) => {
        message.success(result, 1.5);
        nav("/login");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  const handleDeny = () => {

    const data = {
      projectID: projectID,
      inviterID: guestID,
      status: 2
    }
    dispatch(acceptOrDenyInvite(data))
      .unwrap()
      .then((result) => {
        message.success(result, 1.5);
        nav("/login");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
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
            Hello <Text style={{ color: "#BEADFA", fontSize: 20 }}>{guest && guest}</Text>,
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            <Text style={{ color: "violet", fontSize: 16 }}>{inviter && inviter}</Text>{" "}
            ({inviterEmail && inviterEmail}) has invited you to their project team on SETOOL
            {/* <Text style={{ color: "#F9B572", fontSize: 16 }}> */}
             
            {/* </Text>{" "} */}
            
          </Text>
        </div>
        <div className="button-container">
          <Button className="btn-grad" style={{ color: "white", margin: 30 }} onClick={handleDeny}>
            Decline
          </Button>
          <Button className="btn-grad" style={{ color: "white", margin: 30 }} onClick={handleJoin}>
            Click to join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
