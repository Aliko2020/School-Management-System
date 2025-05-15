import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Unauthorized = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const role = userInfo?.role 
    
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
            <h1 className="text-4xl font-bold text-red-600 mb-4">401 - Unauthorized</h1>
            <p className="text-lg text-gray-700 mb-6">
                You do not have permission to view this page.
            </p>
            <Link
                to={`/${role}/home`}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
            >
                Back To Dashboard
            </Link>
        </div>
    );
};

export default Unauthorized;
