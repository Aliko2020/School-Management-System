import LinksByRole from "./LinksByRoles.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout as loginAction } from '../../features/auth/authSlice.js'
import { toast } from "react-toastify";



const Sidebar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfo?.role;
  const links = LinksByRole[role] || [];
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logout = ()=>{
    try{
        localStorage.removeItem("userToken")
        localStorage.removeItem("userInfo")
        dispatch(loginAction())
        toast.success('Logout Successful')
        navigate('/')
    }catch(error){
        console.log("Logout error",error)
    }
  }

  return (
    <div className="h-screen w-64 bg-primaryLight backdrop-blur-md flex flex-col justify-around p-6">

      {/* profile info */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
        <img
          src={userInfo?.avatar || `https://ui-avatars.com/api/?name=${userInfo?.name || "User"}`}
          alt="user-avatar"
          className="w-10 h-10 rounded-full border-2 border-accent object-cover"
        />
        <div>
          <div className="font-semibold text-white text-sm">
            {userInfo?.name || "Smart Learns"}
          </div>
          <div className="text-xs text-gray-300 capitalize">{userInfo?.role || "Guest"}</div>
        </div>
      </div>

      {/* url links */}
      <ul className="flex flex-col gap-3 text-white">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition duration-200 ${isActive
                  ? "bg-accent"
                  : "hover:bg-white/20 "
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-md font-medium">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* logout */}
        <button onClick={()=> logout()} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer text-sm font-semibold">
          <TbLogout size={22} /> Logout
        </button>
    </div>
  );
};

export default Sidebar;
