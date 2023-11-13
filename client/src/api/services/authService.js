import http from '../http-common';
import cookies from '../../services/cookies';
import {LOGIN_URL, REGISTER_URL} from "../urls";

const login = async (formData) => {
    const response = await http.post(LOGIN_URL, formData);
    cookies.set('authToken', response.data.token, { expires: 1 });
    return response.data;
};

const register = async (formData) => {
    const response = await http.post(REGISTER_URL, formData);
    cookies.set('authToken', response.data.token, { expires: 1 });
    return response.data;
};

export default {
    login,
    register
};
