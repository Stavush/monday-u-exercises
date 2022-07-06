import ListItem from "./ListItem.jsx";
import PropTypes from "prop-types";
//import itemClient from "../item_client";

const List = (todoList) => {
  const items = todoList.todos;
  if (!todoList) {
    return (
      <ul id="list">
        <ListItem />
      </ul>
    );
  } else {
    return (
      <ul id="list">
        {items.map((item) => (
          <ListItem
            itemID={item.id}
            itemName={item.itemName}
            done={item.status}
          />
        ))}
      </ul>
    );
  }
};

List.prototypes = {
  todoList: PropTypes.array,
};

export default List;
