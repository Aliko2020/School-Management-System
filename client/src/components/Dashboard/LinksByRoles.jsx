import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaMoneyBill, FaBook,FaBell } from 'react-icons/fa';

const LinksByRole = {
    admin: [
        {name: "Home", path: "/admin/home", icon: <FaHome size={30} />},
        {name: "Fees ", path: "/admin/fees", icon: <FaMoneyBill  size={30}/>},
        {name: "Students", path: "/admin/students", icon: <FaUserGraduate size={30} />},
        {name: "Teachers", path: "/admin/teachers", icon: <FaChalkboardTeacher size={30} />},
        {name: "Subjects",path: "/admin/subjects", icon: <FaBook size={30} />},
        {name: "Annoucements", path: "/admin/annoucements", icon: <FaBell  size={30}/>}
    ],
    student: [
        {name: "Student Detials", path: "/student/details"}
    ]
}

export default LinksByRole