import React from "react";
import { useState } from "react";
import "../dashboard.css";
import { NavLink } from "react-router-dom";
import { getUser } from "../utils/common";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const user = getUser();
  const findType = user[0]?.type;

  console.log("user",user)

  let dataChild = [];
  for (let i = 0; i < item.childrens?.length; i++) {
    for (let j = 0; j < item.childrens[i]?.role?.length; j++) {
      if (item.childrens[i].role[j] !== findType) {
        dataChild.push(item.childrens[i]);
      }
    }
  }

  if (item.childrens) {
    return (
      <>
        <div
          className={
            open
              ? "sidebar-item cursor-pointer open"
              : "sidebar-item cursor-pointer"
          }
          onClick={() => setOpen(!open)}
        >
          <div className="sidebar-title card-title mb-1">
            <span>
              {item.icon && <i className={item.icon}></i>}
              {item.title}
            </span>
            <i className="bi bi-chevron-right toggle-btn"></i>
          </div>
          <div className="sidebar-content">
            {dataChild.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <NavLink
        to={item.path || "#"}
        className={(navData) => {
          if (navData.isActive)
            return "bg-[#f5f1da] text-black sidebar-item plain card-title mb-1";
          return "sidebar-item plain card-title mb-1";
        }}
      >
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </NavLink>
    );
  }
};
export default SidebarItem;
