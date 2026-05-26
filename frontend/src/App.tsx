import './App.css';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/TaskManager';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sistema" element={<TaskManager />} />
      </Routes>
    </>
  )
}

export default App;