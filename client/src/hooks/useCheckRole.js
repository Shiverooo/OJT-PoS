import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function useCheckRole(userRole) {
    const nav = useNavigate();

    useEffect(() => {
        if ( userRole && userRole !== 'admin'){
            nav('/cashier');
        } 
    }, [userRole,nav]);

}

export default useCheckRole
