import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const userToken = useSelector((state) => state.auth.userToken);

  if (!userToken) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(userToken);
    const userRole = decoded.role;
    
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
