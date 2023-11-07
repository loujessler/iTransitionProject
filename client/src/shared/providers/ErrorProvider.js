import React from 'react';
import { useErrorHandler } from '../contexts/ErrorContext';
import { Container } from "@mui/material";
import Alert from '@mui/material/Alert';
import MainPageStyles from '../../styles/MainPageStyles';

export const ErrorProvider = ({ children }) => {
    const { error } = useErrorHandler();

    if (error) {
        return (
            <Container sx={MainPageStyles.container}>
                <Alert severity="error">{error.message}</Alert>
            </Container>
        );
    }

    return children;
};
