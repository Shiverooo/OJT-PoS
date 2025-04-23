import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/cashier/sidebar.css"; // Import styles
import cartIcon from "../../assets/images/cart.svg";
import receiptIcon from "../../assets/images/receipt.svg";
import boxIcon from "../../assets/images/box.svg";
import signOutIcon from "../../assets/images/sign-out.svg";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const nav = useNavigate()
  const handleSignOut = () =>{
    localStorage.removeItem('token');
    nav('/');
  }
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <Link to="/cashier">
          <li className={location.pathname === "/cashier" ? "active" : ""}>
            <img src={cartIcon} alt="Cart Icon" />
            Sales Screen
          </li>
        </Link>
        <Link to="/cashier/sales-history">
          <li className={location.pathname === "/cashier/sales-history" ? "active" : ""}>
            <img src={receiptIcon} alt="Receipt Icon" />
            Sales History
          </li>
        </Link>
        <Link to="/cashier/inventory">
          <li className={location.pathname === "/cashier/inventory" ? "active" : ""}>
            <img src={boxIcon} alt="Box Icon" />
            Inventory
          </li>
        </Link>
      </ul>

      <Link to="/">
        <button className="sign-out" onClick={handleSignOut}>
          <img src={signOutIcon} alt="Sign Out Icon" />
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
