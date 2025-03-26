import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from '../../components/cashier/sidebar.tsx';
import Receipt from '../../components/cashier/receipt.tsx';
import SearchContainer from '../../components/cashier/searchbar.tsx';
import menuIcon from "../../assets/images/menu-icon.svg";
import barcodeIcon from "../../assets/images/barcode-icon.svg";
import { SearchProvider } from '../../components/cashier/search-context.tsx';
import '../../styles/cashier/cashier-dashboard.css';

function CashierDashboard() {
    const location = useLocation();
    const isSalesHistoryPage = location.pathname === "/cashier/sales-history";
    const isInventoryPage = location.pathname === "/cashier/inventory";
    const isReceiptPage = location.pathname === "/cashier";

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const closeSidebarOnClickOutside = (event: MouseEvent) => {
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

    const cashierDashboardClass = `main-section ${isReceiptPage ? "less-view" : ""}`;

    return (
        <SearchProvider>
            <div className="cashier-container">
                <div className={cashierDashboardClass}>
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
                            {isSalesHistoryPage ? "Sale History" : isInventoryPage ? "Inventory" : "Products"}
                        </span>

                        {!(isSalesHistoryPage || isInventoryPage) && (
                            <div className="header-icons">
                                <img
                                    src={barcodeIcon}
                                    alt="Barcode"
                                    className="icon"
                                    id="barcode-icon"
                                />
                                <SearchContainer />
                            </div>
                        )}
                    </div>
                    <Outlet />
                </div>
                <Receipt />
            </div>
        </SearchProvider>
    );
}

export default CashierDashboard;
