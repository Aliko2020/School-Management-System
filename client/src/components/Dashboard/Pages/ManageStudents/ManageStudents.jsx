import React, { useEffect, useState } from 'react';
import { fetchStudents,filterStudents } from '../../../../api/studentServices';
import Filter from '../../FilterForm';
import StudentsTable from './StudentTable';



const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('')
  const [filteredStudent, setFilteredStudent] = useState()

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
      const res = await filterStudents(name)
      setFilteredStudent(res.data);
      setName('');
    } catch (error) {
      console.error('Error filtering students:', error.response?.data || error.message);
    }
  };

  console.log(students);
  
  return (
    <div className="flex flex-col p-4 gap-4">
      <Filter name={name} onSearch={handleSearch} setName={setName} />
      <StudentsTable />
    </div>
  );
};

export default ManageStudents;
