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
import CheckRole from "../../components/check-role.tsx";
import useFetchUser from "../../hooks/useFetchUser.js";

function AdminDashboard() {
  const location = useLocation(); // Get the current route's location
  const nav = useNavigate(); // Hook to navigate programmatically
  const { loading, user } = useFetchUser(); // Fetch user data and loading state
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sidebarOpen") === "true" // Check sidebar state from localStorage
  );

  // Determine the header title based on the current route
  let headerTitle = "Dashboard";
  if (location.pathname === "/admin") headerTitle = "Dashboard";
  else if (location.pathname === "/admin/product-management")
    headerTitle = "Product Management";
  else if (location.pathname === "/admin/supplier") headerTitle = "Supplier";
  else if (location.pathname === "/admin/user-management")
    headerTitle = "User Management";
  else if (location.pathname === "/admin/sales-reports")
    headerTitle = "Sale Reports";

  // Handle sign out: clear localStorage and redirect to login page
  const handleSignOut = () => {
    localStorage.clear();
    nav("/");
  };

  // Update document title with the current header title
  useEffect(() => {
    document.title = `Infinitum Admin | ${headerTitle}`;
  }, [headerTitle]);

  // Update sidebar state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", sidebarOpen);
  }, [sidebarOpen]);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Show loading state while user data is being fetched
  if (loading) return <div>Loading ...</div>;

  // Redirect to login if there's no user
  if (!user) {
    nav("/");
    return null;
  }

  return (
    <CheckRole>
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <img src={logo} alt="Infinitum Technologies" className="logo" />
          </div>
          <nav className="nav-links">
            <ul>
              {/* Sidebar Links */}
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
                    location.pathname === "/admin/user-management"
                      ? "active"
                      : ""
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
            {/* Sign out button */}
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

        {/* Main Content */}
        <div className={`admin-content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <div className="header">
            {/* Menu Icon to toggle Sidebar */}
            <img
              src={menuIcon}
              alt="Menu Icon"
              className="menu-icon"
              onClick={toggleSidebar}
            />
            <div className="header-title">
              <h1>{headerTitle}</h1>
            </div>
            <div className="user-info">
              {user && (
                <span className="user-name">
                  {user.first_name} {user.last_name}
                </span>
              )}
            </div>
          </div>
          {/* Outlet for child routes */}
          <Outlet />
        </div>
      </div>
    </CheckRole>
  );
}

export default AdminDashboard;
