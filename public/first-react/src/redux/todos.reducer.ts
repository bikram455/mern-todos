import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import TodoService, { TodoModel } from '../services/todos.service';

interface TodosState {
    todos?: TodoModel[];
}

const initialState: TodosState = {
    todos: []
};

const todoService = new TodoService();
export const fetchAllTodos = createAsyncThunk('/todos/getTodos', async() => {
    try {
        const response = todoService.fetchTodos();
        return response;
    }catch(err) {
        console.error(err);
    }
    
});

const todoReducer = createSlice({
    name: 'Todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<TodoModel[]>) => {
            state.todos = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
        });
        builder.addCase(fetchAllTodos.rejected, (state, action) => {
            state.todos = [];
        });
    }
});

export default todoReducer.reducer;