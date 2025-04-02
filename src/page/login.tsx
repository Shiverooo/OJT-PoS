import React, { useEffect } from "react";
import "../styles/login/login.css"; 
import LoginForm from "../components/login-form.tsx";

const Login = () => {
    useEffect(() => {
        document.title = "Infinitum PoS | LogIn";
    }, []);
    
    return (
        <div className="container">
            {/* Login Section */}
            <div className="login-section">
                <LoginForm/>
            </div>
            {/* Background Section */}
            <div className="background-section">
            </div>
        </div>
    );
};

export default Login;
