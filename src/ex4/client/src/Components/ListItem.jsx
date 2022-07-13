//import { useState } from "react";
import ItemClient from "../api/item_client";
import PropTypes from "prop-types";
import { useState } from "react";

const itemClient = new ItemClient();

const ListItem = (props) => {
  const { itemID, itemName, done } = props;
  const [status, setStatus] = useState(done);

  const deleteItem = async () => {
    await itemClient.deleteItem(itemID);
  };

  const checkItem = async () => {
    setStatus(!status, [status]);
    const id = itemID;
    console.log({ status });
    try {
      await itemClient.toggleDone({ id, status });
    } catch (err) {
      console.error("Could not check item");
    }
  };

  return (
    <li
      className="list-item"
      itemID={itemID}
      key={itemID}
      itemName={itemName}
      done={done}
    >
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

ListItem.prototypes = {
  itemID: PropTypes.number,
  itemName: PropTypes.string,
  done: PropTypes.bool,
};

export default ListItem;
