import React from "react";
import { Link } from "react-router-dom";
import product_logo from "../Assets/product_logo.png";
import dasboard_icon from "../Assets/dasboard_icon.png";
import lead_icon from "../Assets/lead.png";

export default function NavBar(prop) {
  const [activeLink, setActiveLink] = React.useState(prop.page);

  const handleTabClick = (link) => {
    setActiveLink(link);
  };

  const activeTabStyle = {
    backgroundColor: "#2a383e",
    color: "#0eccff",
  };

  const passiveTabStyle = {
    backgroundColor: "transparent",
    color: "#ffffff",
  };

  return (
    <div className="nav-bar">
      <div className="product_logo">
        <img src={product_logo} alt="product_logo" />
      </div>
      <hr />
      <div className="link-set">
        <Link
          className="single-navbar"
          style={activeLink === "dashboard" ? activeTabStyle : passiveTabStyle}
          to="/dashboard"
          onClick={() => handleTabClick("dashboard")}
        >
          <img src={dasboard_icon} alt="dasboard_icon" />
          <p>Dashboard</p>
        </Link>
        <Link
          className="single-navbar"
          style={activeLink === "user1" ? activeTabStyle : passiveTabStyle}
          to="/user1"
          onClick={() => handleTabClick("user1")}
        >
          <img src={lead_icon} alt="lead_icon" />
          <p>Leads1</p>
        </Link>
      </div>
    </div>
  );
}
