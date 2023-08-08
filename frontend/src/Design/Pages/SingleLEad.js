import React from "react";
import NavBar from "../Layouts/NavBar";
import LeadData from "../Layouts/LeadData";

export default function SingleLEad(prop) {
  return (
    <div className="d-flex">
      <NavBar page="user1" />
      <LeadData/>
    </div>
  );
}
