import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // const isAuthenticated = !!localStorage.getItem("authToken");
 const isAuthenticated = true;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? children : null;
};

export default LoginProtectedRoute;
