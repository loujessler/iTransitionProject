import React from 'react';

import {Button, Card, CardActions, CardContent, CardMedia, Typography, Stack, CardHeader} from "@mui/material";
import {Edit, QuestionMark} from "@mui/icons-material";

import {ErrorProvider} from "../../../shared/providers/ErrorProvider";


export function UserProfileCard(props) {
    const {userProfile, setEdit} = props;
    const userData = {
        'Username': 'username',
        'First name': 'first_name',
        'Last name': 'last_name',
        'Email': 'email',
    }

    return (
        <ErrorProvider>
            {userProfile && (<>
                <CardHeader title='User profile'/>
                <Card elevation={0}>
                    {userProfile.profile.avatar ? <CardMedia
                        component="img"
                        alt={userProfile.username}
                        height="200"
                        image={userProfile.profile.avatar}
                    /> : <QuestionMark sx={{fontSize: 113}}/>}
                    <CardContent sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'stretch'
                    }}>
                        <Stack
                            spacing={1}
                            alignItems={{xs: 'start', sm: 'start', md: 'start'}}
                        >
                            {Object.entries(userData).map(([key, value]) => (
                                (userProfile[value] &&
                                    <Stack
                                        key={key}
                                        direction={{xs: 'column', sm: 'column', md: 'row'}}
                                        spacing={{xs: 0, sm: 0, md: 1}}
                                        alignItems={{xs: 'start', sm: 'start', md: 'center'}}
                                    >
                                        <Typography variant="caption" color="textSecondary" sx={{width: 'auto'}}>
                                            {key}:
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{flexGrow: 1}}>
                                            {userProfile[value]}
                                        </Typography>
                                    </Stack>
                                )
                            ))}
                        </Stack>
                    </CardContent>
                    <CardActions disableSpacing={true} sx={{
                        justifyContent: 'flex-end'
                    }}>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Edit/>}
                            onClick={() => setEdit(true)}
                        >
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </>)}
        </ErrorProvider>
    );
}

