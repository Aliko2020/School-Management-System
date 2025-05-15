import React, { useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { logout as loginAction } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logout = ()=>{
        try{
            localStorage.removeItem("userToken")
            localStorage.removeItem("userInfo")
            dispatch(loginAction())
            navigate('/')
        }catch(error){
            console.log("Logout error",error)
        }
    }

    return (
        <nav className='w-full flex justify-between items-center bg-primaryLight py-12 px-2 text-white'>
            <span className='text-2xl'>SmartLearn: #Admin</span>

            <div className='flex gap-3 items-center relative'>
                <div className="relative inline-block cursor-pointer">
                    <IoIosNotificationsOutline size={40} />
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        5
                    </span>
                </div>
                <div className="relative flex items-center gap-2 px-4">
                    <FaUserCircle size={40} />
                    <FaChevronDown
                        size={16}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                    {open && (
                        <div className="absolute right-0 top-14 border border-primary rounded-md w-40 bg-white text-primary font-semibold">
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer">Details</li>
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer"
                                    onClick={()=> logout()}
                                >Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
