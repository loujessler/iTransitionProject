import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Drawer, Switch
} from "@mui/material";
import {Inbox, Menu, Login, PersonAddAlt, Logout} from "@mui/icons-material";
import React, {useState} from "react";
import ModeTheme from "../utils/ModeTheme";
import {useThemeState} from "../utils/ThemeProvider";
import AuthDialog from "../authorization/AuthDialog";
import {useAuth} from "../utils/AuthProvider";

function Sidebar() {
    const {mode, setMode} = useThemeState();
    const {isAuthenticated, logOut} = useAuth();
    const [authMode, setAuthMode] = useState(null);
    const [state, setState] = useState({left: false,});

    const authItems = isAuthenticated
        ? [{type: 'logout', icon: <Logout/>, text: 'LOGOUT'}]
        : [
            {type: 'login', icon: <Login/>, text: 'LOGIN'},
            {type: 'register', icon: <PersonAddAlt/>, text: 'REGISTER'},
        ];

    const toggleDrawer = (open) => (e) => {
        if (e && e.type === 'keydown' &&
            (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }

        setState({...state, left: open});
    };

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <Menu/>
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer(false)}
            >
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
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
                    <List>
                        {authItems.map((item) => (
                            <ListItem key={item.type} disablePadding>
                                <ListItemButton color="inherit" onClick={() => {
                                    item.type === 'logout' ? logOut() : setAuthMode(item.type);
                                }}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem key='theme_mode' disablePadding>
                            <ListItemButton onClick={() => setMode(!mode)}>
                                <ModeTheme componentType={'listItemIcon'}/>
                                <Switch onChange={() => setMode(!mode)} checked={mode}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Drawer>
            <AuthDialog key={authMode} open={authMode !== null} onClose={() => setAuthMode(null)} mode={authMode}/>
        </div>
    );
}

export default Sidebar;