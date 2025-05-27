import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('userToken');
  return {
    Authorization: token?.startsWith('Bearer') ? token : `Bearer ${token}`,
  };
};



export const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}/students`, {
    headers: getAuthHeader(),
  });
  return response.data;
};



export const filterStudents = async (name) => {
  const [first_name = '', last_name = ''] = name.trim().split(' ');

  try {
    const response = await axios.post(
      `${API_URL}/students/filter`,
      { first_name, last_name },
      {
        headers: getAuthHeader(),
      }
    );
    console.log("par",response.data);
    return response.data;

  } catch (error) {
    if (error.response?.status === 404) {
      toast.error('Student not found');
    } else if (error.response?.status === 400) {
      toast.error('Please provide both first and last name');
    } else {
      toast.error('Something went wrong');
    }
  }
};


export const getStudentById = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/students/${studentId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStudentsPage = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/students?page=${page}&limit=${limit}`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};





export const createStudent = async ({ firstname, lastname, dob, gender, studentClass, address }) => {
  const formattedDate = new Date(dob).toISOString().split('T')[0];

  const payload = {
    first_name: firstname,
    last_name: lastname,
    date_of_birth: formattedDate,
    gender,
    address,
    student_class: studentClass,
  };

  const response = await axios.post(`${API_URL}/students`, payload, {
    headers: getAuthHeader(),
  });
  toast.success("Student Created!")
  return response.data;
};




export const handleDelete = (student, onSuccess) => {
  confirmAlert({
    title: 'Confirm Delete',
    message: `Are you sure you want to delete ${student.first_name} ${student.last_name}?`,
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          try {
            await axios.delete(`${API_URL}/students/${student.student_id}`, {
              headers: getAuthHeader(),
            });
            toast.success("Student deleted successfully");
            onSuccess();
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





export const fetchFeeReport = async () => {
  const response = await axios.get(`${API_URL}/fees`, {
    headers: getAuthHeader()
  });
  return response.data
}
