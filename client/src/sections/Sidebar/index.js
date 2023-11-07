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

function Sidebar({ userMenuItems }) {
    const {isOpen, toggleSidebar} = useSidebar();
    const [authMode, setAuthMode] = useState(null);

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar(true)}>
                <Menu/>
            </IconButton>
            <Drawer
                anchor={'left'}
                open={isOpen}
                onClose={toggleSidebar(false)}
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
