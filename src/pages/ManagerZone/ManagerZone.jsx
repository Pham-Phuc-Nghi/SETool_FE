import { Tabs, Typography } from "antd";
import Backlogs from "../BackLogs/Backlogs";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import ProjectController from "../ProjectController/ProjectController";
import SprintController from "../ProjectController/SprintController";
const { Text } = Typography;
const ManagerZone = () => {
  const items = [
    {
      key: "1",
      label: (
        <Text style={{ fontSize: 17, padding: 10 }}>Management Backlogs</Text>
      ),
      children: <Backlogs></Backlogs>,
    },
    {
      key: "2",
      label: (
        <Text style={{ fontSize: 17, padding: 10 }}>Reporting Process</Text>
      ),
      children: <AdminDashboard></AdminDashboard>,
    },
    {
      key: "3",
      label: (
        <Text style={{ fontSize: 17, padding: 10 }}>Sprint Controller</Text>
      ),
      children: <SprintController></SprintController>,
    },
    {
      key: "4",
      label: (
        <Text style={{ fontSize: 17, padding: 10 }}>Project Controller</Text>
      ),
      children: <ProjectController></ProjectController>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs size="large" items={items} onChange={onChange} />
    </div>
  );
};

export default ManagerZone;
