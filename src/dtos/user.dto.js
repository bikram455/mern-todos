export const UserDTO = (user) => {
    return {
        id: user['_id'],
        username: todo['username'],
        firstname: todo['firstName'],
        lastname: todo['lastname']
    }
}

export const LoginDTO = (login, token) => {
    return {
        id: login['_id'],
        username: login['username'],
        firstName: login['firstName'],
        lastName: login['lastName'],
        token
    }
}
