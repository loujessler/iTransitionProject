import React, {useState} from 'react';
import {ErrorProvider} from "../../../shared/providers/ErrorProvider";
import {
    Card, CardActions, CardContent, CardMedia, Stack, Box,
    IconButton, Alert, OutlinedInput, InputLabel, FormControl, CardHeader
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UserEditProfileBtn from "./UserEditProfileBtn";
import useForm from "../../../hooks/useForm";
import {useEditUserProfile} from "../hooks/useEditUserProfile";
import ErrorMessage from "../../../components/AuthDialog/elements/ErrorMessage";
import {QuestionMark} from "@mui/icons-material";

export function UserProfileEditCard(props) {
    const {userProfile, setEdit} = props;
    const [hover, setHover] = useState(false);
    const initialState = {
        username: userProfile.username,
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
    };
    const formNames = ['Username', 'First name', 'Last name', 'Email']

    const [userData, setUserData] = useForm(initialState);

    // Функция для загрузки нового изображения
    const handleAvatarChange = (event) => {
        // Здесь будет логика загрузки нового изображения
        console.log(event.target.files);
    };

    const {handleSubmit, errors, showAlert} = useEditUserProfile();

    return (
        <ErrorProvider>
            {userProfile && (
                <>
                    <CardHeader title='Edit Profile'/>
                    <form onSubmit={(e) => handleSubmit(e, userData, setEdit)}>
                        <Card>
                            <Box sx={{position: 'relative'}}>
                                {userProfile.profile.avatar ? <CardMedia
                                    component="img"
                                    alt={userProfile.username}
                                    height="120"
                                    image={userProfile.profile.avatar}
                                    sx={{
                                        transition: 'filter 0.3s',
                                        filter: hover ? 'brightness(0.2)' : 'brightness(0.4)',
                                    }}
                                /> : <QuestionMark
                                    sx={{
                                        transition: 'filter 0.3s',
                                        filter: hover ? 'brightness(0.2)' : 'brightness(0.4)',
                                        fontSize: 113,
                                    }}
                                />}
                                <IconButton
                                    color="primary"
                                    component="label"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%', // Center vertically
                                        left: '50%', // Center horizontally
                                        transform: 'translate(-50%, -50%)', // Adjust the positioning
                                        '&:hover': {
                                            color: 'info.main',
                                        },
                                    }}
                                >
                                    <PhotoCamera sx={{fontSize: '2.5rem'}}/>
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleAvatarChange}
                                    />
                                </IconButton>


                            </Box>
                            <CardContent sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'stretch'
                            }}>
                                <Stack spacing={2} alignItems="stretch">
                                    {Object.entries(userData).map(([key, value], index) => (
                                        <FormControl key={key} variant="outlined">
                                            <InputLabel htmlFor={`input-${key}`}>{formNames[index]}</InputLabel>
                                            <OutlinedInput
                                                id={`input-${key}`}
                                                label={formNames[index]}
                                                type="text"
                                                fullWidth
                                                name={key.toLowerCase()}
                                                value={value}
                                                onChange={(e) => setUserData(key, e.target.value)}
                                                error={!!errors[key]}
                                            />
                                            <ErrorMessage errorMessage={errors[key]}/>
                                        </FormControl>
                                    ))}
                                    {showAlert &&
                                        <Alert severity="error">{errors[0] || 'An error occurred.'}</Alert>}
                                </Stack>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'flex-end'}}>
                                <UserEditProfileBtn setEdit={setEdit}/>
                            </CardActions>
                        </Card>
                    </form>
                </>)}
        </ErrorProvider>
    );
}
