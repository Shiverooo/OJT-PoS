import React, { useEffect } from "react";
import "../styles/login/login.css"; 
import LoginForm from "../components/login-form.tsx";
import axios  from "axios";

const Login = () => {
    // const fetchAPI = async () => {
    //     try {
    //         const response = await axios.get(/users');
    //         console.log(response.data.users);
    //     } catch (error) {
    //         console.error("Failed to fetch users:", error.message);
    //     }
    // };

    useEffect(() => {
        document.title = "Infinitum PoS | LogIn";
        // fetchAPI();
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
