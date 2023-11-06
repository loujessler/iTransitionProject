import React from 'react';
import '../../styles/utils/Loader.css';
import {CircularProgress} from "@mui/material";

function Loader() {
    return (
        <div style={{position: 'absolute', top: 'calc(50% - 20px)', left: 'calc(50% - 20px)'}}>
            <CircularProgress color="secondary"/>
        </div>
    );
}

export default Loader;
