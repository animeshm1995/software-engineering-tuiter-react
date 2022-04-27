import axios from "axios";

// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const updateUser = (uid, user) =>
    api.put(`${USERS_API}/${uid}`, user)
        .then(response => response.data);

export const findUserById = (uid) =>
    api.get(`${USERS_API}/${uid}`)
        .then(response => response.data);