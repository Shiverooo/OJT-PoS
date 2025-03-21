import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from '../../components/cashier/sidebar.tsx';
import Receipt from '../../components/cashier/receipt.tsx';
import menuIcon from "../../assets/images/menu-icon.svg";
import barcodeIcon from "../../assets/images/barcode-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import '../../styles/cashier/main-section.css';
import '../../styles/cashier/cashier.css';

function CashierDashboard() {
    useEffect(() => {
        document.title = "Infinitum PoS | Cashier";
    }, []);

    const location = useLocation();
    const isSalesHistoryPage = location.pathname === "/cashier/sales-history";
    const isInventoryPage = location.pathname === "/cashier/inventory";
    const isReceiptPage = location.pathname === "/cashier";

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    // Close sidebar when clicking outside
    const closeSidebarOnClickOutside = (event: MouseEvent) => {
        // Close if the click is outside of the sidebar and the menu icon
        if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('#menu-icon')) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeSidebarOnClickOutside);
        return () => {
            document.removeEventListener('mousedown', closeSidebarOnClickOutside);
        };
    }, [isSidebarOpen]);

    const [query, setQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        console.log("Searching for:", event.target.value);
    };

    const mainSectionClass = `main-section ${isReceiptPage ? "less-view" : ""}`;

    return (
        <div className="cashier-container">
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
                    <span className="title">
                        {isSalesHistoryPage ? "History" : isInventoryPage ? "Inventory" : "Products"}
                    </span>

                    {!(isSalesHistoryPage || isInventoryPage) && (
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
                    )}
                </div>
                <Outlet />
            </div>
            <Receipt />
        </div>
    );
}

export default CashierDashboard;
