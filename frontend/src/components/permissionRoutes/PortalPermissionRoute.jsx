// PermissionRoute.jsx
import { Navigate } from "react-router-dom";

export default function PortalPermissionRoute({ children, requiredPermission }) {
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]"); // for example only
   //r IndexedDB logic

  const hasPermission = permissions.includes(requiredPermission);

  if (!hasPermission) return <Navigate to="/" replace />;
  return children;
}
