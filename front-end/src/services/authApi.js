import axios from "axios";

import { BASE_API } from "../helpers/helpers";

const AUTH_ENDPOINT = `${BASE_API}/auth`;


export async function register(body) {
    try {
        const response = await axios.post(`${AUTH_ENDPOINT}/register`, body);
        return {notification: true, message: response.data.message, status: "success"};
    } catch(e) {
        if(e.code === 'ERR_BAD_REQUEST') {
            const {errors, message} = e.response.data;
            return {invalidInput: true, ...errors};
        }
        return {notification: true, message: "Service is currently unavailable", status: "error"};
    }
}

export async function login(body) {
    try {
        const response = await axios.post(`${AUTH_ENDPOINT}/login`, body);
        const jwt = response.data.jwt;
        localStorage.setItem("jwt", jwt);
        return {notification: true, message: "Credentials accepted..", status: "success"};
    } catch(e) {
        if(e.code === 'ERR_BAD_REQUEST') {
            const {errors, message} = e.response.data;
            return {invalidInput: true, ...errors};
        }
        return {notification: true, message: "Service is currently unavailable", status: "error"};
    }
}

export async function authenticate(jwt) {
    const response = await axios.get(`${AUTH_ENDPOINT}/authenticate`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
    });
    return response.data;

}

export async function getActiveUsers() {
    const response = await axios.get(`${AUTH_ENDPOINT}/active-users`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        }
    });
    return response.data.activeUsers;
}