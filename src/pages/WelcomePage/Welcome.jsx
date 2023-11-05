import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import { useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();
  const handleResize = () => {
    const windowHeight = window.innerHeight;
    const marginTop = windowHeight * 0.55; // 20% của chiều cao màn hình

    const button = document.getElementById("joinButton");
    if (button) {
      button.style.marginTop = `${marginTop}px`;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          id="joinButton"
          style={{ marginLeft: '9%', height: '6vh'}}
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
