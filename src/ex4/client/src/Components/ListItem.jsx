//import ItemClient from "../api/item_client";
import PropTypes from "prop-types";
import { memo, useState, useCallback } from "react";
import {
  deleteItemAction,
  checkItemAction,
  getItemsAction,
} from "../actions/item-actions";
import getItems from "../api/item_client";

//const itemClient = new ItemClient();

export const ListItem = memo(({ props, deleteItemAction, checkItemAction }) => {
  const { itemID, itemName, done } = props;
  const [status, setStatus] = useState(done);

  const deleteItem = useCallback(
    (e) => {
      deleteItemAction(itemID);
      //await itemClient.deleteItem(itemID);
    },
    [deleteItemAction, itemID]
  );

  const editItem = async () => {
    console.log("Item edit mode");
    document.getElementById(
      "task-text"
    ).innerHTML = `<input id="edit-mode" placeholder=${itemName}></input>
    <button id="send-edit"><i class="fa-solid fa-check"></i></button>`;
  };

  const checkItem = async () => {
    setStatus(!status, [status]);
    const id = itemID;
    try {
      checkItemAction({ id, status });
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
      <div id="task-text">{itemName}</div>
      <div id="buttons">
        <button className="list-item-edit-button" onClick={editItem}>
          <i class="fa-solid fa-pen"></i>
        </button>
        <button className="list-item-delete-button" onClick={deleteItem}>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
});

ListItem.prototypes = {
  itemID: PropTypes.number,
  itemName: PropTypes.string,
  done: PropTypes.bool,
};

export default ListItem;
