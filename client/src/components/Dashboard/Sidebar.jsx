import React from 'react'
import LinksByRole from './LinksByRoles'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const role = userInfo?.role
  
  const links = LinksByRole[role] || [];

  console.log(links);
  
 
  return (
   <div className=' bg-primaryLight h-[calc(100vh-64px)] mt-1 '>
    p
       <ul>
        <li><NavLink ></NavLink></li>
       </ul>
   </div>
  )
}

export default Sidebar