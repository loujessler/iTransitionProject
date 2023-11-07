import { useState } from 'react';
import { useAvatar } from './useAvatar';

export const useHeader = () => {
    const [authMode, setAuthMode] = useState(null);
    const avatarUrl = '/static/images/avatar/Avatar.png';
    const avatar = useAvatar(avatarUrl);


    return {
        authMode,
        setAuthMode,
        avatar,
    };
};
