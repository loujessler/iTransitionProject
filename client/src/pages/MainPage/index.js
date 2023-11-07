import React from 'react';
import {Container, Box} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useFetchData} from './hooks/useFetchData';
import {LastItems} from "./elements/LastItems";
import {TopCollections} from "./elements/TopCollections";
import {Tags} from "./elements/Tags";
import MainPageStyles from '../../styles/MainPageStyles';
import {useLoading} from "../../shared/providers/LoadingProvider";
import {ErrorProvider} from "../../shared/providers/ErrorProvider";


export function MainPage() {
    const {data} = useFetchData();
    const {isLoading} = useLoading();

    const {latestItems, topCollections, tags} = data;

    return (!isLoading ? (
        <ErrorProvider>
            <Container sx={MainPageStyles.container}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={5}>
                            <TopCollections topCollections={topCollections}/>
                        </Grid>
                        <Grid xs={12} md={5}>
                            <LastItems latestItems={latestItems}/>
                        </Grid>
                        <Grid xs={12} md={2}>
                            <Tags tags={tags}/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ErrorProvider>
    ) : null);
}
