import { TodoDTO } from "../dtos/todo.dto";
import todoService from "../services/todos.service";

const todoController = {};

todoController.getTodos =async (req, res) => {
    try {
        let todos = await todoService.fetchTodos();
        todos = todos.map(todo => new TodoDTO(todo));
        res.status(200).json({todos});
    } catch(error) {
        res.status(500).json({error});
    }
}

todoController.getTodo = async (req, res) => {
    try {
        const todo = await todoService.fetchTodo(req.params.todoId);
        res.status(200).json({todo});
    } catch(err) {console.log(err)
        res.status(err.status || 500).json({error: err.message});
    }
}

todoController.addTodo = async(req, res) => {
    try {
        res.status(200).json({todo: await todoService.addTodo(req.body)});
    } catch(error) {
        res.status(500).json({error});
    }
    
}

todoController.changeStatus = async(req, res) => {
    try {
        const todo = await todoService.changeStatus(req.params.todoId);
        res.status(200).json('this is patch todo');
    } catch(error) {
        res.status(error.status || 500).json({message: error.message});
    }
    
}

todoController.deleteTodo = async(req, res) => {
    try {
        const todo = await todoService.deleteTodo(req.params.todoId);
        res.status(200).json(todo);
    } catch(err) {
        res.status(err.status || 500).json({message: err.message});
    }
}

export default todoController;