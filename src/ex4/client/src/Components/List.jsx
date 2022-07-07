import ListItem from "./ListItem.jsx";
import PropTypes from "prop-types";

const List = (todoList) => {
  const items = todoList.todos;

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
};

List.prototypes = {
  todoList: PropTypes.array,
};

export default List;
