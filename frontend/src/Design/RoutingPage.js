import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoadingPage from "./Pages/LoadingPage";
import Page404 from "./Pages/Page404";
import SingleLEad from "./Pages/SingleLEad";
import LoginPage from "./Pages/LoginPage";

export default function RoutingPage() {
  const [page, setPage] = React.useState("loading");
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard page={page} setPage={setPage} />}
        />
        <Route
          path="/user1"
          element={<SingleLEad page={page} setPage={setPage} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
