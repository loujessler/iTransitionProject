import React, {createContext, useState, useContext} from 'react';


export const ErrorContext = createContext();

export const useErrorHandler = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useErrorHandler must be used within an ErrorProvider');
    }
    return context;
};

export const ErrorProvider = ({children}) => {
    const [error, setError] = useState(null);

    const showError = (error) => {
        console.error('ErrorHandler:', error);
        setError(error);
    };

    const resetError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{error, showError, resetError}}>
            {children}
        </ErrorContext.Provider>
    );
};
