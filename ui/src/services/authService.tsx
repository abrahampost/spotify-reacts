import axios from "axios";

const AUTH_PREFIX = '/api/auth'

export const login = (username: string, password: string) => {
    return axios.post(`${AUTH_PREFIX}/login`, { username, password });
}

export const registerUser = (username: string, password: string) => {
    return axios.post(`${AUTH_PREFIX}/register`, { username, password });
}

export const logout = () => {
    return axios.post(`${AUTH_PREFIX}/logout`);
}