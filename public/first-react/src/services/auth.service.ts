import axios from "axios";

declare let token:any;

export interface User {
    username: String,
    password: String,
};

export const getToken = ():any => {
    // if(!token) {
    //     token = localStorage.getItem('token');
    // }
    // return token;
    return localStorage.getItem('token');
}

export const userLogin = (user: User):any => {
    return axios.post('uaa/login', user);
}

export const checkTokenExpiry = () => {

}