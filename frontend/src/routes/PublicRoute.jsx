import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // ✅ If already logged in, send them to home (or dashboard)
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
