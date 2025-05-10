import React from 'react'
import Sidebar from '../Sidebar'
import { Navbar } from '../Navbar'
import { Outlet } from 'react-router-dom'



const Admin = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar />
        <section className='flex flex-1'>
            <Sidebar />
            <main className='flex-1 p-4'>
               <Outlet />
            </main>
        </section>
    </div>
  )
}

export default Admin