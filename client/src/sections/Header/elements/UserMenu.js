import React from 'react';
import {Menu, MenuItem, Typography, ListItemIcon} from "@mui/material";


export const UserMenu = ({ anchorElUser, handleCloseUserMenu , userMenuItems}) => {
    function handleSettingsAction(actionFunction) {
        return function() {
            handleCloseUserMenu();
            actionFunction();
        }
    }

    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {Object.entries(userMenuItems).map(([menuItem, { action: action, icon: Icon }]) => (
                <MenuItem key={menuItem} onClick={handleSettingsAction(action)}>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <Typography textAlign="center">{menuItem}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};
