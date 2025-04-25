import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser.js";

function CheckRole({ children }) {
  // Fetch user role
  const { userRole } = useFetchUser();
  const nav = useNavigate();

  useEffect(() => {
    // Redirect to cashier if user role is not admin
    if (userRole && userRole !== "admin") {
      nav("/cashier");
    }
  }, [userRole, nav]);

  // Render children if role is admin, otherwise nothing
  return userRole === "admin" ? <>{children}</> : null;
}

export default CheckRole;
