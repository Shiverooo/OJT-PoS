import React, { useState } from "react";
import Sidebar from "./sidebar.tsx";
import menuIcon from "../assets/images/menu-icon.svg";
import barcodeIcon from "../assets/images/barcode-icon.svg";
import searchIcon from "../assets/images/search-icon.svg";
import '../styles/cashier/main-section.css'

function MainSection() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const [query, setQuery] = useState("");

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      console.log("Searching for:", event.target.value);
   };

   const products = new Array(12).fill({
      name: "Computer Set",
      image: require("../assets/images/computer.jpg"),
   });

   const [active, setActive] = useState(0);
   const navItems = [
      "Laptops and Desktops",
      "Printers and Ink",
      "Monitors",
      "Storage",
      "Other Accessories",
      "Gaming Devices"
   ];

   return (
      <div className="main-section">
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

         <div className="cashier-container">
            <div className="product-container">
               <div className="products-grid">
                  {products.map((product, index) => (
                     <div className="product-card" key={index}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-name">{product.name}</div> {/* Product name overlay */}
                     </div>
                  ))}
               </div>


               <div className="nav-category">
                  <nav className="navbar">
                     <ul className="nav-list">
                        {navItems.map((item, index) => (
                           <li
                              key={index}
                              className={`nav-item ${active === index ? "active" : ""}`}
                              onClick={() => setActive(index)}
                           >
                              {item}
                           </li>
                        ))}
                     </ul>
                  </nav>
               </div>
            </div>
         </div>
      </div >
   );
}

export default MainSection;
