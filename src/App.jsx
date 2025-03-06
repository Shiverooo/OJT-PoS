import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login.tsx"; // Import your login component
import Cashier from "./page/cashier.tsx";
import NoPage from "./page/no-page.tsx";
import "./App.css"

function App() {
    return (    
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} /> 
                <Route path="/cashier" element={<Cashier/>} />
                <Route path="*" element ={<NoPage/>} />
            </Routes>
        </Router>
    );
}

export default App;