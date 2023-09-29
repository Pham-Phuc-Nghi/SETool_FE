import { Route, Routes } from 'react-router-dom';
import Login from './pages/DangNhap/Login.jsx'
import ManagerRouter from './routers/ManagerRouter.jsx';

function App() {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='home/*' element={<ManagerRouter />} />
    </Routes>
  );
}

export default App;
