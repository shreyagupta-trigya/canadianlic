import { Outlet } from "react-router-dom";
import React from 'react'


export default function SalesLayout() {
  return (
    <div>
      {/* CRM navbar/sidebar/etc. */}
      <Outlet />
    </div>
  );
}






