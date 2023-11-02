import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {IconButton} from "@mui/material";
import React from "react";

function ModeTheme({setMode, mode}) {
    return (
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMode(!mode)}>
            {mode ?
                <Brightness7Icon/> : <Brightness4Icon/>
            }
        </IconButton>
    )
}

export default ModeTheme