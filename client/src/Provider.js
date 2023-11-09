import {ThemeProvider} from "./shared/providers/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import {AuthProvider} from "./shared/providers/AuthProvider";
import {LoadingProvider} from "./shared/providers/LoadingProvider"
import {ErrorContextProvider} from './shared/contexts/ErrorContext'
import App from "./App";

function Provider() {
    return (
            <LoadingProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <CssBaseline />
                        <ErrorContextProvider>
                            <App/>
                        </ErrorContextProvider>
                    </ThemeProvider>
                </AuthProvider>
            </LoadingProvider>
    );
}

export default Provider;
