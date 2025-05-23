import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const PAGE_LIMIT = 10;

const StudentsTable = () => {
    const [studentsData, setStudentsData] = useState({
        data: [],
        page: 1,
        limit: PAGE_LIMIT,
        total_pages: 1,
        total_students: 0,
        genderDetails: {},
    });
    const [loading, setLoading] = useState(false);

    const fetchStudentsPage = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get(
                `http://localhost:3000/api/students?page=${page}&limit=${PAGE_LIMIT}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStudentsData(response.data);
        } catch (error) {
            console.error("Error loading students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentsPage(1);
    }, []);

    const handleEdit = (student) => {
        console.log("Edit student:", student);
    };

    const handleDelete = (student) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: `Are you sure you want to delete ${student.first_name} ${student.last_name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const token = localStorage.getItem("userToken");
                            await axios.delete(`http://localhost:3000/api/students/${student.student_id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            toast.success("Student deleted successfully");
                            fetchStudentsPage(studentsData.page);
                        } catch (error) {
                            toast.error("Error deleting student");
                            console.error("Delete error:", error);
                        }
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };
    const { data, page, total_pages, total_students, genderDetails } = studentsData;
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
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
                            {data.map((student) => (
                                <tr key={student.student_id}>
                                    <td className="border px-4 py-2">{student.student_id}</td>
                                    <td className="border px-4 py-2">{student.first_name}</td>
                                    <td className="border px-4 py-2">{student.last_name}</td>
                                    <td className="border px-4 py-2">{new Date(student.date_of_birth).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2 capitalize">{student.gender}</td>
                                    <td className="border px-4 py-2">{student.class_name}</td>
                                    <td className="border px-4 py-2 flex gap-4 text-gray-600">
                                        <button onClick={() => handleEdit(student)} title="Edit" className="hover:text-green-600">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(student)} title="Delete" className="hover:text-red-500">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => fetchStudentsPage(parseInt(page) - 1)}
                            disabled={page === 1 || loading}
                            className="px-4 py-2 border rounded disabled:opacity-50 bg-primaryLight text-white"
                        >
                            Previous
                        </button>

                        <div>
                            Page {page} of {total_pages} | Total Students: {total_students} | Male: {genderDetails.male_count || 0} | Female: {genderDetails.female_count || 0}
                        </div>

                        <button
                            onClick={() => fetchStudentsPage(parseInt(page) + 1)}
                            disabled={page === total_pages || loading}
                            className="px-4 py-2 border rounded disabled:opacity-50 bg-primaryLight text-white"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentsTable;
