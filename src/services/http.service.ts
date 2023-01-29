import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL

export const http = axios.create({
    baseURL: BASE_URL, // host name 
    headers: {
        'x-auth-token': `${window.sessionStorage.getItem('KEY')}`
    }
});
