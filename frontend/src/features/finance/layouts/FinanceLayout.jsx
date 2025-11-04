import React from "react";
import { Outlet } from "react-router-dom";

const FinanceLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default FinanceLayout;
