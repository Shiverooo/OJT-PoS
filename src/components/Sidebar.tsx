import React from "react";
import "../styles/cashier/sidebar.css"; // Import styles
import cartIcon from "../assets/images/cart.svg";
import receiptIcon from "../assets/images/receipt.svg";
import boxIcon from "../assets/images/box.svg";
import signOutIcon from "../assets/images/sign-out.svg";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar menu */}
      <ul>
        <li>
          <img src={cartIcon} alt="Cart Icon" />
          Sales Screen
        </li>
        <li>
          <img src={receiptIcon} alt="Receipt Icon" />
          Sales History
        </li>
        <li>
          <img src={boxIcon} alt="Box Icon" />
          Inventory
        </li>
      </ul>

      {/* Sign Out Button */}
      <button className="sign-out">
        <img src={signOutIcon} alt="Sign Out Icon" />
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
