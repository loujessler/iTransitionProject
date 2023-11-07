import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert } from '@mui/material';
import useForm from './hooks/useForm';
import useAuthDialog from './hooks/useAuthDialog';
import UsernameForm from './elements/UsernameForm';
import PasswordForm from "./elements/PasswordForm";
import EmailForm from './elements/EmailForm';

const AuthDialog = ({ open, onClose, mode }) => {
    const initialState = {
        username: '',
        password: '',
        confirmPassword: mode === 'register' ? '' : undefined,
        email: mode === 'register' ? '' : undefined,
    };

    const [authData, setAuthData] = useForm(initialState);

    const { handleSubmit, errors, showAlert } = useAuthDialog(mode);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{mode === 'login' ? 'Login' : 'Register'}</DialogTitle>
            <form onSubmit={(e) => handleSubmit(e, authData, onClose)}>
                <DialogContent>
                    <UsernameForm
                        authData={authData.username}
                        setAuthData={setAuthData}
                        errorMessage={errors}
                    />
                    <PasswordForm
                        authData={authData.password}
                        setAuthData={setAuthData}
                        errorMessage={errors}
                        useConfirm={mode === 'register'}
                    />
                    {mode === 'register' && (
                        <EmailForm
                            authData={authData.email}
                            setAuthData={setAuthData}
                            errorMessage={errors}
                        />
                    )}
                    {showAlert && <Alert severity="error">{errors.form || 'An error occurred.'}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">{mode === 'login' ? 'Log in' : 'Sign up'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AuthDialog;
