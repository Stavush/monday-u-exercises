import List from "./List.jsx";
import ItemClient from "../api/item_client";
import { useEffect, useState } from "react";

const itemClient = new ItemClient();

const TodoPad = () => {
  const [todoList, setTodoList] = useState([]);
  const [pending, setPending] = useState(0);

  const newTodo = async (item) => {
    try {
      const input = document.getElementById("list-item-input");
      const item = input.value;
      await itemClient.postItem(item);
      setPending(todoList.length);
    } catch (err) {
      console.error("Adding a todo was unsuccessful");
    }
  };

  const getTodos = async () => {
    try {
      const todos = await itemClient.getItems();
      setTodoList(todos);
    } catch (err) {
      console.error("Fetching todos for TodoPad was unsuccessful");
    }
  };

  const clearAll = async () => {
    try {
      await itemClient.deleteAll();
    } catch (err) {
      console.error("Could not delete all items");
    }
  };

  const handleTabs = () => {};

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app-container">
      <div className="list-container">
        <h1 className="app-name">Todo App</h1>
        <div id="tabs">
          <button className="tab" id="all-tasks" onClick={handleTabs}>
            All Tasks
          </button>
          <button className="tab" id="done" onClick={handleTabs}>
            Done
          </button>
          <button className="tab" id="not-done" onClick={handleTabs}>
            Not Done
          </button>
        </div>
        <div className="list-controls">
          <input
            type="text"
            id="list-item-input"
            placeholder="Add your new todo"
          />
          <button type="button" id="list-item-submit" onClick={newTodo}>
            +
          </button>
        </div>
        <List todos={todoList} />
        <div className="bottom-container">
          <div id="pending">
            {`There are ${pending}/${todoList.length} pending tasks`}
          </div>
          <button id="clear-all" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPad;
