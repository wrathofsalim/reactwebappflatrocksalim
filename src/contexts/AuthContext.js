import React,{ createContext, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const initialAuthState = {
    accessToken: '',
    refreshToken: '',
    userModel:{},
};

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialAuthState);


    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: user.UserModel }}>
            {children}
        </AuthContext.Provider>
    );
};

