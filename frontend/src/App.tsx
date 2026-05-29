import './App.css';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/TaskManager';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/sistema" element={
          <ProtectedRoute>
            <TaskManager />
          </ProtectedRoute>
        } />

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App;