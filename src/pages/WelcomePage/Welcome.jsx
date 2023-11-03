import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="containerWelcome">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button
          style={{ marginTop: 400, marginLeft: 140, height: 40 }}
          onClick={() => {
            navigate("/login");
          }}
          type="primary"
          className="custom-btn-save-and-add"
        >
          Click to join our project
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
