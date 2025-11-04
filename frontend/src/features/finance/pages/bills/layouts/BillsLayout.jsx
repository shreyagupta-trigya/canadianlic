import React from "react";
import { Outlet } from "react-router-dom";

const BillsLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BillsLayout;
