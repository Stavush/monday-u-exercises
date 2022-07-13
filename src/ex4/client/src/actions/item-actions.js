import ACTIONS from "./constants";
import { getItems, postItem, deleteItem, toggleDone } from "../api/item_client";

const get_items = (items) => ({
  type: ACTIONS.GET_ITEMS,
  items: items,
});

const addItem = (item) => ({
  type: ACTIONS.ADD_ITEM,
  item: item,
});

const delete_item = (item) => ({
  type: ACTIONS.DELETE_ITEM,
  item: item,
});

const checkItem = (item) => ({
  type: ACTIONS.CHECK_ITEM,
  item: item,
});

export const getItemsAction = (items) => {
  return (dispatch) => {
    getItems().then((res) => {
      dispatch(get_items(res));
    });
  };
};

export const addItemAction = (item) => {
  return (dispatch) => {
    postItem(item).then((res) => dispatch(addItem(item)));
  };
};

export const deleteItemAction = (item) => {
  return (dispatch) => {
    deleteItem(item).then((res) => dispatch(delete_item(res)));
  };
};

export const checkItemAction = (item) => {
  return (dispatch) => {
    toggleDone(item).then((res) => dispatch(checkItem(res)));
  };
};
