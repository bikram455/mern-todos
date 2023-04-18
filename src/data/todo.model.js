import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: String,
    done: Boolean
})

mongoose.model('Todo', todoSchema, 'Todos');