import React from "react";
import LinksByRole from "./LinksByRoles.jsx";
import { Link, NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";



const Sidebar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfo?.role;
  const links = LinksByRole[role] || [];
  return (
    <div className="flex flex-col justify-between bg-primaryLight rounded-r-md  border-t-2 p-6 text-white w-64">
      <ul className="flex flex-col gap-10">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-end gap-2 cursor-pointer font-bold hover:text-gray-200 ${
                  isActive ? "text-accent " : ""
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 rounded-md p-3">
        <TbLogout size={25} />
        <Link>Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
