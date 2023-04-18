import { useState } from "react";

export const Todo = (todo: any) => {
    const [newTask, setNewTask] = useState(todo.task);
    const [showEdit, setShowEdit] =useState(false);

    const getClassName = (done: Boolean) => {
        if(done) return 'done';
        else return '';
    }

    const changeStatus = (todoId: String, done: Boolean) => {
        todo.changeStatus(todoId, done);
    }

    return(
        <div className={getClassName(todo.done)}>
            <input type='checkbox' onChange={e => changeStatus(todo.id, todo.done)} checked={todo.done}/>
            {!showEdit && (<label>{todo.task}</label>)}
            {showEdit && (<>
                <input type='text' onChange={e => setNewTask(e.target.value)} value={todo.task}/>
                <button onClick={e => todo.editTodo(todo.id, newTask)}>Done</button>
                <button onClick={e => setShowEdit(false)}>Cancel</button>
            </>)}
            {!showEdit && (<>
                <button onClick={e => setShowEdit(true)}>edit</button>
                <button onClick={e => todo.delete(todo.id)}>X</button>
            </>)}
        </div>
    );
}