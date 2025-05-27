import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../common/Loader';
import { getStudentById } from '@/api/studentServices';
import { FaUserCircle } from 'react-icons/fa';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        console.error('Failed to fetch student:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <Loader />;
  if (!student) return <div className="text-center text-gray-500 mt-10">No student found.</div>;

  return (
    <div className="flex flex-col p-6 max-w-7xl gap-4 mt-8">
      {/* Profile Card */}
      <div className="flex md:flex-row justify-end items-center gap-4 bg-blue-50 border rounded-md p-6">
        <div className="text-6xl text-primaryLight">
          <FaUserCircle />
        </div>
        <div className=''>
          <h1 className="text-lg font-simibold text-primary">
            {student.student_first_name} {student.student_last_name}
          </h1>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-blue-50 border rounded-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <Info label="Date of Birth" value={formatDate(student.date_of_birth)} />
        <Info label="Gender" value={capitalize(student.gender)} />
        <Info label="Address" value={student.address} />
        <Info label="Enrollment Date" value={formatDate(student.enrollment_date)} />
        <Info label="Fee Amount" value={student.fee_amount ?? 'N/A'} />
        <Info label="Payment Status" value={student.payment_status ?? 'N/A'} />
        <Info label="Payment Date" value={student.payment_date ? formatDate(student.payment_date) : 'N/A'} />
        <Info
          label="Parent Name"
          value={
            student.parent_first_name && student.parent_last_name
              ? `${student.parent_first_name} ${student.parent_last_name}`
              : 'N/A'
          }
        />
        <Info label="Parent Contact" value={student.parent_contact ?? 'N/A'} />
        <Info label="Parent Email" value={student.parent_email ?? 'N/A'} />
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium">{value}</p>
  </div>
);

const formatDate = (date) => new Date(date).toLocaleDateString();
const capitalize = (str) => str?.charAt(0).toUpperCase() + str.slice(1);

export default StudentDetails;
