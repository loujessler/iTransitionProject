import React from 'react';
import {useNavigate} from "react-router-dom";

import {
    Container, Typography, Card, CardContent, Pagination, CardActions, CardMedia, Button
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {QuestionMark, Edit, Delete as DeleteIcon} from '@mui/icons-material';

import {BASE_URL} from "../../../api/urls";

import MainPageStyles from '../../../styles/MainPageStyles';
import {ErrorProvider} from "../../../shared/providers/ErrorProvider";


export function UserCollections({userCollections, totalPages, fetchData, page, setPage}) {
    const navigate = useNavigate();

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchData(value);
    };

    return (<ErrorProvider>
        {userCollections && (<>
            <Typography variant="h6" component="h1" gutterBottom>
                Your collection
            </Typography>
            <Grid container spacing={2}>
                {userCollections.map((collection) => (<Grid xs={6} sm={6} md={4} key={collection.id}>
                    <Card>
                            {collection.image ? <CardMedia
                                component="img"
                                alt={collection.title}
                                height="120"
                                image={BASE_URL + collection.image}
                            /> : <QuestionMark style={{fontSize: 120}}/>}
                        <CardContent sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-start'
                        }}>
                            <Typography variant="h6">{collection.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {collection.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => navigate(`/collection/${collection.id}`)}
                            >
                                View
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Edit/>}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>))}
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
