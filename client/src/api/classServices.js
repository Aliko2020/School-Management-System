import axios from "axios";



const API_URL = 'http://localhost:3000/api';

export const getClasses = async ()=>{
    const token = localStorage.getItem('userToken')

    return await axios.get(`${API_URL}/classes`,{
        headers: {
            Authorization: token?.startsWith('Bearer') ? token : `Bearer ${token}`
        }
    })
}

