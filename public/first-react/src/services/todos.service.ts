import axios from "axios";
import { getToken } from "./auth.service";
import { useNavigate } from "react-router-dom";

export class TodoService {

    public fetchTodos = () : Promise<TodoModel[]> => {
        const header = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        };
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get('/todos', {headers: {Authorization: `Bearer ${getToken()}`}});
                resolve(res['data']['todos']);
            } catch(err: any) {
                if(err['response']['status'] === 401) {
                    console.log('Delete user token!!');
                    localStorage.removeItem('token');
                }
                reject(err);
            }
        });
    }

    public changeTodoStatus = (todoId: String) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.patch(`/todos/${todoId}`, {}, {headers: {Authorization: `Bearer ${getToken()}`}});
                resolve(res);
            } catch(err) {
                reject(err);
            }
        });
    }

    public addNewTodo = (task: String) => {
        return axios.post('/todos', {task},  {headers: {Authorization: `Bearer ${getToken()}`}});
    }

    public deleteTodo = (todoId: String) => {
        return axios.delete(`/todos/${todoId}`, {headers: {Authorization: `Bearer ${getToken()}`}});
    }
}

export interface TodoModel {
    id: String,
    task: String,
    done: Boolean
}
export default TodoService;