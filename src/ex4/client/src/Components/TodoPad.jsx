//import List from "./List";
import { useCallback, useEffect, useState } from "react";
import ListConnector from "../connectors/list-connector";

const TodoPad = ({
  items,
  addItemAction,
  getItemsAction,
  deleteAllItemsAction,
}) => {
  const [input, setInput] = useState("");

  const onInputChange = useCallback((e) => {
    const inputVal = e.target.value;
    setInput(inputVal);
  }, []);

  const newTodo = useCallback(() => {
    addItemAction(input);
    setInput("");
  }, [addItemAction, input]);

  const clearAll = useCallback(() => {
    deleteAllItemsAction();
  }, []);

  useEffect(() => {
    try {
      getItemsAction();
    } catch (err) {
      console.log(err);
    }
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
            onChange={onInputChange}
          />
          <button type="button" id="list-item-submit" onClick={newTodo}>
            +
          </button>
        </div>
        <ListConnector />
        <div className="bottom-container">
          <div id="pending">
            {/*`There are ${items.length} tasks in total`*/}
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
