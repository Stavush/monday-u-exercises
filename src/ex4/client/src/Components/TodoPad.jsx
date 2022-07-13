import ListConnector from "../connectors/list-connector";
import { useCallback, useEffect, useState } from "react";
import { addItemAction, getItemsAction } from "../actions/item-actions";
import { postItem, getItems, deleteAll } from "../api/item_client";

const TodoPad = () => {
  const [todoList, setTodoList] = useState([]);

  const newTodo = async (item) => {
    try {
      const input = document.getElementById("list-item-input");
      const item = input.value;
      await postItem(item);
    } catch (err) {
      console.error("Adding a todo was unsuccessful");
    }
  };

  const getTodos = async () => {
    try {
      const todos = await getItems();
      setTodoList(todos);
    } catch (err) {
      console.error("Fetching todos for TodoPad was unsuccessful");
    }
  };

  const clearAll = async () => {
    try {
      await deleteAll();
    } catch (err) {
      console.error("Could not delete all items");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app-container">
      <div className="list-container">
        <h1 className="app-name">Todo App</h1>
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
        <ListConnector todos={todoList} />
        <div className="bottom-container">
          <div id="pending">
            {`There are ${todoList.length} tasks in total`}
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
