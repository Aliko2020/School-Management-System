import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import AdminDashboard from './components/Dashboard/admin/Admin';
import Home from './components/Dashboard/admin/Home';
import ManageStudents from './components/Dashboard/admin/ManageStudents';
import ManageTeachers from './components/Dashboard/admin/ManageTeachers';
import FeesReport from './components/Dashboard/admin/FeesReport';
import Subjects from './components/Dashboard/admin/Subjects';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="fees" element={<FeesReport />} />
            <Route path="subjects" element={<Subjects />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
