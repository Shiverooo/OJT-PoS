import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../styles/admin/admin-dashboard.css";
import logo from "../../assets/images/infinitum.png";
import dashboardIcon from "../../assets/images/dashboard-icon.svg";
import productIcon from "../../assets/images/barcode_icon.svg";
import userIcon from "../../assets/images/user-management-icon.svg";
import salesIcon from "../../assets/images/sale-reports-icon.svg";

function AdminDashboard() {
  const location = useLocation();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Infinitum Technologies" className="logo" />
        </div>
        <nav className="nav-links">
          <ul>
            <li className={`nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}>
              <a href="/admin/dashboard">
                <img src={dashboardIcon} alt="Dashboard Icon" className="nav-icon" />
                Dashboard
              </a>
            </li>
            <li className={`nav-item ${location.pathname === "/admin/product-management" ? "active" : ""}`}>
              <a href="/admin/product-management">
                <img src={productIcon} alt="Product Management Icon" className="nav-icon" />
                Product Management
              </a>
            </li>
            <li className={`nav-item ${location.pathname === "/admin/user-management" ? "active" : ""}`}>
              <a href="/admin/user-management">
                <img src={userIcon} alt="User Management Icon" className="nav-icon" />
                User Management
              </a>
            </li>
            <li className={`nav-item ${location.pathname === "/admin/sale-reports" ? "active" : ""}`}>
              <a href="/admin/sale-reports">
                <img src={salesIcon} alt="Sale Reports Icon" className="nav-icon" />
                Sale Reports
              </a>
            </li>
          </ul>
        </nav>
        <footer className="sidebar-footer">
          <p className="sidebar-footer">
            Copyright © 2023 Infinitum
            <br />
            Technologies, Inc. All
            <br />
            Rights Reserved.
          </p>
        </footer>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
