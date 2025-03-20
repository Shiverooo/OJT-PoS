import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login.tsx"; // Import your login component
import CashierDashboard from "./page/cashier-dashboard.tsx";
import SalesScreen from "./components/cashier/sales-screen.tsx";
import SalesHistory from "./components/cashier/sales-history.tsx";
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
                    {/* <Route path="/cash-register" element={<CashRegister/>}/> */}
                    {/* <Route path="/inventory-analytics" element={<InventoryAnalytics/>}/> */}
                </Route>
                {/* <Route path="*" element ={<NoPage/>} /> */}
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;