import React, { createContext, useState, useContext } from 'react';
import {CircularProgress} from "@mui/material";

const LoadingContext = createContext({
    isLoading: false,
    setLoading: () => {}
});

export const LoadingProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);

    const loadingValue = {
        isLoading,
        setLoading
    };

    return (
        <LoadingContext.Provider value={loadingValue}>
            {children}
            {isLoading && (
                <div style={{position: 'absolute', top: 'calc(50% - 20px)', left: 'calc(50% - 20px)'}}>
                    <CircularProgress color="secondary"/>
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
