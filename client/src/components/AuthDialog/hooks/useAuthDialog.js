import { useState, useEffect } from 'react';
import http from '../../../http-common';
import cookies from '../../utils/cookies';
import { useAuth } from '../../../shared/providers/AuthProvider';
import useValidation from "./useValidation";
import {
    validateConfirmPass,
    validateEmail,
    validatePassword,
    validateUsername
} from "../validation";

function useAuthDialog(mode) {
    const [showAlert, setShowAlert] = useState(false);
    const { logIn } = useAuth();
    const [errors, setErrors, validate] = useValidation();

    async function handleSubmit(event, formData, onClose) {
        event.stopPropagation();
        event.preventDefault();
        const validators = {
            username: validateUsername,
            password: validatePassword,
        };

        if (mode === 'register') {
            validators.email = validateEmail;
            validators.confirmPassword = (value) => validateConfirmPass(formData.password, value);

            const isValid = await validate(formData, validators);

            if (!isValid) {
                setShowAlert(true);
                return;
            }
        }

        try {
            const response = await http.post(`/${mode}/`, formData);
            cookies.set('authToken', response.data.token, { expires: 1 });
            onClose();
            logIn();
        } catch (error) {
            let errorMsg = 'An unexpected error occurred.';
            if (error.response) {
                if (error.response.data) {
                    errorMsg = error.response.data.error || 'Invalid username or password.';
                }
            } else if (error.request) {
                errorMsg = 'No response received from server.';
            } else {
                errorMsg = error.message;
            }

            setErrors(errors => ({
                ...errors,
                ['form']: errorMsg,
            }));
            setShowAlert(true);
        }
    }

    useEffect(() => {
        let timer;
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 6000);
        }
        return () => clearTimeout(timer);
    }, [showAlert]);

    return { handleSubmit, errors, showAlert };
}

export default useAuthDialog;
