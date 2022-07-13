import React from "react";
import PropTypes from "prop-types";
import ListItemConnector from "../connectors/listItem-connector";

const List = ({ todoList }) => {
  console.log(todoList);
  const items = todoList.todos;

  return (
    <ul id="list">
      {items.map((item) => (
        <ListItemConnector
          itemID={item.id}
          itemName={item.itemName}
          done={item.status}
        />
      ))}
    </ul>
  );
};

List.prototypes = {
  todoList: PropTypes.array,
};

export default List;
