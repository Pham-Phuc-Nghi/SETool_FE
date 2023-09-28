import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import TaskManager from './pages/TaskManager/TaskManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />} />
        <Route path='/test' element={<TaskManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
