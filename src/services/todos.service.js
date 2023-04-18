import mongoose from "mongoose";
import todoDAO from "../daos/todoDAO";
import { TodoDTO } from "../dtos/todo.dto";

const todoService = {};

todoService.fetchTodos = () => {
    return todoDAO.find();
}

const _findTodo = (todoId) => {
    return todoDAO.findOne({'_id': todoId});
    // return todoDAO.findById(todoId);
}

todoService.fetchTodo = (todoId) => {
    return new Promise((resolve, reject) => {
        try {
            if(!mongoose.isValidObjectId(todoId)) {
                throw {status: 400, message: "Invalid todo ID!"};
            }
            _findTodo(todoId)
                .then(todo => {
                    if(!todo) {
                        throw {status: 404, message: `Todo with id "${todoId}" not found`};
                    }
                    resolve(new TodoDTO(todo));
                }).catch(err => {
                    reject(err);
                });
        } catch(err) {
            reject(err);
        }
    });
}

todoService.addTodo = (todo) => {
    todo.done = false;
    console.log('add this todo: ', todo);
    return todoDAO.create(todo);
}

todoService.changeStatus = (todoId) => {
    return new Promise((resolve, reject) => {
        try {
            _findTodo(todoId)
                .then(todo => {
                    const query = {done: !todo.done};
                    console.log(todo);
                    // return todoDAO.findByIdAndDelete(todoId, query);
                    return todoDAO.findOneAndUpdate({'_id': todoId}, query);
                    // todo.set({done: !todo.done});
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log('Error while patching todo!', err);
                    reject(err);
                });
        } catch(err) {
            reject(err);
        }
    });
}

todoService.deleteTodo = (todoId) => {
    return new Promise((resolve, reject) => {
        try {
            todoDAO.findByIdAndDelete(todoId)
                .then(res => {
                    if(!res) {
                        reject({status: 404, message: `Todo with given id "${todoId}" not found!`});
                    }
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
        } catch(err) {
            console.error('Error while deleting todo: ', err);
            reject(err);
        }
    });
}

export default todoService;