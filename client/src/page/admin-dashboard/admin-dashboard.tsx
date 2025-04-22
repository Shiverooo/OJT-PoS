import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../styles/admin/admin-dashboard.css";
import logo from "../../assets/images/infinitum.png";
import dashboardIcon from "../../assets/images/dashboard-icon.svg";
import productIcon from "../../assets/images/barcode_icon.svg";
import supplyIcon from "../../assets/images/admin-supplier.svg";
import userIcon from "../../assets/images/user-management-icon.svg";
import salesIcon from "../../assets/images/sale-reports-icon.svg";
import menuIcon from "../../assets/images/menu-icon.svg";
import signOutIcon from "../../assets/images/sign-out.svg";
import useFetchUser from '../../hooks/useFetchUser.js';;

function AdminDashboard() {
  const location = useLocation();
  const nav = useNavigate();
  const {loading, user} = useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sidebarOpen") === "true"
  );

  // Determine the header title based on the current route
  let headerTitle = "Dashboard";

  if (location.pathname === "/admin") {
    headerTitle = "Dashboard";
  } else if (location.pathname === "/admin/product-management") {
    headerTitle = "Product Management";
  } else if (location.pathname === "/admin/supplier") {
    headerTitle = "Supplier";
  } else if (location.pathname === "/admin/user-management") {
    headerTitle = "User Management";
  } else if (location.pathname === "/admin/sales-reports") {
    headerTitle = "Sale Reports";
  }

  const handleSignOut = () =>{
    localStorage.clear()
    nav('/')
  }

  useEffect(() => {
    document.title = `Infinitum Admin | ${headerTitle}`;
  }, [headerTitle]);

  // Update localStorage whenever sidebar state changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", sidebarOpen);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  if (loading) return <div>Loading ...</div>

    if(!user){
        nav('/');
        return null;
    }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Infinitum Technologies" className="logo" />
        </div>
        <nav className="nav-links">
          <ul>
            <Link to="/admin">
              <li
                className={`admin-item ${
                  location.pathname === "/admin" ? "active" : ""
                }`}
              >
                <img
                  src={dashboardIcon}
                  alt="Dashboard Icon"
                  className="nav-icon"
                />
                Dashboard
              </li>
            </Link>
            <Link to="/admin/product-management">
              <li
                className={`admin-item ${
                  location.pathname === "/admin/product-management"
                    ? "active"
                    : ""
                }`}
              >
                <img
                  src={productIcon}
                  alt="Product Management Icon"
                  className="nav-icon"
                />
                Product Management
              </li>
            </Link>
            <Link to="/admin/supplier">
              <li
                className={`admin-item ${
                  location.pathname === "/admin/supplier" ? "active" : ""
                }`}
              >
                <img
                  src={supplyIcon}
                  alt="Supplier Icon"
                  className="nav-icon"
                />
                Supplier
              </li>
            </Link>
            <Link to="/admin/user-management">
              <li
                className={`admin-item ${
                  location.pathname === "/admin/user-management" ? "active" : ""
                }`}
              >
                <img
                  src={userIcon}
                  alt="User Management Icon"
                  className="nav-icon"
                />
                User Management
              </li>
            </Link>
            <Link to="/admin/sales-reports">
              <li
                className={`admin-item ${
                  location.pathname === "/admin/sales-reports" ? "active" : ""
                }`}
              >
                <img
                  src={salesIcon}
                  alt="Sale Reports Icon"
                  className="nav-icon"
                />
                Sale Reports
              </li>
            </Link>
          </ul>
        </nav>
        <footer className="sidebar-footer">
            <button className="admin-sign-out" onClick={handleSignOut}>
              <img src={signOutIcon} alt="Sign Out Icon" />
              Sign Out
            </button>
          <p>
            Copyright © 2023 Infinitum
            <br />
            Technologies, Inc. All
            <br />
            Rights Reserved.
          </p>
        </footer>
      </div>

      {/* Header */}
      <div className={`admin-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="header">
          <img
            src={menuIcon}
            alt="Menu Icon"
            className="menu-icon"
            onClick={toggleSidebar}
          />
          <div className="header-title">
            <h1>{headerTitle}</h1>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
