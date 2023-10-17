import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate("/login");
        }} block
        type="primary"
      >Login</Button>
    </div>
  );
};

export default Welcome;
