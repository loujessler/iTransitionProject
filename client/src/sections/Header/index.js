import React from 'react';
import {AppBar, Toolbar, Typography, Button, Tooltip, IconButton, Avatar, Box} from '@mui/material';
import {AccountBox, Person, Logout} from "@mui/icons-material";
import MainPageStyles from "../../styles/MainPageStyles";

import {useThemeState} from "../../shared/providers/ThemeProvider";
import {useAuth} from "../../shared/providers/AuthProvider";
import Sidebar from "../Sidebar";

import {useHeader} from "./hooks/useHeader";
import {useUserMenu} from "./hooks/useUserMenu";

import ModeThemeBtn from "../../components/ModeThemeBtn";
import AuthDialog from "../../components/AuthDialog";

import SearchCustom from "./elements/SearchCustom";
import {UserMenu} from "./elements/UserMenu";


export function Header() {
    const {logOut} = useAuth()
    const {isMobile} = useThemeState();
    const {isAuthenticated} = useAuth();

    const {authMode, setAuthMode, avatar} = useHeader();
    const {anchorElUser, handleOpenProfile, handleOpenUserMenu, handleCloseUserMenu} = useUserMenu();

    const userMenuItems = {
        "Profile": { action: handleOpenProfile, icon: Person },
        "Account": { action: handleCloseUserMenu, icon: AccountBox },
        "Dashboard": { action: handleCloseUserMenu, icon: Person },
        "Logout": { action: logOut, icon: Logout },
    };

    return (
        <AppBar position="static" sx={MainPageStyles.appBar}>
            <Toolbar sx={{justifyContent: 'space-evenly'}}>
                {isMobile ? (<Sidebar userMenuItems={userMenuItems}/>) : (<ModeThemeBtn componentType={'iconButton'}/>)}
                <Typography variant="h6" style={{flexGrow: 1}}>
                    SACI
                </Typography>
                <SearchCustom/>
                {!isMobile && (isAuthenticated ? (
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar alt="Remy Sharp" src={avatar}/>
                                </IconButton>
                            </Tooltip>
                            <UserMenu
                                id='user-menu'
                                anchorElUser={anchorElUser}
                                handleCloseUserMenu={handleCloseUserMenu}
                                userMenuItems={userMenuItems}
                            />
                        </Box>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => setAuthMode('login')}>Login</Button>
                            <Button color="inherit" onClick={() => setAuthMode('register')}>Register</Button>
                        </>
                    )
                )}
                <AuthDialog key={authMode} open={authMode !== null} onClose={() => setAuthMode(null)} mode={authMode}/>
            </Toolbar>
        </AppBar>
    );
};
