import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function useFetchUser() {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [userRole, setUserRole] = useState("");
  
  const nav = useNavigate();   
  
  useEffect(() => { 
    console.log('Mounted')
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/users/auth-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setUser(res.data.user);
        console.log(user);
        setUserRole(res.data.role || res.data.user?.role || "");
        console.log(userRole);
        setloading(false);
      })
      .catch(() => {
        setloading(false);
        nav('/');
      });
    } else {
      setloading(false);
      nav('/');
    }

    return ()=>{
      console.log('Unmounted');
    };
  }, [nav]);

  // useEffect(()=>{
  //   if (user) console.log('User updated:', user);
  // }, [user]) 
  
  // useEffect(()=>{
  //   if (userRole) console.log('User updated:', userRole);
  // }, [userRole]) 

  return {user, loading, userRole}
}

export default useFetchUser;