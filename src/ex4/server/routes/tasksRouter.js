// Define your endpoints here (this is your "controller file")
const express = require('express');

const { getTodos, addTodo, deleteTodo, deleteAll } = require("../controllers/tasksControllers.js");

const tasksRouter = express.Router();

tasksRouter.get('/', getTodos);
tasksRouter.post('/', addTodo);
tasksRouter.delete('/:id', deleteTodo);
tasksRouter.delete('/all', deleteAll);

module.exports =  tasksRouter;