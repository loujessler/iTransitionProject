import { ListItem, ListItemButton, Switch } from "@mui/material";
import ModeThemeBtn from "../../../components/ModeThemeBtn";
import { useThemeState } from "../../../shared/providers/ThemeProvider";

const ThemeToggle = () => {
    const { mode, setMode } = useThemeState();

    const handleThemeChange = () => {
        setMode(!mode);
    };

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={handleThemeChange}>
                <ModeThemeBtn componentType={'listItemIcon'}/>
                <Switch onChange={handleThemeChange} checked={mode}/>
            </ListItemButton>
        </ListItem>
    );
};

export default ThemeToggle;
