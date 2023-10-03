import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import TaskManager from "../pages/TaskManager/TaskManager"
import Backlogs from "../pages/BackLogs/Backlogs";
import Collab from "../pages/Collaboration/Collab";
import Dashboard from "../pages/Dashboard/Dashboard";


const adminRoutesData = [
  { path: "task", component: <TaskManager /> },
  { path: "backlog", component: <Backlogs /> },
  { path: "collaborators", component: <Collab /> },
  { path: "dashboard", component: <Dashboard /> },
];

const ManagerRouter = () => {
  //   const nav = useNavigate();
  //   useEffect(() => {
  //     const isAdmin_key = sessionStorage.getItem('isAdmin_key');
  //     if (isAdmin_key === 'false') {
  //       message.error('Tài Khoản của bạn không được phép truy cập vào trang này!');
  //       nav('/staff');
  //     }
  //   }, [nav])

  return (
    <>
      <DefaultLayout>
        <Routes>
          {adminRoutesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </DefaultLayout>
    </>
  );
};

export default ManagerRouter;
