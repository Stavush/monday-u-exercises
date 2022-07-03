import List from "./List.jsx";
import ItemClient from "../api/item_client";
import { useEffect, useState } from "react";

const itemClient = new ItemClient();

const TodoPad = () => {
  const [todoList, setTodoList] = useState([]);
  const [pending, setPending] = useState(0);

  const newTodo = async () => {
    const input = document.getElementById("list-item-input");
    const inputValue = input.value;

    await itemClient.postItem({ inputValue });
  };

  const getTodos = async () => {
    const todos = await itemClient.getItems();
    setTodoList(todos);
    console.log("got the todos");
  };

  const deleteAll = () => {
    console.log("deleted all tasks");
  };

  useEffect(() => {
    getTodos();
  });

  return (
    <div class="app-container">
      <div class="list-container">
        <h1 class="app-name">Todo App</h1>
        <div class="list-controls">
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
        <div class="bottom-container">
          <div id="pending">
            {`There are ${pending}/${todoList.length} pending tasks`}
          </div>
          <button id="clear-all" onClick={deleteAll}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPad;
