import React from 'react';
import {useNavigate} from "react-router-dom";
import {AppBar, Typography, Button, Tooltip, IconButton, Avatar, Box} from '@mui/material';
import {AccountBox, Person, Logout} from "@mui/icons-material";

import {useThemeState} from "../../shared/providers/ThemeProvider";
import {useAuth} from "../../shared/providers/AuthProvider";
import Sidebar from "../Sidebar";

import {useHeader} from "./hooks/useHeader";
import {useUserMenu} from "./hooks/useUserMenu";

import ModeThemeBtn from "../../components/ModeThemeBtn";
import AuthDialog from "../../components/AuthDialog";

import {HeaderStyle, StyledToolbar} from "./HeaderStyles";
import SearchCustom from "./elements/SearchCustom";
import {UserMenu} from "./elements/UserMenu";
import {useAvatar} from "./hooks/useAvatar";


export function Header() {
    const navigate = useNavigate();
    const {logOut} = useAuth()
    const {isMobile} = useThemeState();
    const {isAuthenticated} = useAuth();

    const {authMode, setAuthMode} = useHeader();

    const avatar = useAvatar();
    const {anchorElUser, handleOpenProfile, handleOpenUserMenu, handleCloseUserMenu} = useUserMenu();

    const userMenuItems = {
        "Profile": {action: handleOpenProfile, icon: Person},
        "Account": {action: handleCloseUserMenu, icon: AccountBox},
        "Dashboard": {action: handleCloseUserMenu, icon: Person},
        "Logout": {action: logOut, icon: Logout},
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                component="nav"
                elevation={12}
                enableColorOnDark={true}
                square={false}
                sx={HeaderStyle.appBar}
            >
                <StyledToolbar>
                    {isMobile ? (<Sidebar userMenuItems={userMenuItems}/>) : (
                        <ModeThemeBtn componentType={'iconButton'}/>)}
                    <Box onClick={() => navigate('/')} sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Typography variant="h6" sx={{cursor: 'pointer'}}>
                            COLLECTIONS
                        </Typography>
                    </Box>
                    <SearchCustom/>
                    {!isMobile && (isAuthenticated ? (
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Open menu">
                                        <IconButton onClick={handleOpenUserMenu}>
                                            <Avatar alt="Remy Sharp" src={avatar && avatar !== 'null' ? avatar : ''}/>
                                        </IconButton>
                                    </Tooltip>
                                    <UserMenu
                                        id='user-menu'
                                        anchorElUser={anchorElUser}
                                        handleCloseUserMenu={handleCloseUserMenu}
                                        userMenuItems={userMenuItems}
                                    />
                                </Box>
                            )
                            :
                            (
                                <>
                                    <Button color="inherit" onClick={() => setAuthMode('login')}>Login</Button>
                                    <Button color="inherit" onClick={() => setAuthMode('register')}>Register</Button>
                                </>
                            )
                    )
                    }
                    <AuthDialog key={authMode} open={authMode !== null} onClose={() => setAuthMode(null)}
                                mode={authMode}/>
                </StyledToolbar>
            </AppBar>
        </Box>
    )
        ;
}
