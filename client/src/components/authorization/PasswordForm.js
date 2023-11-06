import React, {useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import ErrorMessage from "./ErrorMessage";

function PasswordForm(props) {
    const {authData, setAuthData, errorMessage= '', useConfirm } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="auth-password">Password</InputLabel>
                <OutlinedInput
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    margin="dense"
                    label="Password"
                    fullWidth
                    variant="standard"
                    value={authData}
                    onChange={(e) => setAuthData('password', e.target.value)}
                    error={!!errorMessage.password}
                    helperText={errorMessage.password}
                />
                <ErrorMessage errorMessage={errorMessage.password}/>
            </FormControl>
            {useConfirm && (
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="auth-confirm-password">Confirm password</InputLabel>
                    <OutlinedInput
                        id="auth-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        margin="dense"
                        label="Confirm password"
                        fullWidth
                        variant="standard"
                        value={authData.confirmPassword}
                        onChange={(e) => setAuthData('confirmPassword', e.target.value)}
                        error={!!errorMessage.confirmPassword}
                        helperText={errorMessage.confirmPassword}
                    />
                    <ErrorMessage errorMessage={errorMessage.confirmPassword}/>
                </FormControl>
            )}
        </>
    );
}

export default PasswordForm;
