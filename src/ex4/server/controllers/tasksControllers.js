const ItemManager = require('../services/item_manager.js');
const itemManager = new ItemManager();

const getTodos = async (req, res) => {
    try{
        let tasks = await itemManager.getTodos();
        if (!tasks) tasks = [];
        res.status(200).json({tasks});
    } catch (err){
        console.error("There's a problem with fetching the todos");
    }
    
}

const deleteAll = async (req, res) => {
    try{
        const deleted = await itemManager.deleteAll();
        res.status(200).json({deleted});
    } catch (err){
        console.error("There's a problem with deleting the todos");
    }
   }

const addTodo = async (req, res) => {
    try{
        console.log("Enters taskControllers addTodo"); // test
        //console.log("request: ", req); // test
        const todoText = req;
        console.log({todoText}); // test
        const addedTask = await itemManager.addTodo(todoText);
        res.status(200).json({addedTask});
    } catch (err){
        console.error("There's a problem with adding the todo");
    }
}

const deleteTodo = async (req, res) => {
    try{
        let taskId = await Number.parseInt(req.params.id);
        if (isNaN(taskId)) return res.status(400).json({
            status: 400,
            error: "wrong parameters"
        });
        const taskDeleted = await itemManager.deleteTodo(taskId);
        res.status(200).json({ taskDeleted });
    } catch (err){
        console.error("There's a problem with deleting the todo");
    }

}

module.exports = { getTodos, addTodo, deleteTodo, deleteAll };