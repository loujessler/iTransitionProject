import React, {useState} from 'react';

import {Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import {ErrorProvider} from "../../shared/providers/ErrorProvider";

import {useFetchUserProfile} from "./hooks/useFetchUserProfile";
import {UserCollections} from "./elements/UserCollections";
import {UserProfileCard} from "./elements/UserProfileCard";
import {UserProfileEditCard} from "./elements/UserProfileEditCard";


export function UserProfile() {
    const [edit, setEdit] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const {isLoading, data, fetchData} = useFetchUserProfile(page, pageSize, edit);

    const {userProfile, userCollections, totalPages} = data;

    return (
        !isLoading ? (
                <ErrorProvider>
                    <Container>
                        <Grid container spacing={2} justifyContent="flex-start">
                            <Grid xs={12} sm={12} md={3.5}>
                                {!edit ? <UserProfileCard userProfile={userProfile} setEdit={setEdit}/>
                                    : <UserProfileEditCard userProfile={userProfile} setEdit={setEdit}/>
                                }
                            </Grid>
                            <Grid xs={12} sm={12} md={8.5}>
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
            ) :
            null
    )
        ;
}

