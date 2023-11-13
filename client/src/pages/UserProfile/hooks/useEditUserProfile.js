import {useState, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import profileService from "../../../api/services/profileService";
import cookies from "../../../services/cookies";
import {validateEmail, validateUsername} from "../../../services/validation";

import {ErrorContext} from '../../../shared/contexts/ErrorContext';
import useValidation from "../../../hooks/useValidation";


export function useEditUserProfile() {
    const [showAlert, setShowAlert] = useState(false);
    const {showError, resetError} = useContext(ErrorContext);
    const [errors, setErrors, validate] = useValidation();
    const navigate = useNavigate();

    async function handleSubmit(event, formData, setEdit) {

        const token = cookies.get('authToken');
        if (!token) {
            navigate('/', {state: {openAuthDialog: true}});
            return;
        }

        event.preventDefault();
        resetError();

        const initProfile = await profileService.profile(token)

        const validators = {
            username: () => validateUsername(formData.username, initProfile.username),
            email: validateEmail,
        };

        const isValid = await validate(formData, validators);
        if (!isValid) {
            setShowAlert(true);
            return;
        }

        profileService.updateUserProfile(token, formData)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setEdit(false);
                }
            })
            .catch(error => {
                showError(error.response?.data?.detail || 'An error occurred while updating profile data.');
                setShowAlert(true);
            });
    }

    useEffect(() => {
        let timer;
        if (showAlert) {
            timer = setTimeout(() => setShowAlert(false), 6000);
        }
        return () => clearTimeout(timer);
    }, [showAlert]);

    return {handleSubmit, errors, showAlert};
}
