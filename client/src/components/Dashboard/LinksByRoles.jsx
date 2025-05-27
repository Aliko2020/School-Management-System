import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaMoneyBill, FaBook,FaBell} from 'react-icons/fa';
import { FaUserGroup } from "react-icons/fa6"
import { TbReportAnalytics } from "react-icons/tb";

const LinksByRole = {
    admin: [
        {name: "Home", path: "/admin/home", icon: <FaHome size={20} />},
        {name: "Students", path: "/admin/students", icon: <FaUserGraduate size={20} />},
        {name: "Teachers", path: "/admin/teachers", icon: <FaChalkboardTeacher size={20} />},
        {name: "Parents",path: "/admin/parents", icon: <FaUserGroup size={20} />},
        {name: "Fees ", path: "/admin/fees", icon: <FaMoneyBill  size={20}/>},
        {name: "Subjects",path: "/admin/results", icon: <FaBook size={20} />},
        {name: "Exam Results",path: "/admin/subjects", icon: <TbReportAnalytics size={20} />},
        {name: "Annoucements", path: "/admin/announcements", icon: <FaBell  size={20}/>}
    ],
    student: [
        {name: "Home", path: "/student/home", icon: <FaHome size={20} />},
        {name: "Details", path: "/student/details",icon: <FaBook size={20} />},
        {name: "Results", path: "/student/results", icon: <FaBook size={20} />},
        {name: "Fees", path: "/student/fees", icon: <FaMoneyBill size={20} />},
        {name: "Annoucements", path: "/student/announcements", icon: <FaBell  size={20}/>}
    ]
}

export default LinksByRole