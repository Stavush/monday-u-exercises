const ItemManager = require("../services/item_manager.js");
const itemManager = new ItemManager();

const getTodos = async (req, res) => {
  try {
    const todos = await itemManager.getItems();
    console.log("todos", todos.json()); // TEST
    res.send(todos.json());
  } catch (err) {
    console.error("There's a problem with fetching the todos");
  }
};

const addTodo = async (req, res) => {
  try {
    //const { value } = req.body;
    const value = req.body.item;
    console.log("taskController addTodo value:", value);
    if (value) {
      await itemManager.handleItem(value);
      res.end();
    }
  } catch (err) {
    console.error("There's a problem adding a todo");
  }
};

const deleteAll = async (req, res) => {
  try {
    await itemManager.deleteAll();
    res.end();
  } catch (err) {
    console.error("There's a problem with deleting the todos");
  }
};

const deleteTodo = async (req, res) => {
  try {
    //const task = req.body.task;
    const task = req.body.item;
    itemManager.deleteItem(task);
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

module.exports = { getTodos, addTodo, deleteTodo, deleteAll };
