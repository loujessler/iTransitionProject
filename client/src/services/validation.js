import approve from "approvejs";
import validationService from "../api/services/validationService";


export async function validateUsername(username, initUsername = '') {
    try {
        const response = await validationService.existUsername(username);
        const errExistUsername = (username !== initUsername && response.existUsername) ? ['Username already exist'] : [];

        const result = approve.value(username, {
            title: 'Username',
            required: true,
            alphaNumeric: {
                alphaNumeric: true,
                message: 'The Username must be in Latin characters'
            },
            min: {
                min: 3,
                message: 'The Username must be at least 3 characters'
            },
            max: {
                max: 63,
                message: 'The Username must be no more than 63 characters'
            },
        });

        return result.errors.concat(errExistUsername);
    } catch (error) {
        console.error('Error checking username: ', error);
        return ['An error occurred while validating the username.'];
    }
}

export function validateEmail(email) {
    const result = approve.value(email, {
        title: 'Email',
        required: true,
        email: true
    });

    return result.errors;
}

export function validatePassword(password) {
    const result = approve.value(password, {
        title: 'Password',
        required: true,
        min: {
            min: 7,
            message: 'The {title} must be at least {min} characters'
        },
        max: {
            max: 63,
            message: 'The {title} must be no more than {max} characters'
        },
        strength: {
            min: 7,
            bonus: 10,
            uppercase: 1,
            lowercase: 1,
            numbers: 1
        }
    });

    return result.errors;
}

export function validateConfirmPass(password, confirmPass) {
    const result = approve.value(confirmPass, {
        title: 'Password',
        required: true,
        equal: {
            value: password,
            field: 'Confirm Password'
        }
    });

    return result.errors;
}