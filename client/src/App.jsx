import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login.tsx";

import CashierDashboard from "./page/cashier-dashboard/cashier-dashboard.tsx";
import SalesScreen from "./page/cashier-dashboard/dashboard/sales-screen.tsx";
import SalesHistory from "./page/cashier-dashboard/dashboard/sales-history.tsx";
import Inventory from "./page/cashier-dashboard/dashboard/inventory.tsx";

import AdminDashboard from "./page/admin-dashboard/admin-dashboard.tsx";
import AdminMainDashboard from "./page/admin-dashboard/dashboard/admin-main-dashboard.tsx";
import ProductManagement from "./page/admin-dashboard/dashboard/product-management.tsx";
import Supplier from "./page/admin-dashboard/dashboard/supplier.tsx";
import UserManagement from "./page/admin-dashboard/dashboard/user-management.tsx";
import SalesReport from "./page/admin-dashboard/dashboard/sales-reports.tsx";

import NoPage from "./page/no-page.tsx";
import "./App.css";

// 👇 Import the context
import { SelectedProductsProvider } from "./components/cashier/sale-screen/selected-products-context.tsx";

function App() {
  return (
    <SelectedProductsProvider>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="cashier" element={<CashierDashboard />}>
            <Route index element={<SalesScreen />} />
            <Route path="sales-history" element={<SalesHistory />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
          <Route path="admin" element={<AdminDashboard />}>
            <Route index element={<AdminMainDashboard />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="supplier" element={<Supplier />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="sales-reports" element={<SalesReport />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </SelectedProductsProvider>
  );
}

export default App;
