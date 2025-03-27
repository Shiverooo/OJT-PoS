import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login.tsx"; // Import your login component

import CashierDashboard from "./page/cashier-dashboard/cashier-dashboard.tsx";
import SalesScreen from "./page/cashier-dashboard/dashboard/sales-screen.tsx";
import SalesHistory from "./page/cashier-dashboard/dashboard/sales-history.tsx";
import Inventory from "./page/cashier-dashboard/dashboard/inventory.tsx";

import AdminDashboard from "./page/admin-dashboard/admin-dashboard.tsx";
import ProductManagement from "./page/admin-dashboard/dashboard/product-management.tsx"
import UserManagement from "./page/admin-dashboard/dashboard/user-management.tsx"
import SalesReport from "./page/admin-dashboard/dashboard/sales-report.tsx"
import NoPage from "./page/no-page.tsx";
import "./App.css"



function App() {
    return (    
        <Router>
            <Routes>
                <Route index element={<Login/>}/> 
                <Route path="cashier" element={<CashierDashboard/>}>
                    <Route index element={<SalesScreen/>}/>
                    <Route path="sales-history" element={<SalesHistory/>}/>
                    <Route path="inventory" element={<Inventory/>}/>
                </Route>
                <Route path="admin" element={<AdminDashboard/>}>
                    <Route index element={<ProductManagement/>}/>
                    <Route path="user-management" element={<UserManagement/>}/>
                    <Route path="sales-reports" element={<SalesReport/>}/>
                </Route>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;