// Define your endpoints here (this is your "controller file")
const express = require("express");

const {
  getTodos,
  getDone,
  addTodo,
  deleteTodo,
  deleteAll,
  checkTodo,
} = require("../controllers/tasksControllers.js");

const tasksRouter = express.Router();

tasksRouter.get("/", getTodos);
tasksRouter.get("/", getDone);
tasksRouter.post("/", addTodo);
tasksRouter.delete("/", deleteTodo);
tasksRouter.delete("/all", deleteAll);
//tasksRouter.put("/", checkTodo);

module.exports = tasksRouter;
