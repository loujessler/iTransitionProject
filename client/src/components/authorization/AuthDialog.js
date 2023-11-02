import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import http from '../../http-common';

const AuthDialog = ({ open, onClose, mode }) => {
    const [authData, setAuthData] = useState({
        username: '',
        password: '',
        email: mode === 'register' ? '' : undefined,
    });

    const handleSubmit = async () => {
        try {
            const response = await http.post(mode, authData);
            console.log(response)
            onClose();
        } catch (error) {

        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{mode === 'login' ? 'Login' : 'Register'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={authData.username}
                    onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={authData.password}
                    onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                />
                {mode === 'register' && (
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={authData.email}
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button size="small" color="error" onClick={onClose}>Cancel</Button>
                <Button variant="outlined" onClick={handleSubmit}>{mode === 'login' ? 'Login' : 'Register'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthDialog;
