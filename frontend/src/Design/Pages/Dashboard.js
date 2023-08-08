import React from "react";
import NavBar from "../Layouts/NavBar";
import DashboardComponents from "../Layouts/DashboardComponents";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <NavBar page="dashboard" />
      <DashboardComponents />
    </div>
  );
}
