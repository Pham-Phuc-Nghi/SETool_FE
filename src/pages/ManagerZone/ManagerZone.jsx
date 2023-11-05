import { Tabs, Typography } from "antd";
import Backlogs from "../BackLogs/Backlogs";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import ProjectController from "../ProjectController/ProjectController";
import SprintController from "../ProjectController/SprintController";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../Redux/Slices/Collaboration/CollaborationSlice";
import { roleSelector } from "../../Redux/Selector";
const { Text } = Typography;
const ManagerZone = () => {
  const dispatch = useDispatch();
  const roleM = useSelector(roleSelector);

  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(getRole(projectID));
  }, []);

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
    roleM.result && roleM.result.includes("owner")
      ? {
          key: "4",
          label: (
            <Text style={{ fontSize: 17, padding: 10 }}>
              Project Controller
            </Text>
          ),
          children: <ProjectController></ProjectController>,
        }
      : null,
  ];
  const onChange = () => {};

  return (
    <div>
      <Tabs size="large" items={items} onChange={onChange} />
    </div>
  );
};

export default ManagerZone;
