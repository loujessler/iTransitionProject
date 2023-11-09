import {Routes, Route} from "react-router-dom";

import './App.css';

import {Header} from "./sections/Header";

import {MainPage} from "./pages/MainPage";
import {CollectionPage} from "./pages/CollectionPage";
import {UserProfile} from "./pages/UserProfile";


function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>} index/>
                <Route path="/profile" element={<UserProfile/>}/>
                <Route path="/collection/:id" element={<CollectionPage/>}/>

                {/*<Route index element={<UserProfile />} />*/}
                {/*<Route path="about" element={<About />} />*/}
                {/*<Route path="dashboard" element={<Dashboard />} />*/}

                {/*<Route path="*" element={<NoMatch />} />*/}
            </Routes>
        </div>
    );
}

export default App;
