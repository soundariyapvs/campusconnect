import { Routes, Route, Navigate } from 'react-router-dom';
import MainNavbar from './components/layout/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import Collaboration from './pages/Collaboration';

function App() {
  return (
    <>
      <MainNavbar />
      <div className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/collaboration" element={<Collaboration />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
