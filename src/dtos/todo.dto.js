export const TodoDTO = (todo) => {
    return {
        id: todo['_id'],
        task: todo['task'],
        done: todo['done']
    }
}
