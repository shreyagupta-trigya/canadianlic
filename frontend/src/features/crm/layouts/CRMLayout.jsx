import { Outlet } from "react-router-dom";

export default function CRMLayout() {
  return (
    <div>
      {/* CRM navbar/sidebar/etc. */}
      <Outlet />
    </div>
  );
}
