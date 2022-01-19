import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'

const RestrictedRoute = ({children}) => {

    const { logged, user } = useContext(UserContext);
    
    if(!logged){
        return <Navigate to = '/'/>
    }
    return user.email === "etana@buenosaires.com" ? children : <Navigate to = '/'/>

}

export default RestrictedRoute