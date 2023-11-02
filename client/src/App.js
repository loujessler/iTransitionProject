import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import {ThemeProvider} from "@mui/material";

import './App.css';

import themeCreator from "./theme";

import MainPage from "./components/main_page/MainPage";
import Collection from "./components/collection/Collection";
import Header from "./components/header/Header";


function App() {
    const [mode, setMode] = useState(true);

    return (
        <div className="App">
            {/*<ThemeProvider theme={(mode) ? themeLight : themeDark}>*/}
            <ThemeProvider theme={themeCreator(mode)}>
                <Header mode={mode} setMode={setMode}/>
                <Routes>
                    <Route path="/" element={<MainPage/>} index/>
                    <Route path="/collection/:id" element={<Collection/>}/>
                    {/*<Route index element={<MainPage />} />*/}
                    {/*<Route path="about" element={<About />} />*/}
                    {/*<Route path="dashboard" element={<Dashboard />} />*/}

                    {/*<Route path="*" element={<NoMatch />} />*/}
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
