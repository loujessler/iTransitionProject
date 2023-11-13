import React from 'react';

import {
    Container, Typography, Card, CardContent, Pagination, CardActions, CardMedia, CardHeader
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {QuestionMark} from '@mui/icons-material';

import {BASE_URL} from "../../../api/urls";

import MainPageStyles from '../../../styles/MainPageStyles';
import {ErrorProvider} from "../../../shared/providers/ErrorProvider";
import UserCollectionBtn from "./UserCollectionBtn";


export function UserCollections({userCollections, totalPages, fetchData, page, setPage}) {

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchData(value);
    };

    return (<ErrorProvider>
        {userCollections && (<>
            <CardHeader title='Your collection'/>
            <Grid container spacing={2} justifyContent="space-evenly">
                {userCollections.map((collection) => (
                    <Grid xs={6} md={6} lg={4} key={collection.id}>
                        <Card elevation={1}>
                            {collection.image ? <CardMedia
                                component="img"
                                alt={collection.title}
                                height="120"
                                image={BASE_URL + collection.image}
                            /> : <QuestionMark sx={{fontSize: 113}}/>}
                            <CardContent sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start'
                            }}>
                                <Typography variant="h6">{collection.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {collection.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing={true} sx={{
                                justifyContent: 'flex-end'
                            }}>
                                <UserCollectionBtn collection={collection}/>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>)}
        {totalPages > 1 && <Container sx={MainPageStyles.container}>
            <Grid container justifyContent="center">
                <Pagination
                    count={Number(totalPages) || 1}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Container>}
    </ErrorProvider>);
}
