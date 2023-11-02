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
import {Inbox, Mail, Menu} from "@mui/icons-material";
import React from "react";
import ModeTheme from "../utils/ModeTheme";
import {useThemeState} from "../../theme";

function Sidebar() {
    const {mode, setMode} = useThemeState();
    const [state, setState] = React.useState({left: false,});

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox/> : <Mail/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox/> : <Mail/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem key='theme_mode' disablePadding>
                            <ListItemButton>
                                <ModeTheme componentType={'listItemIcon'}/>
                                <Switch onChange={() => setMode(!mode)} checked={mode}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Drawer>
        </div>
    );
}

export default Sidebar;