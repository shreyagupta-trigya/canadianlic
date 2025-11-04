// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("authToken");
//   return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
// };

// export default ProtectedRoute;
