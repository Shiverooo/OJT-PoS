import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchUser from '../hooks/useFetchUser.js'

function CheckRole({children}) {
    const { userRole } = useFetchUser();
    const nav = useNavigate();

    useEffect(() => {        
        if ( userRole && userRole !== 'admin'){
            nav('/cashier');
        }
    }, [userRole,nav]);

    return userRole === 'admin'? <>{children}</> : null ;
}

export default CheckRole
