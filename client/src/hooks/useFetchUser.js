import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function useFetchUser() {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true)
  const nav = useNavigate();   
    
  useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/users/auth-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setUser(res.data.user);
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
  }, [nav]);

  return {user, loading};
}

export default useFetchUser;