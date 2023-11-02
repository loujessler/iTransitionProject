import {Routes, Route} from "react-router-dom";

import './App.css';

import {ThemeProvider} from "./theme";

import MainPage from "./components/main_page/MainPage";
import Collection from "./components/collection/Collection";
import Header from "./components/header/Header";


function App() {

    return (
        <div className="App">
            <ThemeProvider>
                <Header/>
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
