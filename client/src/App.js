import {Routes, Route} from "react-router-dom";

import './App.css';

import {ThemeProvider} from "./components/utils/ThemeProvider";
import {AuthProvider} from "./components/utils/AuthProvider";

import {MainPage} from "./components/MainPage/MainPage";
import Collection from "./components/Collection/Collection";
import Header from "./components/Header/Header";


function App() {

    return (
        <div className="App">
            <AuthProvider>
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
            </AuthProvider>
        </div>
    );
}

export default App;
