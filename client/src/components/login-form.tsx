import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import '../styles/login/loginForm.css';
import logo from "../assets/images/logo.jpg";
import eyeOpen from "../assets/images/eye-icon-open.png";
import eyeClose from "../assets/images/eye-icon.png";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentEye, setCurrentEye] = useState(eyeClose);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
    setCurrentEye((prevEye) => (prevEye === eyeClose ? eyeOpen : eyeClose));
    };
  
  return(
    <div className="login-container">
      <img src={logo} alt="Technologies Logo" className="logo" />
      <h1>LOGIN</h1>

      <form action="#" method="POST" className="login-form">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" required />

          <label htmlFor="password">Password</label>
          <div className="password-container">
              <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
              />
              <span className="toggle-password" onClick={togglePassword}>
                  <img src={currentEye} alt="Show Password" />
              </span>
          </div>

          {/* Role Selection */}
          <div className="role-selection">
              <label htmlFor="cashier">Cashier
                  <input type="radio" className="radio-bt" id="cashier" name="role" value="cashier" required />
              </label>
              <label htmlFor="admin">Admin
                  <input type="radio" className="radio-btn" id="admin" name="role" value="admin" required />
              </label>
          </div>

          {/* Keep Me Logged In Toggle */}
          <div className="options">
              <label className="toggle-switch">
                  <input type="checkbox" name="keep_logged_in" />
                  <span className="slider"></span>
              </label>
              <span className="keep">Keep me logged in</span>
          </div>
        <NavLink to="/cashier">
            <button type="submit" className="login-button">LOG IN</button>
        </NavLink>
      </form>
    </div>
  ) ;
}

export default LoginForm;
