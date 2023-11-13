import React, {createContext, useContext, useState} from 'react';
import cookies from '../../services/cookies';
import profileService from "../../api/services/profileService";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.get('authToken'));

    const logIn = async (props) => {
        try {
            const response = await profileService.profile(props.token);

            sessionStorage.setItem('currentUserId', response.id);
            sessionStorage.setItem(`userUsername_${response.id}`, response.username);
            sessionStorage.setItem(`userAvatarUrl_${response.id}`, response.profile.avatar);

            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching profile data during login', error);
        }
    };

    const logOut = () => {
        if (isAuthenticated) {
            sessionStorage.clear();
            cookies.delete('authToken');
            setIsAuthenticated(false);
            // window.location.reload();
        } else {
            console.log('you already logout')
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};
