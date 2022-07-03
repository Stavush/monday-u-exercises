import { useState } from "react";
import ItemClient from "../api/item_client";

const itemClient = new ItemClient();

const ListItem = (item) => {
  const itemName = "Item";
  const [done, setDone] = useState(false);

  const deleteItem = async () => {
    await itemClient.deleteItem(item.id);
    console.log(`Deleted todo #${item.id}`);
  };

  const checkItem = async () => {
    await itemClient.toggleDone(item);
    !done ? setDone(true) : setDone(false);
    console.log(`item #${item.id} is changed to ${done}`);
  };

  return (
    <li className="list-item" itemId={item.id} itemName={itemName} done={done}>
      <input type="checkbox" onChange={checkItem}></input>
      {itemName}
      <button className="list-item-delete-button" onClick={deleteItem}>
        <img
          src="https://raw.githubusercontent.com/Stavush/monday-u-exercises/7b3b94502f85ca3b10515804687549a4dc424851/src/ex4/dist/images/delete_icon.svg"
          alt=""
        />
      </button>
    </li>
  );
};

export default ListItem;
