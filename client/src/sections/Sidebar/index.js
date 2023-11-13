import React, {useState} from "react";
import {
    Box,
    Divider,
    IconButton,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    List
} from "@mui/material";
import {Menu, Inbox} from "@mui/icons-material";
import useSidebar from "./hooks/useSidebar";
import {AuthItemsList} from "./elements/AuthItemsList";
import ThemeToggle from "./elements/ThemeToggle";
import AuthDialog from "../../components/AuthDialog";

function Sidebar({userMenuItems}) {
    const {isOpen, toggleSidebar} = useSidebar();
    const [authMode, setAuthMode] = useState(null);

    const SidebarStyle = {
        '.MuiBackdrop-root': {
            backdropFilter: 'brightness(200%) blur(20px)',
            backgroundColor: 'transparent',
        },
        '.MuiPaper-root': {
            top: 'auto',
            bottom: 0,
            height: 'auto',
            m: '2%',
            borderRadius: 3,
            backgroundColor: 'rgba(26,20,75,0.5)',
            color: 'text.primary',
        }
    }

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar(true)}>
                <Menu/>
            </IconButton>
            <Drawer
                anchor={'right'}
                open={isOpen}
                onClose={toggleSidebar(false)}
                sx={SidebarStyle}
            >
                <Box
                    role="presentation"
                    onClick={toggleSidebar(false)}
                    onKeyDown={toggleSidebar(false)}
                >
                    <List>
                        <ListItem key='1' disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Inbox/>
                                </ListItemIcon>
                                <ListItemText primary='haha'/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <AuthItemsList setAuthMode={setAuthMode} userMenuItems={userMenuItems}/>
                    <ThemeToggle/>
                </Box>
            </Drawer>
            <AuthDialog key={authMode} open={authMode !== null} onClose={() => setAuthMode(null)} mode={authMode}/>
        </div>
    );
}

export default Sidebar;
