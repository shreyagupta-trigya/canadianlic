import React from "react";
import { Outlet } from "react-router-dom";

const InventoryLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default InventoryLayout;
