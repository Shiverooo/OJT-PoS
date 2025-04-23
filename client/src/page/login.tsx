import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import "../styles/login/login.css"; 
import LoginForm from "../components/login-form.tsx";
import useFetchUser from '../hooks/useFetchUser.js'

const Login = () => {
    const {user, loading, userRole} = useFetchUser()
    const nav = useNavigate();
    useEffect(() => {
        document.title = "Infinitum PoS | LogIn";
        // fetchAPI();
    }, []);
    
    if(user){
        if(userRole === "cashier"){
            nav('/cashier')
        }else if (userRole === "admin"){
            nav('/admin')
        }
    }
    if (loading) return <div>Loading ...</div>
    
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
