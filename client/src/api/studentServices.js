import axios from 'axios';

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
  console.log('First name:', first_name, 'Last name:', last_name);
  
  return await axios.post(
    `${API_URL}/students/filter`,
    { first_name, last_name },
    {
      headers: getAuthHeader()
    }
  );
};


export const fetchFeeReport = async ()=>{
  const response = await axios.get(`${API_URL}fees`,{
    headers: getAuthHeader()
  });
  return response.data
}
