import jwt from 'jsonwebtoken';
import uaaService from '../services/uaa.service';

const _getTokenFromBearer = (token) => {
    return token.split(' ')[1];
}

const _getUsernameFromToken = (token) => {
    try {
        const info = jwt.verify(token, 'secret-password');
        return info;
    } catch(err) {
        console.log('error is:', Object.keys(err), err['message']);
        throw ('Token expired, please login again!')
    }
}


export const verifyToken = async (req, res, next) => {
    try {
        // console.log(req['headers']);
        const bearer = req['headers']['authorization'];
        if(!bearer) {
            throw ('No authorization token found!');
        }
        const token = _getTokenFromBearer(bearer);
        if(!token) {
            throw ('Invalid token!');
        }
        const username = _getUsernameFromToken(token)['username'];
        const user = await uaaService.findUserWithUsername(username);
        if(!user) {
            throw ('Invalid token!');
        }
        next();
    } catch(err) {
        res.status(401).json({message: err});
    }
}
