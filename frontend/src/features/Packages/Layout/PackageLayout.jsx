import React from "react";
import { Outlet } from "react-router-dom";

const PackageLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PackageLayout;
