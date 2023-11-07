import { useAuth } from "../../../shared/providers/AuthProvider";
import { Login, PersonAddAlt } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const AuthItemsList = ({ setAuthMode, userMenuItems }) => {
    const { isAuthenticated } = useAuth();

    const authItems = isAuthenticated ? userMenuItems : {
        "Login": { action: () => setAuthMode('login'), icon: Login },
        "Register": { action: () => setAuthMode('register'), icon: PersonAddAlt },
    };

    const handleItemClick = (actionFn) => {
        if (actionFn) {
            actionFn();
        }
    };

    return (
        <List>
            {Object.entries(authItems).map(([item, { action: action, icon: Icon }]) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton onClick={() => handleItemClick(action)}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    );
};
