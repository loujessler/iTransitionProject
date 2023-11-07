import { createTheme} from '@mui/material/styles';
import React, { useState, useContext, createContext } from 'react';
import {ThemeProvider as MuiThemeProvider, useMediaQuery} from "@mui/material";

function themeCreator(mode) {
    return createTheme({
        palette: {
            mode: mode ? 'light' : 'dark'
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        }
    });
}

const ThemeMode = createContext();

export const useThemeState = () => {
    const context = useContext(ThemeMode);
    if (!context) {
        throw new Error('useThemeState must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const initialMode = localStorage.getItem('themeMode') !== 'dark';
    const [mode, setMode] = useState(initialMode);
    const theme = themeCreator(mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        localStorage.setItem('themeMode', mode ? 'light' : 'dark');
    }, [mode]);

    return (
        <ThemeMode.Provider value={{ mode, setMode, isMobile }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeMode.Provider>
    );
};

