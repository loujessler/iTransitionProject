import { useState } from 'react';
import {useNavigate} from "react-router-dom";

export const useUserMenu = () => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenProfile = () => {
        navigate(`/profile`)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return {
        anchorElUser,
        handleOpenProfile,
        handleOpenUserMenu,
        handleCloseUserMenu,
    };
};
