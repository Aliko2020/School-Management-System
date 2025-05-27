import React from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'



const Admin = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <section className='flex flex-1 gap-4'>
            <Sidebar />
            <main className='flex-1 p-4'>
               <Outlet />
            </main>
        </section>
    </div>
  )
}

export default Admin