import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: String,
    lastName: String,
});

mongoose.model('User', userSchema, 'users');