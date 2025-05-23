import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaMoneyBill, FaBook,FaBell} from 'react-icons/fa';
import { FaUserGroup } from "react-icons/fa6"
import { TbReportAnalytics } from "react-icons/tb";

const LinksByRole = {
    admin: [
        {name: "Home", path: "/admin/home", icon: <FaHome size={30} />},
        {name: "Students", path: "/admin/students", icon: <FaUserGraduate size={30} />},
        {name: "Teachers", path: "/admin/teachers", icon: <FaChalkboardTeacher size={30} />},
        {name: "Parents",path: "/admin/parents", icon: <FaUserGroup size={30} />},
        {name: "Fees ", path: "/admin/fees", icon: <FaMoneyBill  size={30}/>},
        {name: "Subjects",path: "/admin/results", icon: <FaBook size={30} />},
        {name: "Exam Results",path: "/admin/subjects", icon: <TbReportAnalytics size={30} />},
        {name: "Annoucements", path: "/admin/announcements", icon: <FaBell  size={30}/>}
    ],
    student: [
        {name: "Home", path: "/student/home", icon: <FaHome size={30} />},
        {name: "Details", path: "/student/details",icon: <FaBook size={30} />},
        {name: "Results", path: "/student/results", icon: <FaBook size={30} />},
        {name: "Fees", path: "/student/fees", icon: <FaMoneyBill size={30} />},
        {name: "Annoucements", path: "/student/announcements", icon: <FaBell  size={30}/>}
    ]
}

export default LinksByRole