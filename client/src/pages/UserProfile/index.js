import React, {useState} from 'react';

import {Container, Typography, Card, CardContent, CardMedia, CardActions, Button} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import MainPageStyles from '../../styles/MainPageStyles';
import {ErrorProvider} from "../../shared/providers/ErrorProvider";

import {useFetchUserProfile} from "./hooks/useFetchUserProfile";
import {UserCollections} from "./elements/UserCollections";
import {Edit} from "@mui/icons-material";


export function UserProfile() {
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const {isLoading, data, fetchData} = useFetchUserProfile(page, pageSize);

    const {user, userCollections, totalPages} = data;

    return (
        !isLoading ? (
            <ErrorProvider>
                <Container sx={MainPageStyles.container}>
                    <Grid container spacing={2} justifyContent="flex-start">
                        {user && (
                            <Grid xs={12} sm={3} md={3}>
                                <Typography variant="h6" component="h1" gutterBottom>
                                    User profile
                                </Typography>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={user.username}
                                        height="120"
                                        image={user.profile.avatar}
                                    />
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Typography variant="body2" color="textSecondary">
                                            User name:
                                        </Typography>
                                        <Typography variant="h6">{user.username}</Typography>
                                    </CardContent>
                                    <CardActions sx={{
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<Edit/>}
                                        >
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )}
                        <Grid xs={12} sm={9} md={9}>
                            <UserCollections
                                key={page}
                                userCollections={userCollections}
                                totalPages={totalPages}
                                fetchData={fetchData}
                                page={page}
                                setPage={setPage}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </ErrorProvider>
        ) : null
    );
}

