import axios from "axios";
import { getToken } from "../services/auth.service";

axios.defaults.baseURL = 'http://localhost:4000/api';
axios.interceptors.request.use(
    (req) => {
        if(!req.url?.includes('uaa')) {
            const token = getToken();
            if (token) {
                req.headers['Authorization'] = 'Bearer ' + token;
            }
        }
        return req;
    },
    error => {
        return Promise.reject(error);
    }
);