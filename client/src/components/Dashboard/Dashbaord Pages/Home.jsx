import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { FaUsers,FaGraduationCap } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";


const Home = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudentData = async () => {
            const token = localStorage.getItem('userToken');

            try {
                const res = await axios.get('http://localhost:3000/api/students', {
                    headers: {
                        Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
                    }
                });
                setStudents(res.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudentData();
    }, []);

    const totalStudents = students.length;

    const totalMale = useMemo(() =>
        students.filter(s => s.gender === 'male').length, [students]
    );

    const totalFemale = useMemo(() =>
        students.filter(s => s.gender === 'female').length, [students]
    );

    const malePercentage = useMemo(() =>
        totalStudents > 0 ? ((totalMale / totalStudents) * 100).toFixed(1) : 0,
        [totalMale, totalStudents]
    );

    const femalePercentage = useMemo(() =>
        totalStudents > 0 ? ((totalFemale / totalStudents) * 100).toFixed(1) : 0,
        [totalFemale, totalStudents]
    );


    const summaryInfo = [
        {
            total: students.length,
            name: 'Total Students',
            icon: <FaGraduationCap size={65} />,
            description: 'Boarding',
            percentage: 100,
            bgColor: "#1D92BD"
        },
        {
            total: 12,
            name: 'Staff Members',
            icon: <FaChalkboardTeacher size={65} />,
            description: 'Teaching Staff',
            percentage: 45,
            bgColor: "#64A71D"
        },
        {
            total: totalFemale,
            name: 'Female Students',
            description: 'Active',
            percentage: femalePercentage,
            bgColor: "#E957DA"
        },
        {
            total: totalMale,
            name: 'Male Students',
            description: 'Active',
            percentage: malePercentage,
            bgColor: "#4877BD"
        }
    ];

    return (
        <div className='flex flex-col w-full'>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {summaryInfo.map((card, index) => (
                    <div
                        key={index}
                        className="p-4 flex flex-col gap-2 justify-between"
                        style={{ backgroundColor: card.bgColor, color: 'white' }}
                    >
                        <span className="text-3xl font-bold">{card.total}</span>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold">{card.name}</h2>
                                <div className='w-full rounded-xl h-1 mt-1 bg-white'></div>
                            </div>
                            <div className="p-2 rounded-full">
                                {card.icon}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <p>{card.description}</p>
                            <span className='pr-4'>{card.percentage}%</span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;
