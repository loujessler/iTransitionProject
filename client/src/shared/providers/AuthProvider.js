// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.get('authToken'));
//     const [userAvatar, setUserAvatar] = useState(cookies.get('userAvatar'));
//
//     const logIn = (avatarUrl) => {
//         cookies.set('userAvatar', avatarUrl);
//         setUserAvatar(avatarUrl);
//         setIsAuthenticated(true);
//     };
//
//     const logOut = () => {
//         if (isAuthenticated) {
//             cookies.delete('authToken');
//             cookies.delete('userAvatar');
//             setIsAuthenticated(false);
//             setUserAvatar(null);
//         } else {
//             console.log('You are already logged out');
//         }
//     };
//
//     return (
//         <AuthContext.Provider value={{ isAuthenticated, userAvatar, logIn, logOut }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import {useNavigate} from "react-router-dom";
import React, { createContext, useContext, useState } from 'react';
import cookies from '../../utils/cookies';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.get('authToken'));
    const navigate = useNavigate();

    const logIn = () => {
        setIsAuthenticated(true);
    };

    const logOut = () => {
        if (isAuthenticated) {
            cookies.delete('authToken');
            setIsAuthenticated(false);
            navigate('/');
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
