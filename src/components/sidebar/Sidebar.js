import React from "react";
import SidebarItem from "./SidebarItem";
import items from "../utils/sidebar.json";
import "../dashboard.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
 
  return (
    <div className="sidebar bg-white lg:fixed w-full">
      <div className="h-20 w-20 mb-8 mt-10">
        <Link to="/boards" className="brand-logo">
          <img className="logo-abbr rounded-full flex item-center justify-center w-12 ml-2 object-cover h-12" src="https://cdn.pixabay.com/photo/2018/07/01/20/01/dashboard-3510327_640.jpg" alt="" />
        </Link>
      </div>
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};
export default Sidebar;
