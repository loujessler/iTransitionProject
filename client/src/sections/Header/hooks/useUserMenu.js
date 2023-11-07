import { useState } from 'react';

export const useUserMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return {
        anchorElUser,
        handleOpenUserMenu,
        handleCloseUserMenu,
    };
};
