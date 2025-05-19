import React from "react";
import LinksByRole from "./LinksByRoles.jsx";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfo?.role;

  const links = LinksByRole[role] || [];

  return (
    <div className="bg-primaryLight h-[calc(100vh-64px)] mt-1 p-4 text-white w-64">
      <div className="flex justify-center items-center">
          <span>Hello</span>
      </div>
      <ul className="flex flex-col gap-10 mt-10">
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
    </div>
  );
};

export default Sidebar;
