import { useAuthContext } from '../contexts/AuthContext';
import { isAuthenticated } from '../services/AuthenticationService';
import { Navigate } from 'react-router-dom';
import React from "react"

export const isAuth = (Component) =>{
    const WrappperComponent = (props) =>{
        const {user} = useAuthContext();

        if(isAuthenticated){
            return(<Component {...props} user={user} />);
        }
        else{
            return <Navigate to='/Login'/>
        }        
    }

    return WrappperComponent;
}