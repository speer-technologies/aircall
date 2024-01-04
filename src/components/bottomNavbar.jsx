import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope, FaCog } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import { IoIosKeypad } from "react-icons/io";
import { TbCircleDotFilled } from "react-icons/tb";
import "../css/navbar.css";

const BottomNavbar = () => {
  const location = useLocation();
  const isLinkActive = (pathname) => {
    return location.pathname === pathname;
  };
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (index, path) => {
    setActiveTab(index);
    navigate(path);
  };

  const tabs = [
    { icon: <MdAddCall />, path: "/" },
    { icon: <FaUser />, path: "/archived" },
    { icon: <IoIosKeypad />, path: "/blank" },
    { icon: <FaCog />, path: "/blank" },
    { icon: <TbCircleDotFilled />, path: "/blank" },
  ];

  return (
    <nav className="bottom-navbar">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${isLinkActive(tab.path) ? "active" : ""} ${
            index === 2 ? "middle-icon" : "normal-icon"
          }`}
          onClick={() => handleTabClick(index, tab.path)}
        >
          {tab.icon}
        </div>
      ))}
    </nav>
  );
};

export default BottomNavbar;
