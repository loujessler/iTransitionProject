import {Routes, Route} from "react-router-dom";

import './App.css';

import {ThemeProvider} from "./shared/providers/ThemeProvider";
import {AuthProvider} from "./shared/providers/AuthProvider";
import {LoadingProvider} from "./shared/providers/LoadingProvider"
import {ErrorProvider} from './shared/contexts/ErrorContext'

import {MainPage} from "./pages/MainPage";
import {CollectionPage} from "./pages/CollectionPage";
import Header from "./sections/Header";


function App() {

    return (
        <div className="App">
            <LoadingProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <ErrorProvider>
                            <Header/>
                            <Routes>
                                <Route path="/" element={<MainPage/>} index/>
                                <Route path="/collection/:id" element={<CollectionPage/>}/>

                                {/*<Route index element={<MainPage />} />*/}
                                {/*<Route path="about" element={<About />} />*/}
                                {/*<Route path="dashboard" element={<Dashboard />} />*/}

                                {/*<Route path="*" element={<NoMatch />} />*/}
                            </Routes>
                        </ErrorProvider>
                    </ThemeProvider>
                </AuthProvider>
            </LoadingProvider>
        </div>
    );
}

export default App;
