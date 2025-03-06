import React, { useState } from "react";
// import { Helmet, HelmetProvider } from "react-helmet-async"; 
import "../styles/login/login.css"; 
import LoginForm from "../components/login-form.tsx" 


const Login = () => {
    return (
        // <HelmetProvider>
        //     <Helmet>
        //         <title>Infinitum | Log In</title>
        //     </Helmet>

            <div className="container">
                {/* Login Section */}
                <div className="login-section">
                    <LoginForm/>
                </div>
                {/* Background Section */}
                <div className="background-section">
                </div>
            </div >
        // </HelmetProvider>
    );
};

export default Login;