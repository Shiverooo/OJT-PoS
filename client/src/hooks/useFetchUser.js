import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function useFetchUser() {
  const [user, setUser] = useState(null);         // State to store user data
  const [loading, setloading] = useState(true);   // State to track loading status
  const [userRole, setUserRole] = useState("");   // State to store the user's role (e.g., admin, cashier)
  
  const nav = useNavigate();   // Hook to programmatically navigate

  useEffect(() => {
    console.log('Mounted');  // Log when component is mounted

    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (token) {
      // If token exists, fetch user data from the server
      axios.get('/users/auth-user', {
        headers: { Authorization: `Bearer ${token}` }  // Attach token to the request header
      })
      .then(res => {
        // On success, update user data and role
        setUser(res.data.user);
        setUserRole(res.data.role || res.data.user?.role || "");
        setloading(false);  // Set loading to false when data is fetched
      })
      .catch(() => {
        // On error, stop loading and navigate to login page
        setloading(false);
        nav('/');  // Redirect to login page
      });
    } else {
      // If no token, stop loading and redirect to login page
      setloading(false);
      nav('/');  // Redirect to login page
    }

    // Cleanup function when component is unmounted
    return () => {
      console.log('Unmounted');  // Log when component is unmounted
    };
  }, [nav]);  // Dependency array to run effect when `nav` changes

  // useEffect(()=>{
  //   if (user) console.log('User updated:', user);
  // }, [user]) 
  
  // useEffect(()=>{
  //   if (userRole) console.log('User updated:', userRole);
  // }, [userRole]) 

  return {user, loading, userRole}
}

export default useFetchUser;