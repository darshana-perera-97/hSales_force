import React from "react";
import profilePicture from "../Assets/profilePicture.png";
export default function TopBar() {
  return (
    <div className="topbar">
      <div className="user-details d-flex">
        <img src={profilePicture} alt="profilePicture" />
        <div className="user-details-data">
          <h3>User Name</h3>
          <p>Super M</p>
        </div>
      </div>
    </div>
  );
}
