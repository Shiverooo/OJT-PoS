import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login/loginForm.css";
import logo from "../assets/images/logo.jpg";
import eyeOpen from "../assets/images/eye-icon-open.png";
import eyeClose from "../assets/images/eye-icon.png";
import axios from "axios";

function LoginForm() {
  // State hooks for email, password, visibility of the password, and eye icon
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentEye, setCurrentEye] = useState(eyeClose);

  const nav = useNavigate();

  // Toggle password visibility
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
    setCurrentEye((prevEye) => (prevEye === eyeClose ? eyeOpen : eyeClose));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const res = await axios.post("/users/auth/login", {
        email,
        password,
      });
      console.log("Login: success", res.data);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Navigate based on user role
      if (res.data.user.role === "cashier") {
        nav("/cashier");
      } else if (res.data.user.role === "admin") {
        nav("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <img src={logo} alt="Technologies Logo" className="logo" />
      <h1>LOGIN</h1>

      {/* Login form */}
      <form
        action="#"
        method="POST"
        className="login-form"
        onSubmit={handleSubmit}
      >
        {/* Email field */}
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password field with toggle visibility */}
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="toggle-password" onClick={togglePassword}>
            <img src={currentEye} alt="Show Password" />
          </span>
        </div>

        {/* Keep me logged in toggle */}
        <div className="options">
          <label className="toggle-switch">
            <input type="checkbox" name="keep_logged_in" />
            <span className="slider"></span>
          </label>
          <span className="keep">Keep me logged in</span>
        </div>

        {/* Submit button */}
        <button type="submit" className="login-button">
          LOG IN
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
