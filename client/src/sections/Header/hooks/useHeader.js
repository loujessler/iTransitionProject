import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useHeader = () => {
    const [authMode, setAuthMode] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.openAuthDialog) {
            setAuthMode('login');

            navigate(location.pathname, {
                state: {
                    ...location.state,
                    openAuthDialog: false,
                },
                replace: true,
            });
        }
    }, [location, navigate]);

    return {
        authMode,
        setAuthMode,
    };
};
