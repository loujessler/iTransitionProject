import React, { createContext, useContext, useState } from 'react';
import Cookies from './Cookies';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('authToken'));

    const logIn = () => {
        setIsAuthenticated(true);
    };

    const logOut = () => {
        if (isAuthenticated) {
            Cookies.delete('authToken');
            setIsAuthenticated(false);
        } else {
            console.log('you already logout')
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
