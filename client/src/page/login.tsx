import React, { useEffect } from "react";
import "../styles/login/login.css"; 
import LoginForm from "../components/login-form.tsx";
import useFetchUser from '../hooks/useFetchUser.js'

const Login = () => {
    const {user} = useFetchUser()
    useEffect(() => {
        document.title = "Infinitum PoS | LogIn";
        // fetchAPI();
    }, []);
    if(user){
        
    }

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
