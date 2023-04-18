import { Router } from "express";
import mongoose from "mongoose";
import todoController from "../controllers/todos.controller";

const todoRouter = Router();
const Todo = mongoose.model('Todo');

todoRouter.route('/:todoId')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo)
    .patch(todoController.changeStatus);
    
todoRouter.route('/')
    .get(todoController.getTodos)
    .post(todoController.addTodo);

export default todoRouter;
