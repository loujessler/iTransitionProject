import React from 'react';
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import ErrorMessage from "./ErrorMessage";


function UsernameForm(props) {
    const {authData, setAuthData, errorMessage = ''} = props;

    return (
        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
            <InputLabel htmlFor="auth-username">Username</InputLabel>
            <OutlinedInput
                id="auth-username"
                type='text'
                required
                autoFocus
                margin="dense"
                label="Username"
                fullWidth
                variant="standard"
                value={authData}
                onChange={(e) => setAuthData('username', e.target.value)}
                error={!!errorMessage.username}
            />
            <ErrorMessage errorMessage={errorMessage.username}/>
        </FormControl>
    );
}

export default UsernameForm;
