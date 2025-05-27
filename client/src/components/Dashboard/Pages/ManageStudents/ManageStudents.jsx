import React, { useEffect, useState } from 'react';
import { fetchStudents,filterStudents } from '@/api/studentServices';
import FilterForm from '../../FilterForm';
import StudentsTable from './StudentTable';




const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('')
  const [filteredStudent, setFilteredStudent] = useState([])

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data); 
      } catch (error) {
        console.error('Failed to load students:', error);
      }
    };
    loadStudents();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await filterStudents(name)
      setFilteredStudent(data);
      setName('');
    } catch (error) {
      console.error('Error filtering students:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-14">
      <FilterForm name={name} onSearch={handleSearch} setName={setName} />
      <StudentsTable filteredStudent={filteredStudent} />
    </div>
  );
};

export default ManageStudents;
