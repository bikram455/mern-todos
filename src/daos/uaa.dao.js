import mongoose from "mongoose";

const uaaDAO = {};
const User = mongoose.model('User');

uaaDAO.findOne = (query) => {
    return User.findOne(query).exec();
}

uaaDAO.insertOne = (user) => {
    return User.create(user);
}
export default uaaDAO;