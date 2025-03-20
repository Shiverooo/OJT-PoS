import React, { useState } from "react";
import Sidebar from "../sidebar.tsx";
import menuIcon from "../../assets/images/menu-icon.svg";
import barcodeIcon from "../../assets/images/barcode-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import '../../styles/cashier/main-section.css'
import { Outlet, useLocation } from "react-router-dom";

function MainSection() {
   const location = useLocation();
   const isReceiptPage = location.pathname ==="/cashier";
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const [query, setQuery] = useState("");

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      console.log("Searching for:", event.target.value);
   };
   const mainSectionClass = `main-section ${isReceiptPage ? "less-view" : ""}`
   return (
      <div className={mainSectionClass}>
         <div className="header-left">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <img
               src={menuIcon}
               alt="Menu"
               className={`icon ${isSidebarOpen ? "menu-icon-open" : "menu-icon-closed"}`}
               id="menu-icon"
               onClick={toggleSidebar}
            />
            <span className="title">Products</span>

            <div className="header-icons">
               <img
                  src={barcodeIcon}
                  alt="Barcode"
                  className="icon"
                  id="barcode-icon"
               />

               <div className="search-container">
                  <input
                     type="text"
                     className="search-input"
                     placeholder="Search"
                     value={query}
                     onChange={handleSearch}
                  />
                  <img src={searchIcon} alt="Search" className="search-icon" />
               </div>
            </div>
         </div>
         <Outlet/>
      </div>
   );
}

export default MainSection;
