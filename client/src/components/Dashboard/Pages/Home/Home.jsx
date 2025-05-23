import React, { useState, useEffect } from 'react';
import { FaGraduationCap } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { fetchStudents } from '@/api/studentServices';
import { PiLinkSimpleFill } from "react-icons/pi";
import Card from './Card';




const Home = () => {
    const [students, setStudents] = useState({});

    useEffect(() => {
        const getStudentData = async () => {
            try {
                const data = await fetchStudents();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error.message);
            }
        };

        getStudentData();
    }, []);
    const total_students = students?.total_students || 0;
    const genderDetails = students?.genderDetails || {};
    const maleCount = parseInt(genderDetails.male_count) || 0;
    const femaleCount = parseInt(genderDetails.female_count) || 0;

    const summaryInfo = [
        {
            total: total_students,
            name: 'Total Students',
            icon: <FaGraduationCap size={65} />,
            description: 'Boarding',
            percentage: 100,
            bgColor: "#074688"
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
            total: femaleCount,
            name: 'Female Students',
            description: 'Active',
            percentage: 80,
            bgColor: "#E957DA"
        },
        {
            total: maleCount,
            name: 'Male Students',
            description: 'Active',
            percentage: 78,
            bgColor: "#1D92BD"
        }
    ];

    return (
        <div className='flex flex-col gap-4 w-full'>
            <section className="grid grid-cols-2 md:grid-cols-4 mt-4 mb-16 gap-4">
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
           <div className='flex items-center w-40 text-primary'>
             <PiLinkSimpleFill size={25} />
             <h2 className='text-lg font-bold'>Quick Links</h2>
           </div>
            <Card />
        </div>
    );
};

export default Home;
