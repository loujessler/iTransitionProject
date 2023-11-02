import React from "react";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ListItemIcon, IconButton} from "@mui/material";

import {useThemeState} from "../../theme";

const COMPONENT_TYPE = {
    iconButton: IconButton,
    listItemIcon: ListItemIcon,
}

function ModeTheme({componentType}) {
    const {mode, setMode} = useThemeState();

    const ComponentType = COMPONENT_TYPE[componentType]

    return (<div>
        <ComponentType color="inherit" aria-label="theme" onClick={() => setMode(!mode)}>
            {mode ? <Brightness7Icon/> : <Brightness4Icon/>}
        </ComponentType>
    </div>)
}

export default ModeTheme
