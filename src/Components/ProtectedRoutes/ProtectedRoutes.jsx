import { useSelector } from "react-redux";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children, allowedRoles }) {
  const { user } = useAuth();
  const userRole = useSelector((state) => state.user.role);

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/vistanoautorizada" />;
  }
  
  return <>{children}</>;
}
