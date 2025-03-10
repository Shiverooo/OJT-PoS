import React from "react";
import "../styles/cashier/sidebar.css"; // Import styles

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>Sales Screen</li>
        <li>Sales History</li>
        <li>Cash Register</li>
        <li>Inventory</li>
        <li>Analytics</li>
      </ul>
    </div>
  );
};

export default Sidebar;