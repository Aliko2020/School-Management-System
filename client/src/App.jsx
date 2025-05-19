import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardLayout from './components/Dashboard/Dashbaord Pages/Dashboard Layout';
import Home from './components/Dashboard/Dashbaord Pages/Home';
import ManageStudents from './components/Dashboard/Dashbaord Pages/ManageStudents';
import ManageTeachers from './components/Dashboard/Dashbaord Pages/ManageTeachers';
import FeesReport from './components/Dashboard/Dashbaord Pages/FeesReport';
import Subjects from './components/Dashboard/Dashbaord Pages/Subjects';
import ProtectedRoute from './components/ProtectedRoute';
import StudentHome from './components/Dashboard/Dashbaord Pages/StudentHome';
import Annoucement from './components/Dashboard/Dashbaord Pages/Annoucements/Annoucement';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <main className='font-openSans'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="teachers" element={<ManageTeachers />} />
              <Route path="fees" element={<FeesReport />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="announcements" element={<Annoucement />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['student','admin']} />}>
            <Route path="/student" element={<DashboardLayout />}>
              <Route path="home" element={<StudentHome />} />
              <Route path="announcements" element={<Annoucement />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
