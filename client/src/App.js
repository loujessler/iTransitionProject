import {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";

import './App.css';
import {Box, Card} from '@mui/material';

import {Header} from "./sections/Header";

import {MainPage} from "./pages/MainPage";
import {CollectionPage} from "./pages/CollectionPage";
import {UserProfile} from "./pages/UserProfile";


function App() {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('.MuiAppBar-root');
        if (header) {
            setHeaderHeight(header.clientHeight + 1);
        }
    }, []);

    return (
        <div className="App">
            <Header/>
            <Box sx={{pt: `${headerHeight}px`, mt: 1.6}}>
                <Card sx={{
                    mx: '1%',
                    p: '1%',
                    maxWidth: '98%',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(179,228,255,0.1)',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 2,
                }}
                >
                    <Routes>
                        <Route path="/" element={<MainPage/>} index/>
                        <Route path="/profile" element={<UserProfile/>}/>
                        <Route path="/collection/:id" element={<CollectionPage/>}/>

                        {/*<Route index element={<UserProfile />} />*/}
                        {/*<Route path="about" element={<About />} />*/}
                        {/*<Route path="dashboard" element={<Dashboard />} />*/}

                        {/*<Route path="*" element={<NoMatch />} />*/}
                    </Routes>
                </Card>
            </Box>
        </div>
    );
}

export default App;
