import { Route, Routes } from 'react-router-dom';
import Login from './pages/DangNhap/Login.jsx'
import ManagerRouter from './routers/ManagerRouter.jsx';
import "./App.css"
import HomePages from './pages/HomePages/homePages.jsx';

function App() {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='/homepage' element={<HomePages />} />
      <Route path='home/*' element={<ManagerRouter />} />
    </Routes>
  );
}

export default App;
