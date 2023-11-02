import React, {useState, useEffect} from 'react';

import {Container, Box} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import http from '../../http-common'

import Loader from "../utils/Loader";
import {LastItems} from "./LastItems";
import {TopCollections} from "./TopCollections";
import {Tags} from "./Tags";
import MainPageStyles from '../../styles/MainPageStyles';


function MainPage() {

    const [loading, setLoading] = useState(true);
    const [latestItems, setLatestItems] = useState([]);
    const [topCollections, setTopCollections] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        // Загрузка последних добавленных айтемов
        http.get('/main-page/')
            .then(response => {
                setLatestItems(response.data['latest_items']);
                setTopCollections(response.data['top_collections']);
                setTags(response.data['tags']);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching latest items:", error);
            });

    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <Container sx={MainPageStyles.container}>
            <Box>
                <Grid container spacing={6}>
                    <TopCollections top_collections={topCollections}/>
                    <LastItems items={latestItems}/>
                    <Tags tags={tags}/>
                </Grid>
            </Box>
        </Container>
    );
}

export default MainPage;
