import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import TaskManager from "../pages/TaskManager/TaskManager"
import Collab from "../pages/Collaboration/Collab";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManagerZone from "../pages/ManagerZone/ManagerZone";
import { useDispatch, useSelector } from "react-redux";
import { isAdminSelector } from "../Redux/Selector";
import { isAdminOfProject } from "../Redux/Slices/Collaboration/CollaborationSlice";
import { useEffect, useState } from "react";

const adminRoutesData = [
  { path: "task", component: <TaskManager /> },
  { path: "collaborators", component: <Collab /> },
  { path: "dashboard", component: <Dashboard /> },
];

const ManagerRouter = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(isAdminSelector);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  useEffect(() => {
    const projectID = sessionStorage.getItem("current_project");
    dispatch(isAdminOfProject(projectID))
      .unwrap()
      .then(() => {
        setIsAdminRoute(isAdmin && isAdmin);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [dispatch, setIsAdminRoute]);

  return (
    <>
      <DefaultLayout>
        <Routes>
          {adminRoutesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}

          {isAdminRoute && (
            <Route 
              path="management"
              element={<ManagerZone />} 
            />  
          )}
        </Routes>
      </DefaultLayout>
    </>
  );
};

export default ManagerRouter;
