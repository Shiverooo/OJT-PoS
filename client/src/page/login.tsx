import React, { useEffect } from "react";
import "../styles/login/login.css"; 
import LoginForm from "../components/login-form.tsx";
import axios  from "axios";

const Login = () => {
    const fetchAPI = async () =>{
        const response = await axios.get('http://localhost:5000/user');
        console.log(response.data.users);
    }

    useEffect(() => {
        document.title = "Infinitum PoS | LogIn";
        fetchAPI();
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
