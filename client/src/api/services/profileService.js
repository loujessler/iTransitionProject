import http from '../http-common';
import {USER_EDIT_PROFILE_URL, USER_PROFILE_URL} from "../urls";


const profile = async (token) => {
    const response = await http.get(USER_PROFILE_URL, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return response.data;
};

const updateUserProfile = async (token, userData) => {
    return await http.patch(USER_EDIT_PROFILE_URL, userData, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
};

export default {
    profile,
    updateUserProfile,
};