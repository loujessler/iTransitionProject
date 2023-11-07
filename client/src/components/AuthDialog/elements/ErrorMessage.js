import React from 'react';
import {Typography} from "@mui/material";

function ErrorMessage(props) {

    return (
        <>
            {props.errorMessage && (
                <Typography variant="body2" color="error" style={{whiteSpace: 'pre-line'}}>
                    {props.errorMessage}
                </Typography>
            )}
        </>
    );
}

export default ErrorMessage;
