import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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
            <Link to="/admin">
            <li className={`nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}>
              <img src={dashboardIcon} alt="Dashboard Icon" className="nav-icon" />
                Dashboard
            </li>
            </Link>
            <Link to="/admin">
            <li className={`nav-item ${location.pathname === "/admin/product-management" ? "active" : ""}`}>
                <img src={productIcon} alt="Product Management Icon" className="nav-icon" />
                Product Management
            </li>
            </Link>
            <Link to="/admin/user-management">
            <li className={`nav-item ${location.pathname === "/admin/user-management" ? "active" : ""}`}>
                <img src={userIcon} alt="User Management Icon" className="nav-icon" />
                User Management
            </li>
            </Link>
            <Link to="/admin/sales-reports">
            <li className={`nav-item ${location.pathname === "/admin/sale-reports" ? "active" : ""}`}>
                <img src={salesIcon} alt="Sale Reports Icon" className="nav-icon" />
                Sale Reports
            </li>
            </Link>
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
