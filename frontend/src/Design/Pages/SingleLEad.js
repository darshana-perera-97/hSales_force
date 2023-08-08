import React from "react";
import NavBar from "../Layouts/NavBar";
import LeadData from "../Layouts/LeadData";
import FloatingChat from "../Layouts/FloatingChat ";

export default function SingleLEad(prop) {
  return (
    <div className="d-flex">
      <NavBar page="user1" />
      <LeadData />
      <FloatingChat />
    </div>
  );
}
