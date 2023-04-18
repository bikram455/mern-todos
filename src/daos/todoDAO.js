import mongoose from "mongoose";

const todoDAO = {};
const Todo = mongoose.model('Todo');

todoDAO.find = () => {
    return Todo.find();
}

todoDAO.findOne = async (query) => {
    return Todo.findOne(query);
}

todoDAO.create = (todo) => {
    return Todo.create(todo);
}

todoDAO.findByIdAndDelete = (todoId) => {
    return Todo.findByIdAndDelete(todoId);
}


todoDAO.findById = async (id) => {
    return Todo.findById(id);
}

todoDAO.findByIdAndDelete = (id, query) => {
    return Todo.findByIdAndDelete(id, query);
}

todoDAO.findOneAndUpdate = (findQuery, updateQuery) => {
    return Todo.findOneAndUpdate(findQuery, updateQuery);
}
export default todoDAO;