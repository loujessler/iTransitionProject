import http from '../http-common';
import {USER_PROFILE_URL} from "../urls";


const profile = async (token) => {
    const response = await http.get(USER_PROFILE_URL, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return response.data;
};

export default {
    profile,
};