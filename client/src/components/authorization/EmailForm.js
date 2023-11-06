import React from 'react';
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import ErrorMessage from "./ErrorMessage";

function EmailFrom(props) {
    const {authData, setAuthData, errorMessage = ''} = props;

    return (
        <FormControl sx={{m: 1, width: 'calc(51ch + 7px)'}} variant="outlined">
            <InputLabel htmlFor="auth-username">Email</InputLabel>
            <OutlinedInput
                margin="dense"
                label="Email"
                type="text"
                required
                fullWidth
                variant="standard"
                value={authData}
                onChange={(e) => setAuthData('email', e.target.value)}
                error={!!errorMessage.email}
                helperText={errorMessage.email}
            />
            <ErrorMessage errorMessage={errorMessage.email}/>
        </FormControl>
    );
}

export default EmailFrom;
