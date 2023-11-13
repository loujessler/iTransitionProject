import http from '../http-common';
import {EXIST_USERNAME_URL} from "../urls";

const existUsername = async (username) => {
    const response = await http.get(EXIST_USERNAME_URL, {
        params: { username }
    });
    return response.data;
};

export default {
    existUsername,
};