import { useCallback, useEffect, useState } from "react";
import TodoService, { TodoModel } from "../services/todos.service";
import { Todo } from "./Todo";

import { fetchAllTodos } from '../redux/todos.reducer';
import { useAppDispatch, useAppSelector } from "../redux/hook";


const Todos: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    let todoService = new TodoService();
    const [newTask, setTask] = useState('');
    const todos = useAppSelector(state => state.todosReducer.todos);
    
    const _fetchTodos = async () => {
        try {
            dispatch(fetchAllTodos());
        } catch(err) {
            console.error('Error while fetching todos: ', err);
        }
    }

    const changeStatus = useCallback(async(todoId: String, done: Boolean) => {
        console.log('change status for todo: ', todoId, done)
        try {
            await todoService.changeTodoStatus(todoId);
            _fetchTodos();
        } catch(err) {
            console.error(err);
        }
    }, []);

    const addNewTodo = async() => {
        try {
            await todoService.addNewTodo(newTask);
            _fetchTodos();
            setTask('');
        } catch(err) {
            console.error(err);
        }    
    }

    const deleteTodo = async(todoId: String) => {
        try {
            console.log('delete todo with id: ', todoId);
            await todoService.deleteTodo(todoId);
            _fetchTodos();
        } catch (err) {
            console.error(err);
        }
    }

    const editTodo = async(todoId: String, task: String) => {
        try {
            console.log('edit todo with id: ', todoId, task);
            // await todoService.deleteTodo(todoId);
            // _fetchTodos();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        _fetchTodos();
    }, []);

    return(
        <div>
            <input type='text' onChange={e => setTask(e.target.value)} value={newTask}/>
            <button onClick={addNewTodo}>Add</button>
            {
                todos?.map(todo => <Todo key={todo.id}  task={todo.task} done={todo.done} id={todo.id} 
                    changeStatus={changeStatus} delete={deleteTodo}
                    editTodo={editTodo}
                    />)
            }
        </div>
    )
}

export default Todos;