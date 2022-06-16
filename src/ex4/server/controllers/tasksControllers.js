const ItemManager = require('../services/item_manager.js');
const itemManager = new ItemManager();

const getTodos = (req, res) => {
    let tasks = itemManager.getTodos();
    if (!tasks) tasks = [];
    res.status(200).json({tasks});
}

const deleteAll = (req, res) => {
    itemManager.deleteAll();
       res.status(200).json({});
   }

const addTodo = (req, res) => {
    console.log("Enters taskControllers addTodo"); // test
    const todoText = req;
    console.log({todoText}); // test
    const addedTask = itemManager.addTodo(todoText);
    res.status(200).json({addedTask});
}

const deleteTodo = (req, res) => {
    let taskId = Number.parseInt(req.params.id);
    if (isNaN(taskId)) return res.status(400).json({
        status: 400,
        error: "wrong parameters"
    });
    const taskDeleted = itemManager.deleteTodo(taskId);
    res.status(200).json({ taskDeleted });
}

module.exports = { getTodos, addTodo, deleteTodo, deleteAll };