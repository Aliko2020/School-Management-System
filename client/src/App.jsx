import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardLayout from './components/Dashboard/Pages/DashboardLayout';
import Home from './components/Dashboard/Pages/Home/Home';
import ManageStudents from './components/Dashboard/Pages/ManageStudents/ManageStudents';
import ManageTeachers from './components/Dashboard/Pages/ManageTeachers';
import FeesReport from './components/Dashboard/Pages/FeesReport';
import Subjects from './components/Dashboard/Pages/Subjects';
import ProtectedRoute from './utils/ProtectedRoute';
import StudentHome from './components/Dashboard/Pages/StudentHome';
import Annoucement from './components/Dashboard/Pages/Annoucements/Annoucement';
import Unauthorized from './pages/Unauthorized';
import ToastProvider from './components/common/ToastContainer';
import ManageParents from './components/Dashboard/Pages/ManageParents';
import EnrollStudent from './components/Dashboard/Pages/ManageStudents/EnrollStudent';
import StudentDetails from './components/Dashboard/Pages/ManageStudents/StudentDetails';




function App() {
  return (
    <Router>
      <main className='font-openSans'>

        <ToastProvider />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="students/:id" element={<StudentDetails />} />
              <Route path="students/enroll" element={<EnrollStudent />} />

              <Route path="teachers" element={<ManageTeachers />} />
              <Route path="parents" element={<ManageParents />} />
              <Route path="fees" element={<FeesReport />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="announcements" element={<Annoucement />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
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
