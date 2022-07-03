import ListItem from "./ListItem.jsx";
//import itemClient from "../item_client";

function List({ todoList }) {
  if (!todoList) {
    return (
      <ul id="list">
        <ListItem />
      </ul>
    );
  } else {
    return (
      <ul id="list">
        {/*taskList.map(task => <ListItem item={task} />)*/}
        <ListItem />
      </ul>
    );
  }
}

export default List;
