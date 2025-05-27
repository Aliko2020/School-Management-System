import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";
import { handleDelete, fetchStudentsPage } from "@/api/studentServices";
import { useNavigate } from "react-router-dom";




const PAGE_LIMIT = 10;

const StudentsTable = ({ filteredStudent,setFilteredStudent }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [studentsData, setStudentsData] = useState({
        data: [],
        page: 1,
        limit: PAGE_LIMIT,
        total_pages: 1,
        total_students: 0,
        genderDetails: {},
    });


    const loadPage = async (page = 1) => {
        setLoading(true);
        try {
            const data = await fetchStudentsPage(page, PAGE_LIMIT);
            setStudentsData(data);
        } catch (error) {
            toast.error("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPage(1);
    }, []);


    const handleView = (student) => {
        navigate(`/admin/students/${student.student_id}`, { state: { student } });    
    }
    
    const handleEdit = (student) => {
        console.log("Edit student:", student);
    };

    const studentsList =
        filteredStudent && filteredStudent.length > 0
            ? filteredStudent
            : studentsData.data;


    const { page, total_pages, total_students, genderDetails } = studentsData;

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-primaryLight text-white">
                                <th className="border px-4 py-2 text-start">ID</th>
                                <th className="border px-4 py-2 text-start">First Name</th>
                                <th className="border px-4 py-2 text-start">Last Name</th>
                                <th className="border px-4 py-2 text-start">DOB</th>
                                <th className="border px-4 py-2 text-start">Gender</th>
                                <th className="border px-4 py-2 text-start">Class</th>
                                <th className="border px-4 py-2 text-start">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsList.map((student) => (
                                <tr key={student.student_id}>
                                    <td className="border px-4 py-2">{student.student_id}</td>
                                    <td className="border px-4 py-2">{student.first_name}</td>
                                    <td className="border px-4 py-2">{student.last_name}</td>
                                    <td className="border px-4 py-2">
                                        {new Date(student.date_of_birth).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2 capitalize">
                                        {student.gender}
                                    </td>
                                    <td className="border px-4 py-2">{student.class_name}</td>
                                    <td className="border px-4 py-2 flex gap-4 text-gray-600">
                                        <button
                                            onClick={() => handleView(student)}
                                            title="View"
                                            className="hover:text-green-600"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(student)}
                                            title="Edit"
                                            className="hover:text-green-600"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(student, async () => {
                                                    if (filteredStudent?.length > 0) {
                                                        // If filtering is active, re-run search
                                                        const updatedFiltered = await filterStudents(`${student.first_name} ${student.last_name}`);
                                                        setFilteredStudent(updatedFiltered.data || []);
                                                    } else {
                                                        // Regular paginated view
                                                        const newPage =
                                                            studentsData.data.length === 1 && studentsData.page > 1
                                                                ? studentsData.page - 1
                                                                : studentsData.page;
                                                        loadPage(newPage);
                                                    }
                                                })
                                            }
                                            title="Delete"
                                            className="hover:text-red-500"
                                        >
                                            <FaTrash />
                                        </button>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-4">
                        <div className="font-semibold">
                            Page {page} of {total_pages} | Total Students: {total_students} |
                            Male: {genderDetails.male_count || 0} | Female:{" "}
                            {genderDetails.female_count || 0}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => loadPage(parseInt(page) + 1)}
                                disabled={page === total_pages || loading}
                                className="flex items-center px-4 py-2 border rounded disabled:opacity-50 bg-primaryLight text-white hover:bg-primary"
                            >
                                Next
                                <GrFormNextLink />
                            </button>
                            <button
                                onClick={() => loadPage(Math.max(parseInt(page) - 1, 1))}
                                disabled={page === 1 || loading}
                                className="px-4 py-2 border rounded disabled:opacity-50 bg-primaryLight text-white hover:bg-primary"
                            >
                                Previous
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentsTable;
