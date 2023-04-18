import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uaaDAO from "../daos/uaa.dao";
import { LoginDTO } from '../dtos/user.dto';

const uaaService = {};

const _generateToken = function(user) {
    const token = jwt.sign({username: user.username}, 'secret-password', {expiresIn: 3600});
    return token;
}

const _confirmPassword = (user, loginPassword) => {
    return new Promise(async (resolve, reject) => {
        bcrypt.compare(loginPassword, user.password).then(res => {
            if(!res) {
                reject({status: 401, message: 'Invalid login credentials!'});
            } else {
                resolve(user);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

uaaService.findUserWithUsername = (username) => {
    const query = {username};
    return uaaDAO.findOne(query);
}

uaaService.login = (userBody) => {
    return new Promise((resolve, reject) => {
        uaaService.findUserWithUsername(userBody.username)        
        .then(user => {
            if(!user) {
                throw({status: 401, message: 'Invalid login credentials!'});
            } else {
                return _confirmPassword(user, userBody.password);
            }
        })
        .then(user => {
            const result = new LoginDTO(user['_doc'], _generateToken(user));
            resolve(result)
        })
        .catch(err => reject(err));
    })
}

const _checkUserIsValid = (user) => {
    const keys = Object.keys(user);
    const required = ['username', 'firstName', 'lastName', 'password'];
    for(let i = 0; i < required.length; i++) {
        if(keys.indexOf(required[i]) === -1) return false;
    }
    return true;
}

const _encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => resolve(hash))
            .catch(err => reject(err));
    });
}

uaaService.register = (user) => {
    return new Promise((resolve, reject) => {
        try {
            if(!_checkUserIsValid(user)) {
                reject({status: 400, message: 'The user data provided is not valid!'});
            }
            uaaService.findUserWithUsername(user.username)
                .then(res => {
                    if(res) {
                        throw({status: 403, message: 'User with given username already exists!'});
                    }
                    return _encryptPassword(user.password);
                }).then(hash => {
                    user.password = hash;
                    return uaaDAO.insertOne(user);
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log('The error is: ', err);
                    reject(err);
                });
        } catch(err) {
            reject(err);
        }
    });
}

export default uaaService;