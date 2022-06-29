const ItemManager = require("../services/item_manager.js");
const itemManager = new ItemManager();

const getTodos = async (req, res) => {
  try {
    res.send(itemManager.getTodos());
  } catch (err) {
    console.error("There's a problem with fetching the todos");
  }
};

const getDone = async (req, res) => {
  try {
    res.send(itemManager.getDone());
  } catch (err) {
    console.error("There's a problem with fetching the done tasks");
  }
};

const addTodo = async (req, res) => {
  try {
    const { value } = req.body;
    if (value) {
      const addedTask = await (await itemManager.addTodo(value)).todoText;
      res.end();
    }
  } catch (err) {
    console.error("There's a problem adding a todo");
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleted = await itemManager.deleteAll();
    res.end();
  } catch (err) {
    console.error("There's a problem with deleting the todos");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const task = req.body.task;
    itemManager.deleteTodo(task);
    res.end();
  } catch (err) {
    console.error("There's a problem with deleting the todo");
  }
};

/*const checkTodo = async (req, res) => {
  try{
  } catch{
  }
}*/

module.exports = { getTodos, getDone, addTodo, deleteTodo, deleteAll };
