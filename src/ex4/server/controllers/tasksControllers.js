const ItemManager = require("../services/item_manager.js");
const itemManager = new ItemManager();

const getTodos = async (req, res) => {
  try {
    res.send(itemManager.getTodos());
  } catch (err) {
    console.error("There's a problem with fetching the todos");
  }
};

const addTodo = async (req, res) => {
  try {
    const { value } = req.body;
    if (value) {
      const addedTask = await (await itemManager.addTodo(value)).todoText;
      console.log(addedTask);
      res.status(200).json(addedTask);
    }
  } catch (err) {
    console.error(err);
    //console.error("There was a problem adding a todo");
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleted = await itemManager.deleteAll();
    res.status(200).json({ deleted });
  } catch (err) {
    console.error("There's a problem with deleting the todos");
  }
};

const deleteTodo = async (req, res) => {
  try {
    //console.log("controllers -deleteTodo req.params", req.params);
    const taskId = await parseInt(req.params.id);
    if (isNaN(taskId))
      return res.status(400).json({
        status: 400,
        error: "wrong parameters",
      });
    const taskDeleted = await itemManager.deleteTodo(taskId);
    res.status(200).json({ taskDeleted });
  } catch (err) {
    console.error("There's a problem with deleting the todo");
  }
};

module.exports = { getTodos, addTodo, deleteTodo, deleteAll };
